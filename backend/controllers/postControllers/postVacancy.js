const express = require('express');
const client = require('../../dbConnections/mongoDB');
const app = express();

app.post('/', async (req, res) => {
  const dataReceived = req.body;
  const { startDate, ...dataToInsert } = dataReceived;
  try {
    await client.connect();
    const db = client.db('admin');
    const collection = db.collection('vacancies');
    const result = await collection.insertOne(dataToInsert);

    const insertedDocument = await collection.findOne({
      _id: result.insertedId,
    });

    res.status(200).json({
      message: 'Vacancy posted',
      inserted: insertedDocument,
    });

    if (client) {
      client.close();
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = app;
