const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const { strategy } = require('./services/googleOauth');
const {
  connect,
  getUser,
  isAuthenticated,
  initiation,
  saveUser,
} = require('./services/handlers');

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

app.get('/authenticated', isAuthenticated);

app.get('/login', passport.authenticate('google', { scope: ['email'] }));

app.get('/user', getUser);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect(PET_CLIENT_URL),
);

app.post('/save-user', saveUser);

app.post('/initiate', initiation);

module.exports = app;
