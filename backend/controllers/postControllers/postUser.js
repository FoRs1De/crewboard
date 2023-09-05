const express = require('express');
const client = require('../../dbConnections/mongoDB');

const app = express();

app.post('/', async (req, res) => {
  const dataToInsert = req.body;

  // Assuming 'email' is the field you want to check for duplicates
  const userEmail = dataToInsert.email;

  try {
    await client.connect();
    const db = client.db('admin');

    // Check if a user with the same email already exists in the collection
    const userCollection = db.collection(
      dataToInsert.user === 'seaman' ? 'seamen' : 'employers'
    );
    const existingUser = await userCollection.findOne({ email: userEmail });

    if (existingUser) {
      // If an existing user is found, return a response indicating the email is already in use
      res.status(400).json({ error: 'Email already in use' });
    } else {
      // If no existing user is found, proceed with inserting the new user
      const collection = db.collection(
        dataToInsert.user === 'seaman' ? 'seamen' : 'employers'
      );

      const result = await collection.insertOne(dataToInsert);
      console.log('Inserted document with _id:', result.insertedId);

      const insertedDocument = await collection.findOne({
        _id: result.insertedId,
      });
      res.status(201).json({
        message: 'Data inserted successfully',
        insertedDocument: insertedDocument,
      });
    }
  } catch (err) {
    console.error('Error inserting data into MongoDB:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Make sure to close the MongoDB connection when done
    await client.close();
  }
});

module.exports = app;
