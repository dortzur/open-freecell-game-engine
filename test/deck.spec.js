const expect = require('chai').expect;
const Deck = require('../src/deck');
describe('deck', () => {
    it('creates a new deck', () => {
        const deck = Deck.makeDeck();
        expect(deck[0].id).to.eq("AC");
        expect(deck[51].id).to.eq("KS");
    });
    it("shuffles deck like MS FreeCell would", ()=> {
        var deck = Deck.makeDeck(1);
        expect(deck[0].id).to.eq("JD");
        expect(deck[51].id).to.eq("6H");

        deck = Deck.makeDeck(617);
        expect(deck[0].id).to.eq("7D");
        expect(deck[51].id).to.eq("4H");
    })
});