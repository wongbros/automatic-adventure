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
  NODE_ENV,
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

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect(PET_CLIENT_URL),
);

const entry = NODE_ENV === 'production' ? 'build' : 'public';

app.use(express.static(path.resolve(__dirname, '..', entry)));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', entry, 'index.html'));
});

module.exports = app;
