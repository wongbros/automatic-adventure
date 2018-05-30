const { expect } = require('chai');
const { createUser, removeUser } = require('../../../db/mutations');

describe('mutations', () => {
  let user;
  const name = 'cooper';
  const email = 'fake_email@gmail.com';
  const petName = 'brandon';
  const room = '123 Fake St';
  const eligiblePhoneNumbers = ['4696826913', '4696826909'];

  after(() => {
    if (user) {
      removeUser({ email });
    }
  });

  it('can add a new user and remove', () => createUser({
    name,
    email,
    petName,
    room,
    eligiblePhoneNumbers,
  })
    .then((createdUser) => {
      user = createdUser;
      expect(user.name).to.equal(name);
      expect(user.email).to.equal(email);
      expect(user.pet_name).to.equal(petName);
      expect(user.room).to.equal(room);
      expect(JSON.stringify(user.eligible_phone_numbers))
        .to.equal(JSON.stringify(eligiblePhoneNumbers));
      return removeUser({ email });
    })
    .then((deleted) => {
      expect(deleted.ok).to.equal(1);
    }));
});
