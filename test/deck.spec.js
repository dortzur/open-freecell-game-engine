const expect = require('chai').expect;
const Deck = require('../src').Deck;
describe('Deck', () => {
    it('creates a new deck', () => {
        const deck = Deck();
        expect(deck[0].id).to.eq("AC");
        expect(deck[51].id).to.eq("KS");
    });
    it("shuffles deck like MS FreeCell would", ()=> {
        var deck = Deck(1);
        expect(deck[0].id).to.eq("JD");
        expect(deck[51].id).to.eq("6H");

        deck = Deck(617);
        expect(deck[0].id).to.eq("7D");
        expect(deck[51].id).to.eq("4H");
    })
});