const express = require('express');
const client = require('../../dbConnections/mongoDB');
const { ObjectId } = require('mongodb');
const app = express();
const base64url = require('base64url');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT tokens
function verifyToken(req, res, next) {
  const userToken = req.params.token;

  if (!userToken) {
    return res.status(400).json({ error: 'Token not provided' });
  }

  try {
    const decodedToken = jwt.verify(
      base64url.decode(userToken),
      process.env.JWT_SECRET
    );
    req.userId = new ObjectId(decodedToken.userId);
    next();
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: 'Invalid token' });
  }
}

// Email verification route
app.put('/:token', verifyToken, async (req, res) => {
  try {
    await client.connect();

    const db = client.db('admin');
    const seamenCollection = db.collection('seamen');
    const employersCollection = db.collection('employers');

    let user = await seamenCollection.findOne({
      _id: req.userId,
      verified: false,
    });

    if (!user) {
      user = await employersCollection.findOne({
        _id: req.userId,
        verified: false,
      });
    }

    if (!user) {
      return res
        .status(404)
        .json({ error: 'User not found or already verified' });
    }

    const userCollection =
      user.user === 'seaman' ? seamenCollection : employersCollection;

    await userCollection.updateOne(
      { _id: req.userId },
      { $set: { verified: true } }
    );
    await client.close();

    res.status(200).json({ message: 'Email successfully verified' });
  } catch (err) {
    console.error('Error during verification:', err);
    res.status(500).json({ error: 'Internal server error' });
    if (client) {
      client.close();
    }
  }
});

module.exports = app;
