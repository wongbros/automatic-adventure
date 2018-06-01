const { updateUser } = require('../../db/mutations');
const { checkIsNumberAllowed } = require('../../db/queries');

const getUser = (req, res) => {
  console.log(req);
  res.json({ user: req.user });
};

const initiation = (req, res) => {
  const { phoneNumber, email } = req.body;
  console.log(req.body);
  return checkIsNumberAllowed({ phoneNumber, email })
    .then((isNumberAllowed) => {
      console.log({ isNumberAllowed });
      if (isNumberAllowed) {
        // text
        const hash = 'token'; // create token in twilio
        console.log(`${process.env.CALLER_BASE_URL}/media/${hash}`);
        res.sendStatus(200);
        return;
      }
      res.sendStatus(404);
    });
};

const isAuthenticated = (req, res) => {
  res.json({ authenticated: req.isAuthenticated() });
};

const saveUser = (req, res) => {
  console.log(req.body);
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
};
