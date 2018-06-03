const { User } = require('../');

module.exports = ({ phoneNumber, email }) => {
  return User.findOne({ email, eligible_phone_numbers: phoneNumber })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
