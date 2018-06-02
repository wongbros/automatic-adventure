global.Promise = require('bluebird');
require('dotenv').config();
const http = require('http');
const express = require('express');
const path = require('path');
const app = require('./app');
const socketio = require('socket.io');
const { createToken } = require('./services/twilio');
const { findUser } = require('../db/queries');

const {
  PORT,
  NODE_ENV,
} = process.env;

let socket;

app.get('/token', (req, res) => {
  console.log({ socket });
  if (socket) {
    socket.emit('token', createToken('Pet name'));
    res.json({ token: createToken('Caller name') });
    return;
  }
  res.sendStatus(404);
});

app.get('/connection', (req, res) => {
  console.log('params', req.params);
  console.log('query', req.query);
  const { user, hash } = req.query;
  if (!user || !hash) {
    const error = new Error('Missing fields');
    console.error(`user: ${user}, hash: ${hash}`);
    res.sendStatus(404).send(error);
    return;
  }
  const id = user.substring(4);
  findUser({ id })
    .then((foundUser) => {
      if (!foundUser) {
        res.sendStatus(404);
        return;
      }
      console.log(foundUser);
      socket.emit('token', createToken(foundUser.pet_name || 'Pet'));
      res.json({ token: createToken(foundUser.name) });
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
