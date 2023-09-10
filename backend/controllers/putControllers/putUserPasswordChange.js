const express = require('express');
const client = require('../../dbConnections/mongoDB');
const { ObjectId } = require('mongodb');
const app = express();
const base64url = require('base64url');
const bcrypt = require('bcrypt');

app.put('/:id', async (req, res) => {
  try {
    await client.connect();

    const db = client.db('admin');
    const seamenCollection = db.collection('seamen');
    const employersCollection = db.collection('employers');

    const userId = req.params.id;
    const decodedId = base64url.decode(userId);
    const objectId = new ObjectId(decodedId);

    const receivedData = req.body;
    const password = receivedData.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user exists in the first collection
    let result;
    if (seamenCollection) {
      result = await seamenCollection.updateOne(
        { _id: objectId },
        { $set: { password: hashedPassword } }
      );
    }

    // If not found in the first collection, try the second collection
    if (!result || result.matchedCount === 0) {
      if (employersCollection) {
        result = await employersCollection.updateOne(
          { _id: objectId },
          { $set: { password: hashedPassword } }
        );
      }
    }

    if (!result || result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error during password reset:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Make sure to close the MongoDB connection when done
    await client.close();
  }
});

module.exports = app;
