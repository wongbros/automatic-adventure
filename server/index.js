global.Promise = require('bluebird');
require('dotenv').config();
const http = require('http');
const app = require('./app');
const Twilio = require('twilio');

const {
  API_KEY_SID,
  API_KEY_SECRET,
  PORT,
  ACCOUNT_SID,
} = process.env;

const { AccessToken } = Twilio.jwt;
const { VideoGrant } = AccessToken;

const createToken = (identity) => {
  const accessToken = new AccessToken(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET);

  accessToken.identity = identity;

  const grant = new VideoGrant();
  grant.room = 'Room 1';
  accessToken.addGrant(grant);

  const jwt = accessToken.toJwt();
  console.log({ [identity]: jwt });
};

createToken('Person 1');
createToken('Person 2');


const server = http.Server(app);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
