const express = require('express');
const client = require('../../dbConnections/mongoDB');

const app = express();

app.get('/', (req, res) => {
  client
    .connect()
    .then(async () => {
      const db = client.db('admin');
      const collection = db.collection('employers');

      const documents = await collection.find({}).toArray();

      res.status(200).json(documents);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error', message: err });
    })
    .finally(() => {
      if (client) {
        setTimeout(() => {
          client.close();
        }, 5000);
      }
    });
});

module.exports = app;
