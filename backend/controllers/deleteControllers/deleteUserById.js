const express = require('express');
const client = require('../../dbConnections/mongoDB');
//to find by ID need to require objectID from mongodb
const { ObjectId } = require('mongodb');
const app = express();

app.delete('/:id', async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('admin');
    const collection = db.collection('users');

    const userId = req.params.id;
    const objectId = new ObjectId(userId);

    console.log(objectId);

    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      res.json({ message: 'Document deleted successfully' });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (err) {
    console.error('Error deleting document from MongoDB:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Close the MongoDB connection
    client.close();
  }
});

module.exports = app;
