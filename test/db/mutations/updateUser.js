const { expect } = require('chai');
const { createUser, removeUser, updateUser } = require('../../../db/mutations');

describe('updateUser', () => {
  const name = 'cooper';
  const petName = 'brandon';
  const email = 'fake_email@yahoo.com';
  const room = '123 Fake St';
  const eligiblePhoneNumbers = ['4696826913', '4696826909'];

  before(() => createUser({
    name,
    email,
    eligiblePhoneNumbers,
  }));

  after(() => removeUser({ email }));

  it('can update user', () => (
    updateUser({
      email,
      petName,
      room,
      eligiblePhoneNumbers,
    })
      .then((user) => {
        expect(user.pet_name).to.equal(petName);
        expect(user.room).to.equal(room);
      })
  ));

  it('will not clear if undefined is passed', () => (
    updateUser({
      email,
      petName,
      room,
      eligiblePhoneNumbers: undefined,
    })
      .then((user) => {
        expect(JSON.stringify(user.eligible_phone_numbers))
          .to.equal(JSON.stringify(eligiblePhoneNumbers));
      })
  ));
});
