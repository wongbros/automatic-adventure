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
  ACCOUNT_SID: accountSid,
} = process.env;

// const client = new Twilio(API_KEY_SID, API_KEY_SECRET, { accountSid });

// client.video.rooms.create({
//   uniqueName: 'Room 1',
//   type: 'group',
//   recordParticipantsOnConnect: 'true',
//   statusCallback: 'http://localhost:3000',
// })
//   .then(console.log);

const { AccessToken } = Twilio.jwt;
const { VideoGrant } = AccessToken;

const accessToken = new AccessToken(accountSid, API_KEY_SID, API_KEY_SECRET);

accessToken.identity = 'Brandon';

const grant = new VideoGrant();
grant.room = 'Room 1';
accessToken.addGrant(grant);

const jwt = accessToken.toJwt();
console.log(jwt);

server.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));
