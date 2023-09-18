const express = require('express');
const client = require('../../dbConnections/mongoDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

//Create JWT Token
const maxAge = 30 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ userId: id }, `${process.env.JWT_SECRET}`, {
    expiresIn: maxAge,
  });
};

app.post('/', async (req, res) => {
  const userData = req.body;
  const userEmail = userData.username;
  const userPassword = userData.password;

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

      // Compare the provided password with the stored hashed password from the second collection
      const passwordsMatch = await bcrypt.compare(
        userPassword,
        employerObj.password
      );

      if (employerObj.verified === false) {
        return res.status(401).json({ error: 'Not verified' });
      }

      if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Generate a JWT token for the authenticated user
      const token = createToken(employerObj._id.toString());

      // Set the JWT token as a cookie
      res.cookie('user', token, {
        httpOnly: true,
        maxAge: maxAge,
        sameSite: 'Lax',
        secure: false,
        path: '/',
      });

      res.status(200).json({
        message: 'Login successful',
        user: employerObj,
      });
    } else {
      // Compare the provided password with the stored hashed password from the first collection
      const passwordsMatch = await bcrypt.compare(
        userPassword,
        seamanObj.password
      );

      if (seamanObj.verified === false) {
        return res.status(401).json({ error: 'Not verified' });
      }

      if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Generate a JWT token for the authenticated user
      const token = createToken(seamanObj._id.toString());

      // Set the JWT token as a cookie
      res.cookie('user', token, {
        httpOnly: true,
        maxAge: maxAge, // Set the token expiration time
        sameSite: 'Lax',
        secure: false, // Set to true in a production environment with HTTPS
        path: '/',
      });

      res.status(200).json({
        message: 'Login successful',
        user: seamanObj,
      });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Make sure to close the MongoDB connection when done
    await client.close();
  }
});

module.exports = app;
