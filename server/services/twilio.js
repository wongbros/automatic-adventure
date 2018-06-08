require('dotenv').config();
const Twilio = require('twilio');

const { AccessToken } = Twilio.jwt;
const { VideoGrant } = AccessToken;

const {
  API_KEY_SID,
  API_KEY_SECRET,
  ACCOUNT_SID,
  AUTH_TOKEN,
  TWILIO_NUMBER,
} = process.env;

const createToken = (identity) => {
  const accessToken = new AccessToken(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET);

  accessToken.identity = identity;

  const grant = new VideoGrant();
  grant.room = identity.room;
  accessToken.addGrant(grant);

  const jwt = accessToken.toJwt();
  console.log({ [identity]: jwt });
  return jwt;
};

const client = Twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendSms = ({ message, to }) => {
  return client.messages
    .create({
      body: message,
      from: TWILIO_NUMBER,
      to,
    })
    .catch((err) => {
      console.error(err);
    });
};


module.exports = {
  createToken,
  sendSms,
};
