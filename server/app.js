const express = require('express');
const path = require('path');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const { strategy } = require('./googleOauth');

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/test', (req, res) => {
  console.log(req);
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.send('Hello');
});

app.get('/login', passport.authenticate('google', { scope: ['email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect(PET_CLIENT_URL),
);

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
