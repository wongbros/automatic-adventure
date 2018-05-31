global.Promise = require('bluebird');
require('dotenv').config();
const http = require('http');
const app = require('./app');
const { createToken } = require('./services/twilio');

const {
  PORT,
} = process.env;

createToken('Person 1');
createToken('Person 2');


const server = http.Server(app);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
