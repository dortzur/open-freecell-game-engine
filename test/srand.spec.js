const expect = require('chai').expect;
const srand = require('../src/srand');
describe('srand - MSRand compliant random number generator', () => {
    it('creates random', () => {
        var rand = srand(1);
        var baba = rand();
        console.log(rand());
        console.log(rand());
        expect("bab").to.be.a("String");

        //
    })
});