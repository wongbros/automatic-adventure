global.Promise = require('bluebird');
require('dotenv').config();
const http = require('http');
const express = require('express');
const path = require('path');
const app = require('./app');
const socketio = require('socket.io');
const { createToken } = require('./services/twilio');

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
