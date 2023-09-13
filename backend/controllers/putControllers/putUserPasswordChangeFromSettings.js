const express = require('express');
const client = require('../../dbConnections/mongoDB');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const app = express();
const bcrypt = require('bcrypt');

app.put('/', async (req, res) => {
  // get id from cookies
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

    try {
      await client.connect();

      const db = client.db('admin');
      const seamenCollection = db.collection('seamen');
      const employersCollection = db.collection('employers');

      const receivedData = req.body;
      const password = receivedData.password;
      const hashedPassword = await bcrypt.hash(password, 10);

      // Check if the user exists in the first collection
      let result;
      if (seamenCollection) {
        const existingUser = await seamenCollection.findOne({ _id: userId });
        const passwordMatches = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (passwordMatches) {
          return res
            .status(400)
            .json({ error: 'New password matches current password' });
        }
        result = await seamenCollection.updateOne(
          { _id: userId },
          { $set: { password: hashedPassword } }
        );
      }

      // If not found in the first collection, try the second collection
      if (!result || result.matchedCount === 0) {
        if (employersCollection) {
          const existingUser = await employersCollection.findOne({
            _id: userId,
          });
          const passwordMatches = await bcrypt.compare(
            password,
            existingUser.password
          );
          if (passwordMatches) {
            return res
              .status(400)
              .json({ error: 'New password matches current password' });
          }
          result = await employersCollection.updateOne(
            { _id: userId },
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
  }
});

module.exports = app;
