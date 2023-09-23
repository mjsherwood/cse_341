const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = async (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  try {
    _db = await MongoClient.connect(process.env.MONGODB_URI);
    callback(null, _db);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => {
  if (!_db) {
    throw new Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};