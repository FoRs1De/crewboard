const express = require('express');
const client = require('../../dbConnections/mongoDB');
const jwt = require('jsonwebtoken');
const app = express();
const { ObjectId } = require('mongodb');

app.put('/', async (req, res) => {
  const userToken = req.cookies.user;
  let userId;
  if (userToken) {
    jwt.verify(userToken, `${process.env.JWT_SECRET}`, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        userId = decodedToken.userId;
      }
    });
  }

  if (userId) {
    try {
      await client.connect();
      const db = client.db('admin');

      const employersCollection = db.collection('employers');
      const vacanciesCollection = db.collection('vacancies');

      const receivedData = req.body;

      const updateOperation = {
        $set: {
          logoUrl: receivedData.logoUrl,
          licenseUrl: receivedData.licenseUrl,
          address: receivedData.address,
          city: receivedData.city,
          contactPerson: receivedData.ContactPerson,
          country: receivedData.country,
          description: receivedData.description,
          licenseNumber: receivedData.licenseNumber,
          phone: receivedData.phone,
          website: receivedData.website,
        },
      };
      const result = await employersCollection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        updateOperation,
        { returnOriginal: false } // To return the updated document
      );

      await vacanciesCollection.updateMany(
        { createdById: userId },
        {
          $set: {
            userLogoUrl: receivedData.logoUrl,
            userCountry: receivedData.country,
          },
        }
      );

      if (result) {
        // User was found and updated
        res.status(200).json(result);
      } else {
        // User not found
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error('Error during request:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(401).json({ message: 'No user token or no userId' });
  }
  if (client) {
    setTimeout(() => {
      client.close();
    }, 5000);
  }
});

module.exports = app;
