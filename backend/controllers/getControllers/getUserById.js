const express = require('express');
const client = require('../../dbConnections/mongoDB');
//to find by ID need to require objectID from mongodb
const { ObjectId } = require('mongodb');
const app = express();

app.get('/:id', (req, res) => {
  client
    .connect()
    .then(async () => {
      console.log('Connected to MongoDB');

      const db = client.db('admin');
      const collection = db.collection('users');

      const userId = req.params.id;
      // to find by ID in mongoDB need to create ObjectId
      const objectId = new ObjectId(userId);

      console.log(objectId);
      const documents = await collection.find({ _id: objectId }).toArray();

      res.json(documents);
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).json({ error: 'Internal server error' });
    })
    .finally(() => {
      // Close the MongoDB connection
      client.close();
    });
});

module.exports = app;
