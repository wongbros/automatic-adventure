global.Promise = require('bluebird');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const server = express();

const Twilio = require('twilio');

const {
  API_KEY_SID,
  API_KEY_SECRET,
  SERVER_PORT,
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

server.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));
