const express = require('express');
const client = require('../../dbConnections/mongoDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

//Create JWT Token
const maxAge = 30 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ userId: id }, `${process.env.JWT_SECRET}`, {
    expiresIn: maxAge,
  });
};

app.post('/', async (req, res) => {
  const dataToInsert = req.body;
  const userEmail = dataToInsert.email;
  const userCompany = dataToInsert.company;
  const userPassword = dataToInsert.password;
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  dataToInsert.password = hashedPassword;

  try {
    await client.connect();
    const db = client.db('admin');

    // Check if a user with the same email already exists in the collection seamen
    const seamenCollection = db.collection('seamen');
    const existingSeaman = await seamenCollection.findOne({ email: userEmail });

    // Check if a user with the same email already exists in the collection employers
    const employersCollection = db.collection('employers');
    const existingEmployer = await employersCollection.findOne({
      email: userEmail,
    });
    const existingCompany = await employersCollection.findOne({
      company: userCompany,
    });
    if (existingSeaman || existingEmployer) {
      // If an existing user is found, return a response indicating the email is already in use
      res.status(400).json({ error: 'Email already in use' });
    } else if (existingCompany) {
      res.status(400).json({ error: 'Company already in use' });
    } else {
      // If no existing user is found, proceed with inserting the new user
      const collection = db.collection(
        dataToInsert.user === 'seaman' ? 'seamen' : 'employers'
      );

      const result = await collection.insertOne(dataToInsert);

      console.log('Inserted document with _id:', result.insertedId.toString());

      const insertedDocument = await collection.findOne({
        _id: result.insertedId,
      });

      //sending cookie as a response
      const token = createToken(result.insertedId.toString());
      console.log(token);
      res.cookie('user', token, {
        httpOnly: true,
        maxAge: maxAge,
        domain: 'localhost',
        sameSite: 'Lax',
        secure: false,
        path: '/',
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
