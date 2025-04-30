const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'Bases2';

let db = null;

async function connectDB() {
  if (db) return db;
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  db = client.db(dbName);
  return db;
}

module.exports = { connectDB };
