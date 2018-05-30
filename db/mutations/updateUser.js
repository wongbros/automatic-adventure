const { User } = require('../');

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
  const filteredUpdates = Object.entries(updates).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});
  const options = { new: true };
  return User.findOneAndUpdate(conditions, filteredUpdates, options)
    .catch((err) => {
      console.error(err);
    });
};
