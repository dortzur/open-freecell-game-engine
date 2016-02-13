const expect = require('chai').expect;
const srand = require('../src/srand');
describe('srand', () => {
    it('creates random numbers for specified seed. MSRand compliant', () => {
        var rand = srand(1);
        expect(rand()).to.eq(41);
        expect(rand()).to.eq(18467);
    })
});