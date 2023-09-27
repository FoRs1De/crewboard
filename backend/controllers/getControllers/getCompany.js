const express = require('express');
const client = require('../../dbConnections/mongoDB');
const { ObjectId } = require('mongodb');
const app = express();

app.get('/:id', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('admin');
    const companiesCollection = db.collection('employers');

    const companyId = req.params.id;

    const objectId = new ObjectId(companyId);

    const document = await companiesCollection.findOne({ _id: objectId });

    await companiesCollection.updateOne(
      { _id: objectId },
      {
        $inc: { viewed: 1 }, // Increment the viewed field by 1
      }
    );

    res.json(document);
    if (client) {
      setTimeout(() => {
        client.close();
      }, 3000);
    }
  } catch (err) {
    console.error('Error during request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;
