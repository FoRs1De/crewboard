const express = require('express');
const client = require('../../dbConnections/mongoDB');
const app = express();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const base64url = require('base64url');

const emailLogin = process.env.EMAIL_LOGIN;
const emailPassword = process.env.EMAIL_PASSWORD;
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail'
  auth: {
    user: emailLogin,
    pass: emailPassword,
  },
});

app.post('/', async (req, res) => {
  const userData = req.body;
  const userEmail = userData.email;
  const url = userData.url;

  try {
    await client.connect();

    const db = client.db('admin');
    const seamenCollection = db.collection('seamen');
    const employersCollection = db.collection('employers');

    // Find the user in the first collection
    const seamanObj = await seamenCollection.findOne({
      email: userEmail,
    });

    // If not found in the first collection, try the second collection
    if (!seamanObj) {
      const employerObj = await employersCollection.findOne({
        email: userEmail,
      });

      if (!employerObj) {
        return res.status(404).json({ error: 'User not found' });
      }
      const employerId = employerObj._id.toString();
      const encodedId = base64url.encode(employerId);

      const mailOptions = {
        from: 'Crewboard',
        to: `${userEmail}`,
        subject: 'Crewboard: reset-password',
        text: `You requested to reset password at Crewboard. Please follow this link to reset your password ${url}/${encodedId}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(200).json({
            message: error,
          });
          console.log(error);
        } else {
          res.status(200).json({
            userId: encodedId,
          });
          console.log(info.response);
        }
      });
    } else {
      const seamanId = seamanObj._id.toString();
      const encodedId = base64url.encode(seamanId);
      console.log(encodedId);

      const mailOptions = {
        from: 'alexeyprokopan@gmail.com',
        to: `${userEmail}`,
        subject: 'Crewboard: reset-password',
        text: `You requested to reset password at Crewboard. Please follow this link to reset your password ${url}/${encodedId}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(200).json({
            message: error,
          });
          console.log(error);
        } else {
          res.status(200).json({
            message: 'Email successfully sent',
          });
          console.log(info.response);
        }
      });
    }
  } catch (err) {
    console.error('Error during password reset:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Make sure to close the MongoDB connection when done
    await client.close();
  }
});

module.exports = app;
