const express = require('express');
const client = require('../../dbConnections/mongoDB');

const app = express();

app.get('/', (req, res) => {
  client
    .connect()
    .then(async () => {
      console.log('Connected to MongoDB');

      const db = client.db('admin');
      const collection = db.collection('users');

      const documents = await collection.find({}).toArray();
      console.log('All documents:', documents);

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