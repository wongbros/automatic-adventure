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
  console.log('updates:', updates);
  const filteredUpdates = cleanObject(updates);
  console.log(filteredUpdates);
  const options = { new: true };
  return User.findOneAndUpdate(conditions, filteredUpdates, options)
    .catch((err) => {
      console.error(err);
    });
};
