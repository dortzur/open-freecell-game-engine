const expect = require('chai').expect;
const Game = require('../src').Game;
describe('Game', () => {
    it('Creates game #1', () => {
        var game = Game.newGame(1);
        expect(game.board[0][0].id).to.eq("JD");
        expect(game.board[7][5].id).to.eq("TC");

    });
    it('Creates game #617', () => {
        var game = Game.newGame(617);
        expect(game.board[0][0].id).to.eq("7D");
        expect(game.board[7][5].id).to.eq("QH");
    });
    it("finds cards on board", () => {
        var game = Game.newGame(1);
        var position = Game.findCard(game, "JD");
        expect(position.cell).to.eq("CO1");
        expect(position.index).to.eq(0);
        expect(position.card.id).to.eq("JD");
        expect(position.cellSize).to.eq(7);

        position = Game.findCard(game, "TC");
        expect(position.cell).to.eq("CO8");
        expect(position.index).to.eq(5);
        expect(position.card.id).to.eq("TC");
        expect(position.cellSize).to.eq(6);

    });

    it('counts free cells', () => {
        const game = Game.newGame(1);
        var count = Game.freeCellCount(game);
        expect(count).to.eq(4);
    })

});