const { expect } = require('chai');
const { createUser, removeUser } = require('../../../db/mutations');
const { findUser } = require('../../../db/queries');

describe('findUser', () => {
  let user;
  const name = 'cooper';
  const email = 'fake_email@yahoo.com';
  const room = '123 Fake St';
  const eligiblePhoneNumbers = ['4696826913', '4696826909'];

  before(() => createUser({
    name,
    email,
    room,
    eligiblePhoneNumbers,
  })
    .then((createdUser) => {
      user = createdUser;
    }));

  after(() => removeUser({ email }));

  it('can find user by email', () => (
    findUser({ email })
      .then((foundUser) => {
        expect(foundUser.name).to.equal(name);
        expect(foundUser.email).to.equal(email);
        expect(foundUser.room).to.equal(room);
      })
  ));

  it('can find user by _id', () => {
    findUser({ id: user.id })
      .then((foundUser) => {
        expect(foundUser.name).to.equal(name);
        expect(foundUser.email).to.equal(email);
        expect(foundUser.room).to.equal(room);
      });
  })
});
