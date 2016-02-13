const expect = require('chai').expect;
const Game = require('../src').Game;
describe('Game', () => {
    it('Creates a new game', () => {
        var game = Game.newGame(1);
        expect(game.board[0][0]).to.eq("JD")
    })
});