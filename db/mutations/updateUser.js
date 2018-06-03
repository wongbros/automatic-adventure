const { User } = require('../');
const { cleanObject } = require('../util');

module.exports = ({
  email,
  petName,
  room,
  eligiblePhoneNumbers,
}) => {
  const conditions = { email };
  const updates = {
    room,
    pet_name: petName,
    eligible_phone_numbers: eligiblePhoneNumbers,
  };
  const filteredUpdates = cleanObject(updates);
  const options = { new: true };
  return User.findOneAndUpdate(conditions, filteredUpdates, options)
    .catch((err) => {
      console.error(err);
    });
};
