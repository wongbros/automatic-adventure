const { User } = require('../');

module.exports = ({ email }) => {
  return User.deleteOne({ email })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
