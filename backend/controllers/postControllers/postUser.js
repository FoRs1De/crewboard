const express = require('express');
const client = require('../../dbConnections/mongoDB');

const app = express();

app.post('/', async (req, res) => {
  try {
    const db = client.db('admin');
    const collection = db.collection('users');

    const dataToInsert = req.body;

    const result = await collection.insertOne(dataToInsert);
    console.log('Inserted document with _id:', result.insertedId);

    const insertedDocument = await collection.findOne({
      _id: result.insertedId,
    });
    res.status(201).json({
      message: 'Data inserted successfully',
      insertedDocument: insertedDocument,
    });
  } catch (err) {
    console.error('Error inserting data into MongoDB:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;
