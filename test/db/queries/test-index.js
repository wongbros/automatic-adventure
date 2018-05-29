const { expect } = require('chai');
const { createPet, removePet } = require('../../../db/mutations');
const { checkIsNumberAllowed } = require('../../../db/queries');

describe('mutations', () => {
  it('can add a new pet and remove', () => {
    const name = 'cooper';
    const room = '123 Fake St';
    const sid = '456';
    const eligiblePhoneNumbers = ['4696826913', '4696826909'];
    return createPet({
      name,
      room,
      sid,
      eligiblePhoneNumbers,
    })
      .then(() => checkIsNumberAllowed({ phoneNumber: '4696826913', room }))
      .then((isNumberAllowed) => {
        expect(isNumberAllowed).to.equal(true);
        return removePet({ sid });
      });
  });
});
