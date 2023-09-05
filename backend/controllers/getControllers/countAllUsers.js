const express = require('express');
const client = require('../../dbConnections/mongoDB');

const app = express();

app.get('/', async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();

    const db = client.db('admin');
    const collection1 = db.collection('seamen');
    const collection2 = db.collection('employers'); // Replace with the name of your second collection

    // Use the $group stage to count documents from both collections
    const pipeline = [
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
        },
      },
    ];

    const result = await collection1.aggregate(pipeline).toArray();
    const count1 = result.length > 0 ? result[0].total : 0;

    const result2 = await collection2.aggregate(pipeline).toArray();
    const count2 = result2.length > 0 ? result2[0].total : 0;

    // Combine the counts
    const totalCount = count1 + count2;

    res.json(totalCount);
  } catch (err) {
    console.error('Error connecting to MongoDB or counting documents:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Close the MongoDB connection
    client.close();
  }
});

module.exports = app;
