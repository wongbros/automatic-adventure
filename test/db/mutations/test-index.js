const { expect } = require('chai');
const { createPet, removePet } = require('../../../db/mutations');

describe('mutations', () => {
  it('can add a new pet and remove', () => {
    const name = 'cooper';
    const room = '234 Fake St';
    const eligiblePhoneNumbers = ['4696826913', '4696826909'];
    return createPet({
      name,
      room,
      eligiblePhoneNumbers,
    })
      .then((pet) => {
        expect(pet.name).to.equal(name);
        expect(pet.room).to.equal(room);
        expect(JSON.stringify(pet.eligible_phone_numbers))
          .to.equal(JSON.stringify(eligiblePhoneNumbers));
        return removePet({ room });
      })
      .then((deleted) => {
        expect(deleted.ok).to.equal(1);
      });
  });
});
