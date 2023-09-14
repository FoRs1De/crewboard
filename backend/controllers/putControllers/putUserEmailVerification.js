const express = require('express');
const client = require('../../dbConnections/mongoDB');
const { ObjectId } = require('mongodb');
const app = express();
const base64url = require('base64url');
const jwt = require('jsonwebtoken');

app.put('/:token', async (req, res) => {
  try {
    await client.connect();

    const db = client.db('admin');
    const seamenCollection = db.collection('seamen');
    const employersCollection = db.collection('employers');

    const userToken = req.params.token;
    const decodedToJwt = base64url.decode(userToken);

    let userId;
    if (decodedToJwt) {
      jwt.verify(
        decodedToJwt,
        `${process.env.JWT_SECRET}`,
        (err, decodedToken) => {
          if (err) {
            console.log(err.message);
            return res.status(400).json({ error: 'Invalid token' });
          }
          userId = new ObjectId(decodedToken.userId);
        }
      );
    }

    // if token is not verified stop
    if (!userId) {
      return;
    }

    let user = await seamenCollection.findOne({ _id: userId, verified: false });

    if (!user) {
      user = await employersCollection.findOne({
        _id: userId,
        verified: false,
      });
    }

    if (!user) {
      return res
        .status(404)
        .json({ error: 'User not found or already verified' });
    }

    if (user.user === 'seaman') {
      await seamenCollection.updateOne(
        { _id: userId },
        { $set: { verified: true } }
      );
    } else if (user.user === 'employer') {
      await employersCollection.updateOne(
        { _id: userId },
        { $set: { verified: true } }
      );
    }

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
