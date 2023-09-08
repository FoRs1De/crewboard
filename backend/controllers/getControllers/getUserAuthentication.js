const express = require('express');
const client = require('../../dbConnections/mongoDB');
const jwt = require('jsonwebtoken');
const app = express();
const { ObjectId } = require('mongodb');

app.get('/', async (req, res) => {
  const userToken = req.cookies.user;
  let userId;
  if (userToken) {
    jwt.verify(userToken, `${process.env.JWT_SECRET}`, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        userId = new ObjectId(decodedToken.userId);
      }
    });
  } else {
    res.status(404).json({ error: 'user token not found' });
  }

  if (userId) {
    try {
      await client.connect();
      const db = client.db('admin');
      const seamenCollection = db.collection('seamen');
      const employersCollection = db.collection('employers');

      // Find the user in the first collection
      const seamanObj = await seamenCollection.findOne({ _id: userId });

      // If not found in the first collection, try the second collection
      if (!seamanObj) {
        const employerObj = await employersCollection.findOne({ _id: userId });

        res.status(200).json(employerObj);
      } else {
        res.status(200).json(seamanObj);
      }
    } catch (err) {
      console.error('Error during request:', err);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      // Make sure to close the MongoDB connection when done
      await client.close();
    }
  } else {
    console.log('No userId');
  }
});

module.exports = app;
