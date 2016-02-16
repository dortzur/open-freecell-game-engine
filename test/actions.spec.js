'use strict';
const expect = require('chai').expect;
const Actions = require('../src').Actions;
const Game = require('../src').Game;
describe('Actions', () => {

    it('counts empty cells', () => {
        const game = Game(1);
        const emptyFreeCells = Actions.emptyCellCount(game.freeCells);
        const emptyColumns = Actions.emptyCellCount(game.columns);
        const emptyHomeCells = Actions.emptyCellCount(game.homeCells);
        expect(emptyFreeCells).to.eq(4);
        expect(emptyColumns).to.eq(0);
        expect(emptyHomeCells).to.eq(4);
    });
    it('calculates available moves', ()=> {
        const game = Game(1);
        const moves = Actions.calcAvailableMoves(game.freeCells, game.columns);
        expect(moves).to.eq(5);

    });
    it("get card in cells", function () {
        const game = Game(1);
        const noCard = Actions.getCard(game.freeCells, "JD");
        const card = Actions.getCard(game.columns, "JD");
        const card2 = Actions.getCard(game.columns, "TC");
        expect(noCard).to.eq(undefined);
        expect(card.rank).to.eq(10);
        expect(card2.rank).to.eq(9);
    });
    //it("finds cards on columns", () => {
    //    var game = Game(1);
    //    var position = Game.findCard(game, "JD");
    //    expect(position.cell).to.eq("CO1");
    //    expect(position.index).to.eq(0);
    //    expect(position.card.id).to.eq("JD");
    //    expect(position.cellSize).to.eq(7);
    //    expect(position.stackSize).to.eq(7);
    //
    //    position = Game.findCard(game, "TC");
    //    expect(position.cell).to.eq("CO8");
    //    expect(position.index).to.eq(5);
    //    expect(position.card.id).to.eq("TC");
    //    expect(position.cellSize).to.eq(6);
    //    expect(position.stackSize).to.eq(1);
    //});


});