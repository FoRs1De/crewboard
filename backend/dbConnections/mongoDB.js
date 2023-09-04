const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const url = `mongodb://${username}:${password}@158.101.168.43:27017/admin`;
const client = new MongoClient(url);

module.exports = client;
