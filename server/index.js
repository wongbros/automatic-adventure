global.Promise = require('bluebird');
require('dotenv').config();
const http = require('http');
const express = require('express');
const path = require('path');
const app = require('./app');
const socketio = require('socket.io');
const { createToken } = require('./services/twilio');
const { findUser } = require('../db/queries');
const { urlHash, protectRoute } = require('./services/handlers');

const {
  PORT,
  NODE_ENV,
} = process.env;

let socket;

app.get('/connection', protectRoute, (req, res) => {
  const { user, hash } = req.query;
  if (!user || !hash) {
    const error = new Error('Missing fields');
    console.error(`user: ${user}, hash: ${hash}`);
    res.sendStatus(404).send(error);
    return;
  }
  const hashedUrl = `/media${req.originalUrl}`;
  if (!urlHash.check(hashedUrl)) {
    res.sendStatus(404);
    return;
  }
  const id = user.substring(4);
  findUser({ id })
    .then((foundUser) => {
      if (!foundUser) {
        res.sendStatus(404);
        return;
      }
      if (socket) {
        const room = foundUser.room || 'Room 1';
        socket.emit('token', {
          token: createToken({
            identity: foundUser.pet_name || 'Pet',
            room,
          }),
          room,
        });
        res.json({
          token: createToken({
            identity: foundUser.name,
            room,
          }),
          room,
        });
        return;
      }
      res.sendStatus(404);
    });
});

const entry = NODE_ENV === 'production' ? 'build' : 'public';

app.use(express.static(path.resolve(__dirname, '..', entry)));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', entry, 'index.html'));
});

const server = http.Server(app);

const io = socketio(server);

io.on('connection', (sock) => {
  console.log('Connected to socket');
  socket = sock;
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
