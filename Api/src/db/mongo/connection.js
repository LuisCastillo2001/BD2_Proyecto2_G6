const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'clinica';

let db = null;

async function connectMongo() {
  if (db) return db;
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  db = client.db(dbName);
  return db;
}

module.exports = { connectMongo };
