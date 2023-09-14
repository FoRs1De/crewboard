const express = require('express');
const jwt = require('jsonwebtoken');
const client = require('../../dbConnections/mongoDB');
const app = express();
const nodemailer = require('nodemailer');
const base64url = require('base64url');

//Create JWT Token
const maxAge = 30 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ userId: id }, `${process.env.JWT_SECRET}`, {
    expiresIn: maxAge,
  });
};

//SendMailer transporter
const emailLogin = process.env.EMAIL_LOGIN;
const emailPassword = process.env.EMAIL_PASSWORD;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailLogin,
    pass: emailPassword,
  },
});

app.post('/', async (req, res) => {
  const dataReceived = req.body;
  const { url, ...dataWithoutUrl } = dataReceived;
  const email = dataWithoutUrl.email;
  const urlObj = new URL(url);
  const domainUrl = urlObj.origin;

  await client.connect();
  const db = client.db('admin');

  // Check if a user with the same email already exists in the collection seamen
  const seamenCollection = db.collection('seamen');
  const existingSeaman = await seamenCollection.findOne({ email: email });

  // Check if a user with the same email already exists in the collection employers
  const employersCollection = db.collection('employers');
  const existingEmployer = await employersCollection.findOne({
    email: email,
  });

  let token;

  if (existingSeaman) {
    token = createToken(existingSeaman._id.toString());
  } else if (existingEmployer) {
    token = createToken(existingEmployer._id.toString());
  } else {
    return res.status(500).json({ error: 'Internal server error' });
  }

  const encodedToken = base64url.encode(token);
  //send verification email
  const mailOptions = {
    from: 'Crewboard',
    to: `${email}`,
    subject: 'Crewboard: email-confirmation',
    text: `Hi! There, You have recently registered 
        on Crewboard.
        Please follow the given link to verify your email
        ${domainUrl}/verify/${encodedToken} `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
    }
  });
});

module.exports = app;
