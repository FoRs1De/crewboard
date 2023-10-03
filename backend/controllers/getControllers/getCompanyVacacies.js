const express = require('express');
const client = require('../../dbConnections/mongoDB');
const { ObjectId } = require('mongodb');
const app = express();

app.get('/:id', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('admin');
    const companiesCollection = db.collection('employers');

    const companyId = req.params.id;
    const objectId = new ObjectId(companyId);

    const company = await companiesCollection.findOne({ _id: objectId });

    if (company) {
      const vacanciesCollection = db.collection('vacancies');
      const vacancyIds = company.postedVacancies || [];

      if (vacancyIds.length > 0) {
        const vacancyObjectIds = vacancyIds.map((id) => new ObjectId(id));
        const vacancies = await vacanciesCollection
          .find({ _id: { $in: vacancyObjectIds } })
          .toArray();

        return res.json(vacancies);
      }
    }

    res.json([]);
  } catch (err) {
    console.error('Error during request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;
