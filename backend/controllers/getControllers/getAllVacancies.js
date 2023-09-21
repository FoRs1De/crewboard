const express = require('express');
const client = require('../../dbConnections/mongoDB');
const app = express();

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('admin');
    const vacanciesCollection = db.collection('vacancies');

    const userVacancies = await vacanciesCollection.find().toArray();

    if (userVacancies.length > 0) {
      res.status(200).json(userVacancies);
    } else {
      res.status(200).json({ message: 'No vacancies posted yet...' });
    }
  } catch (err) {
    console.error('Error during request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }

  if (client) {
    setTimeout(() => {
      client.close();
    }, 5000);
  }
});

module.exports = app;
