const { User } = require('../');

module.exports = ({ phoneNumber, email }) => {
  return User.findOne({ email, eligible_phone_numbers: phoneNumber })
    .then(user => !!user)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
