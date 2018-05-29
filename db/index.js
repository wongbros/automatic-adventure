const mongoose = require('mongoose');

mongoose.connect(process.env.DB);

const db = mongoose.connection;

db.on('error', console.error);

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const PetModel = new mongoose.Schema({
  name: String,
  room: String,
  eligible_phone_numbers: Array,
  sid: String,
});

const Pet = mongoose.model('Pet', PetModel);

module.exports = {
  Pet,
};
