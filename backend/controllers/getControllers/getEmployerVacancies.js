const express = require('express');
const client = require('../../dbConnections/mongoDB');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/', async (req, res) => {
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
      const vacanciesCollection = db.collection('vacancies');

      const userVacancies = await vacanciesCollection
        .find({ createdById: userId })
        .toArray();

      if (userVacancies.length > 0) {
        res.status(200).json(userVacancies);
      } else {
        res.status(200).json({ message: 'No vacancies posted yet...' });
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
