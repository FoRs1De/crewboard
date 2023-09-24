const express = require('express');
const client = require('../../dbConnections/mongoDB');
const { ObjectId } = require('mongodb');
const app = express();

app.get('/:id', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('admin');
    const vacanciesCollection = db.collection('vacancies');

    const vacancyId = req.params.id;

    const objectId = new ObjectId(vacancyId);

    const document = await vacanciesCollection.findOne({ _id: objectId });

    await vacanciesCollection.updateOne(
      { _id: objectId },
      {
        $inc: { viewed: 1 }, // Increment the viewed field by 1
      }
    );

    res.json(document);
  } catch (err) {
    console.error('Error during request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }

  if (client) {
    client.close();
  }
});

module.exports = app;
