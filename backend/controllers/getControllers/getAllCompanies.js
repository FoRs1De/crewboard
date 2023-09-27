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

      if (client) {
        setTimeout(() => {
          client.close();
        }, 3000);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error', message: err });
    });
});

module.exports = app;
