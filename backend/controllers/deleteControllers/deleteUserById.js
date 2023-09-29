const express = require('express');
const client = require('../../dbConnections/mongoDB');
const jwt = require('jsonwebtoken');
const app = express();
const { ObjectId } = require('mongodb');

app.delete('/', async (req, res) => {
  const userToken = req.cookies.user;
  let userId;
  let createdById;
  if (userToken) {
    jwt.verify(userToken, `${process.env.JWT_SECRET}`, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        userId = new ObjectId(decodedToken.userId);
        createdById = decodedToken.userId;
      }
    });
  } else {
    res.status(404).json({ error: 'user token not found' });
  }

  if (userId) {
    try {
      await client.connect();
      const db = client.db('admin');
      const seamenCollection = db.collection('seamen');
      const employersCollection = db.collection('employers');
      const vacanciesCollection = db.collection('vacancies');

      // Try to delete the user from the seamen collection
      const seamanDeleteResult = await seamenCollection.deleteOne({
        _id: userId,
      });

      //delete from all aplied vacancies
      await vacanciesCollection.updateMany(
        { 'seamenApplied.seamanId': createdById }, // Filter to match documents with the id to delete
        {
          $pull: {
            seamenApplied: { seamanId: createdById }, // Specify the criteria to remove the element
          },
        }
      );

      if (seamanDeleteResult.deletedCount === 1) {
        // User was deleted from the seamen collection
        res.cookie('user', 'deleted', {
          expires: new Date(),
        });
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        // If the user wasn't found in the seamen collection, try deleting from employers
        const employerDeleteResult = await employersCollection.deleteOne({
          _id: userId,
        });

        //delete all vacancies of employer
        await vacanciesCollection.deleteMany({
          createdById: createdById,
        });

        if (employerDeleteResult.deletedCount === 1) {
          // User was deleted from the employers collection
          res.cookie('user', 'deleted', {
            expires: new Date(),
          });
          res.status(200).json({ message: 'User deleted successfully' });
        } else {
          // User not found in either collection
          res.status(404).json({ error: 'User not found' });
        }
      }
    } catch (err) {
      console.error('Error during request:', err);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      // Make sure to close the MongoDB connection when done
      await client.close();
    }
  } else {
    console.log('No userId');
  }
});

module.exports = app;
