const { Pet } = require('../');

const checkIsNumberAllowed = ({ phoneNumber, room }) => {
  return Pet.findOne({ room, eligible_phone_numbers: phoneNumber })
    .then(pet => !!pet)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

module.exports = {
  checkIsNumberAllowed,
};
