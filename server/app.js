const express = require('express');
const path = require('path');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const { strategy } = require('./services/googleOauth');
const { updateUser } = require('../db/mutations');

const {
  PET_CLIENT_URL,
  SESSION_SECRET: secret,
} = process.env;


passport.use(strategy);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

const app = express();

app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret, resave: true, saveUninitialized: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.use(passport.initialize());
app.use(passport.session());

app.get('/authenticated', (req, res) => {
  res.json({ authenticated: req.isAuthenticated() });
});

app.get('/login', passport.authenticate('google', { scope: ['email'] }));

app.get('/user', (req, res) => {
  console.log(req);
  res.json({ user: req.user });
});

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect(PET_CLIENT_URL),
);

app.post('/save-user', (req, res) => {
  console.log(req.body);
  return updateUser(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400).send(err);
    });
});

module.exports = app;
