const expect = require('chai').expect;
const srand = require('../src/srand');
describe('srand - MSRand compliant random number generator', () => {
    it('creates random numbers for specified', () => {
        var rand = srand(1);
        expect(rand()).to.eq(41);
        expect(rand()).to.eq(18467);
    })
});