const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pet_name: { type: String },
  room: { type: String },
  eligible_phone_numbers: { type: Array },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
