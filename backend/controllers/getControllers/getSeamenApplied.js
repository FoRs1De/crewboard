const express = require('express');
const client = require('../../dbConnections/mongoDB');
const app = express();
const { ObjectId } = require('mongodb');

app.get('/:id', async (req, res) => {
  const vacancyId = req.params.id;

  if (vacancyId) {
    try {
      await client.connect();
      const db = client.db('admin');
      const vacanciesCollection = db.collection('vacancies');
      const seamenCollection = db.collection('seamen');

      const vacancy = await vacanciesCollection.findOne({
        _id: new ObjectId(vacancyId),
      });

      if (!vacancy) {
        return res.status(404).json({ message: 'Vacancy not found' });
      }

      const seamenAppliedObj = vacancy.seamenApplied;
      const seamenApplied = [];

      if (Array.isArray(seamenAppliedObj)) {
        for (const seamanIdObj of seamenAppliedObj) {
          const seamanId = seamanIdObj.seamanId;
          const comment = seamanIdObj.comment; // Get the comment from seamenAppliedObj

          const seaman = await seamenCollection.findOne({
            _id: new ObjectId(seamanId),
          });

          if (seaman) {
            // Insert the comment into the seaman object
            seaman.comment = comment;

            // Add the seaman data to the seamenApplied array
            seamenApplied.push(seaman);
          }
        }
      } else {
        console.error('seamenAppliedObj is not an array');
        return res.status(400).json({ message: 'Invalid data' });
      }

      res.status(200).json(seamenApplied);
    } catch (err) {
      console.error('Error during request:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(401).json({ message: 'No user token or no userId' });
  }
});

module.exports = app;
