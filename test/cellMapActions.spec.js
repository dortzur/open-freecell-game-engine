'use strict';
const expect = require('chai').expect;
const CellMapActions = require('../src').CellMapActions;
const Game = require('../src').Game;
describe('CellMapActions', () => {
    it("get card in cells", function () {
        const game = Game(1);
        const noCard = CellMapActions.getCard(game.freeCells, "JD");
        const card = CellMapActions.getCard(game.columns, "JD");
        const card2 = CellMapActions.getCard(game.columns, "TC");
        expect(noCard).to.eq(undefined);
        expect(card.rank).to.eq(10);
        expect(card2.rank).to.eq(9);
    });
});