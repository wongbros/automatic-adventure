const { Pet } = require('../');

const createPet = ({
  name,
  room,
  eligiblePhoneNumbers,
  sid,
}) => {
  const pet = new Pet({
    name,
    room,
    sid,
    eligible_phone_numbers: eligiblePhoneNumbers,
  });
  return pet.save()
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const removePet = ({ sid }) => {
  return Pet.deleteOne({ sid })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

module.exports = {
  createPet,
  removePet,
};
