const expect = require('chai').expect;
const Card = require('../src/card');
describe('card', () => {
    it('creates a new card from notation', () => {
        var card = Card.makeCard("JD");
        expect(card.color).to.eq("RED");
        expect(card.colorRank).to.eq(1);
        expect(card.rank).to.eq(10);

        card = Card.makeCard("AC");
        expect(card.color).to.eq("BLACK");
        expect(card.colorRank).to.eq(0);
        expect(card.rank).to.eq(0);
    })
});