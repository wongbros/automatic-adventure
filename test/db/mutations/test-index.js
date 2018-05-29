const { expect } = require('chai');
const { createPet, removePet } = require('../../../db/mutations');

describe('mutations', () => {
  it('can add a new pet and remove', () => {
    const name = 'cooper';
    const room = '234 Fake St';
    const sid = '456';
    const eligiblePhoneNumbers = ['4696826913', '4696826909'];
    return createPet({
      name,
      room,
      sid,
      eligiblePhoneNumbers,
    })
      .then((pet) => {
        expect(pet.name).to.equal(name);
        expect(pet.room).to.equal(room);
        expect(pet.sid).to.equal(sid);
        expect(JSON.stringify(pet.eligible_phone_numbers))
          .to.equal(JSON.stringify(eligiblePhoneNumbers));
        return removePet({ sid });
      })
      .then((deleted) => {
        expect(deleted.ok).to.equal(1);
      });
  });
});
