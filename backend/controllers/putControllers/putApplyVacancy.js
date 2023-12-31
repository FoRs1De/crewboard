const express = require('express');
const client = require('../../dbConnections/mongoDB');
const jwt = require('jsonwebtoken');
const app = express();
const { ObjectId } = require('mongodb');

app.put('/:id', async (req, res) => {
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
      console.log(req.body);
      const comment = req.body.comment;
      const vacancyId = req.params.id;
      userId;

      const resultSeaman = await seamenCollection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $push: {
            vacanciesApplied: vacancyId,
          },
        }
      );

      const resultVacancy = await vacanciesCollection.findOneAndUpdate(
        { _id: new ObjectId(vacancyId) },
        {
          $push: {
            seamenApplied: {
              seamanId: userId,
              comment: comment,
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
