const express = require('express');
const client = require('../../dbConnections/mongoDB');
const app = express();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

app.post('/', async (req, res) => {
  const dataReceived = req.body;
  const userToken = req.cookies.user;
  let userId;
  if (userToken) {
    jwt.verify(userToken, `${process.env.JWT_SECRET}`, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        userId = new ObjectId(decodedToken.userId);
      }
    });
  } else {
    res.status(404).json({ error: 'user token not found' });
  }

  const { startDate, ...dataToAdd } = dataReceived;
  try {
    await client.connect();
    const db = client.db('admin');
    const vacanciesCollection = db.collection('vacancies');
    const employersCollection = db.collection('employers');

    const employerData = await employersCollection.findOne({ _id: userId });

    const dataToInsert = {
      ...dataToAdd,
      userCountry: employerData.country,
      viewed: 0,
    };

    const result = await vacanciesCollection.insertOne(dataToInsert);

    const insertedDocument = await vacanciesCollection.findOne({
      _id: result.insertedId,
    });

    await employersCollection.updateOne(
      { _id: userId },
      {
        $addToSet: { postedVacancies: result.insertedId }, // Add the vacancy ID to the postedVacancies array
      }
    );

    res.status(200).json({
      message: 'Vacancy posted',
      inserted: insertedDocument,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = app;
