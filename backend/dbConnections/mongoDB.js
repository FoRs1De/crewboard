const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const ip = process.env.MONGODB_IP;
const port = process.env.MONGODB_PORT;

const url = `mongodb://${username}:${password}@${ip}:${port}/admin`;
const client = new MongoClient(url);

module.exports = client;
