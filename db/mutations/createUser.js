const { User } = require('../');

module.exports = ({
  name,
  email,
  petName,
  room,
  eligiblePhoneNumbers,
}) => {
  const user = new User({
    name,
    email,
    room,
    pet_name: petName,
    eligible_phone_numbers: eligiblePhoneNumbers,
  });
  return user.save()
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
