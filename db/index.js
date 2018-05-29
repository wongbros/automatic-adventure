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

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  room: { type: String, required: true, unique: true },
  eligible_phone_numbers: { type: Array, required: true },
  sid: { type: String, required: true, unique: true },
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = {
  Pet,
};
