const express = require('express');
const client = require('../../dbConnections/mongoDB');
const app = express();
const { ObjectId } = require('mongodb');

app.put('/', async (req, res) => {
  const vacancyId = req.body.id;

  try {
    await client.connect();
    const db = client.db('admin');
    const seamenCollection = db.collection('seamen');
    const employersCollection = db.collection('employers');
    const vacanciesCollection = db.collection('vacancies');

    await seamenCollection.deleteOne({
      _id: new ObjectId(vacancyId),
    });

    await vacanciesCollection.deleteOne({ _id: new ObjectId(vacancyId) });

    await employersCollection.findOneAndUpdate(
      { postedVacancies: new ObjectId(vacancyId) },
      {
        $pull: {
          postedVacancies: new ObjectId(vacancyId),
        },
      }
    );

    await seamenCollection.updateMany(
      { vacanciesApplied: vacancyId },
      {
        $pull: {
          vacanciesApplied: vacancyId,
        },
      }
    );
    res.send('Successfully deleted');
  } catch (err) {
    console.error('Error during request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;
