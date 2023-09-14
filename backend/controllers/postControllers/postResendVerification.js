const express = require('express');
const jwt = require('jsonwebtoken');
const client = require('../../dbConnections/mongoDB');
const app = express();
const nodemailer = require('nodemailer');
const base64url = require('base64url');

// Create JWT Token
const maxAge = 30 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Handle user registration and email verification
app.post('/', async (req, res) => {
  try {
    const { email, url } = req.body;
    const urlObj = new URL(url);
    const domainUrl = urlObj.origin;

    await client.connect();
    const db = client.db('admin');

    const seamenCollection = db.collection('seamen');
    const existingSeaman = await seamenCollection.findOne({ email });

    const employersCollection = db.collection('employers');
    const existingEmployer = await employersCollection.findOne({ email });

    let token;

    if (existingSeaman) {
      token = createToken(existingSeaman._id.toString());
    } else if (existingEmployer) {
      token = createToken(existingEmployer._id.toString());
    } else {
      return res.status(409).json({ error: 'User already exists' });
    }

    const encodedToken = base64url.encode(token);

    const mailOptions = {
      from: 'Crewboard',
      to: email,
      subject: 'Crewboard: email-confirmation',
      text: `Hi! There, You have recently registered on Crewboard. Please follow the given link to verify your email ${domainUrl}/verify/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending verification email:', error);
        return res
          .status(500)
          .json({ error: 'Failed to send verification email' });
      } else {
        console.log('Verification email sent:', info.response);
        return res
          .status(200)
          .json({ message: 'Verification email sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;
