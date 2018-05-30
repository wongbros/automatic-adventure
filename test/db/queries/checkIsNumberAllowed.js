const { expect } = require('chai');
const { createUser, removeUser } = require('../../../db/mutations');
const { checkIsNumberAllowed } = require('../../../db/queries');

describe('checkIsNumberAllowed', () => {
  const name = 'cooper';
  const email = 'fake_email@yahoo.com';
  const room = '123 Fake St';
  const eligiblePhoneNumbers = ['4696826913', '4696826909'];

  before(() => createUser({
    name,
    email,
    room,
    eligiblePhoneNumbers,
  }));

  after(() => removeUser({ email }));

  it('can check if a number is in whitelist', () => (
    checkIsNumberAllowed({ phoneNumber: '4696826913', email })
      .then((isNumberAllowed) => {
        expect(isNumberAllowed).to.equal(true);
      })
  ));
});
