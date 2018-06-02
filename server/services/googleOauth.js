const { findUser } = require('../../db/queries');
const { createUser } = require('../../db/mutations');
const { Strategy } = require('passport-google-oauth20');

const {
  GOOGLE_CLIENT_ID: clientID,
  GOOGLE_CLIENT_SECRET: clientSecret,
  GOOGLE_CALLBACK_URL: callbackURL,
} = process.env;

const strategyCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  const email = profile.emails[0].value;
  const name = profile.displayName;
  return findUser({ email })
    .then((user) => {
      if (!user) {
        return createUser({
          email,
          name,
        });
      }
      return Promise.resolve(user);
    })
    .then(user => cb(null, user));
};

const strategy = new Strategy({
  clientID,
  clientSecret,
  callbackURL,
}, strategyCallback);

module.exports = {
  strategy,
};
