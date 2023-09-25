const express = require('express');
const client = require('../../dbConnections/mongoDB');

const app = express();

app.get('/', async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();

    const db = client.db('admin');
    const collection = db.collection('vacancies');

    const allVacancies = await collection.countDocuments();
    const masters = await collection.countDocuments({ position: 'Master' });
    const chiefOfficers = await collection.countDocuments({
      position: 'Chief Officer',
    });
    const watchOfficers = await collection.countDocuments({
      position: {
        $in: [
          'Single Officer',
          '2nd Officer',
          '3rd Officer',
          'Trainee Officer',
        ],
      },
    });

    const deckRatings = await collection.countDocuments({
      position: {
        $in: [
          'Bosun (Boatswain)',
          'Pumpman',
          'AB (Able Seaman)',
          'AB/Welder',
          'OS (Ordinary Seaman)',
          'Deck Cadet',
          'Cadet/Trainee',
        ],
      },
    });

    const galley = await collection.countDocuments({
      position: {
        $in: ['Chief Cook', 'Cook', '2nd Cook', 'Messboy', 'AB/Cook'],
      },
    });

    const fromShipowners = await collection.countDocuments({
      userRole: 'Shipowner company',
    });

    const chiefEngineers = await collection.countDocuments({
      position: {
        $in: ['Chief Engineer', 'Single Engineer', 'Superintendent'],
      },
    });

    const secondEngineers = await collection.countDocuments({
      position: '2nd Engineer',
    });

    const engineers = await collection.countDocuments({
      position: {
        $in: [
          '3rd Engineer',
          '4th Engineer',
          'Watch Engineer',
          'Ref. Engineer',
          'Gas Engineer',
          'Trainee Engineer',
        ],
      },
    });

    const electricalEngineers = await collection.countDocuments({
      position: {
        $in: [
          'Electrical Engineer',
          'ETO',
          'Electrician',
          'Assistant Electrical Engineer',
        ],
      },
    });

    const engineRatings = await collection.countDocuments({
      position: {
        $in: [
          'Motorman/Oiler',
          'Wiper',
          'Motorman/Electrician',
          'AB/MM',
          'Engine Cadet',
          'Fitter/Welder',
          'Turner',
        ],
      },
    });

    const other =
      allVacancies -
      masters -
      chiefOfficers -
      watchOfficers -
      deckRatings -
      galley -
      chiefEngineers -
      secondEngineers -
      engineers -
      electricalEngineers -
      engineRatings;

    res.json({
      allVacancies: allVacancies,
      masters: masters,
      chiefOfficers: chiefOfficers,
      watchOfficers: watchOfficers,
      deckRatings: deckRatings,
      galley: galley,
      fromShipowners: fromShipowners,
      chiefEngineers: chiefEngineers,
      secondEngineers: secondEngineers,
      engineers: engineers,
      electricalEngineers: electricalEngineers,
      engineRatings: engineRatings,
      other: other,
    });
    if (client) {
      setTimeout(() => {
        client.close();
      }, 2000);
    }
  } catch (err) {
    console.error('Error connecting to MongoDB or counting documents:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
  }
});

module.exports = app;
