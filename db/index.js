const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

dotenv.config();
mongoose.connect(process.env.DB);

const db = mongoose.connection;

db.on('error', console.error);

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const User = require('./user');

module.exports = {
  User,
};
