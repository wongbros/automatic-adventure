const { User } = require('../');
const { cleanObject } = require('../util');

module.exports = ({ email, id }) => {
  const filteredUpdates = cleanObject({ email, _id: id });
  return User.findOne(filteredUpdates)
    .catch((err) => {
      console.error(err);
    });
};
