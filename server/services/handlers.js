const urlHash = require('url-hash');
const { updateUser } = require('../../db/mutations');
const { checkIsNumberAllowed } = require('../../db/queries');

urlHash.config({
  hashKey: process.env.HASH_KEY,
});

const getUser = (req, res) => {
  res.json({ user: req.user });
};

const initiation = (req, res) => {
  const { phoneNumber, email } = req.body;
  return checkIsNumberAllowed({ phoneNumber, email })
    .then((user) => {
      if (user) {
        // text
        const hash = urlHash.create(`/media/connection?user=usr-${user._id.toString()}`);
        const url = `${process.env.CALLER_BASE_URL}${hash}`;
        console.log({ url });
        res.sendStatus(200);
        return;
      }
      res.sendStatus(404);
    });
};

const isAuthenticated = (req, res) => {
  res.json({ authenticated: req.isAuthenticated() });
};

const protectRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.sendStatus(404);
};

const saveUser = (req, res) => {
  return updateUser(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400).send(err);
    });
};

module.exports = {
  getUser,
  initiation,
  isAuthenticated,
  saveUser,
  protectRoute,
  urlHash,
};
