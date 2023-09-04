const express = require('express');
const client = require('../../dbConnections/mongoDB');
const { ObjectId } = require('mongodb');
const app = express();

app.use(express.json());

app.put('/:id', async (req, res) => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('admin');
    const collection = db.collection('users');

    const userId = req.params.id;
    const objectId = new ObjectId(userId);

    const updatedUserData = req.body;

    // Update the user document by its _id
    const result = await collection.updateOne(
      { _id: objectId },
      { $set: updatedUserData }
    );

    if (result.modifiedCount === 1) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error updating user in MongoDB:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.close();
  }
});

module.exports = app;
