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

      const seamenCollection = db.collection('seamen');
      const vacanciesCollection = db.collection('vacancies');

      const vacancyId = req.body.vacancyId;
      userId;

      const resultSeaman = await seamenCollection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $pull: {
            vacanciesApplied: vacancyId,
          },
        }
      );

      const resultVacancy = await vacanciesCollection.findOneAndUpdate(
        { _id: new ObjectId(vacancyId) },
        {
          $pull: {
            seamenApplied: {
              seamanId: userId,
            },
          },
        }
      );

      res.status(200).json([resultSeaman, resultVacancy]);
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
