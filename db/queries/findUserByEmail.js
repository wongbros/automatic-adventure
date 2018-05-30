const { User } = require('../');

module.exports = ({ email }) => {
  return User.findOne({ email })
    .catch((err) => {
      console.error(err);
    });
};
