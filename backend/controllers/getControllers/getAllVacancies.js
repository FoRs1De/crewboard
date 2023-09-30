const express = require('express');
const client = require('../../dbConnections/mongoDB');
const app = express();

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('admin');
    const vacanciesCollection = db.collection('vacancies');

    const userVacancies = await vacanciesCollection.find().toArray();

    res.status(200).json(userVacancies);
  } catch (err) {
    console.error('Error during request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;
