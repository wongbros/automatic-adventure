const { expect } = require('chai');
const { createUser, removeUser } = require('../../../db/mutations');
const { findUserByEmail } = require('../../../db/queries');

describe('findUsersByEmail', () => {
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

  it('can find user by email', () => (
    findUserByEmail({ email })
      .then((user) => {
        expect(user.name).to.equal(name);
        expect(user.email).to.equal(email);
        expect(user.room).to.equal(room);
      })
  ));
});
