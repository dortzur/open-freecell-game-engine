const expect = require('chai').expect;
const Game = require('../src').Game;
describe('Game', () => {
    it('Creates game #1', () => {
        var game = Game(1);
        expect(game.columns.CO1[0].id).to.eq("JD");
        expect(game.columns.CO8[5].id).to.eq("TC");
    });
    it('Creates game #617', () => {
        var game = Game(617);
        expect(game.columns.CO1[0].id).to.eq("7D");
        expect(game.columns.CO8[5].id).to.eq("QH");
    });
});