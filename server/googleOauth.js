const { Strategy } = require('passport-google-oauth20');

const {
  GOOGLE_CLIENT_ID: clientID,
  GOOGLE_CLIENT_SECRET: clientSecret,
  GOOGLE_CALLBACK_URL: callbackURL,
} = process.env;

const strategyCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  return cb(null, profile);
};

const strategy = new Strategy({
  clientID,
  clientSecret,
  callbackURL,
}, strategyCallback);

module.exports = {
  strategy,
};
