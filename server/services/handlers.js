const { checkIsNumberAllowed } = require('../../db/queries');

const initiation = (req, res) => {
  const { name, phoneNumber, email } = req.body;
  return checkIsNumberAllowed({ phoneNumber, email })
    .then((isNumberAllowed) => {
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

module.exports = {
  initiation,
};
