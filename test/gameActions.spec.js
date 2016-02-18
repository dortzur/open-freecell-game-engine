'use strict';
const expect = require('chai').expect;
const GameActions = require('../src').GameActions;
const Game = require('../src').Game;
describe('GameActions', () => {

    it('counts empty cells', () => {
        const game = Game(1);
        const emptyFreeCells = GameActions.emptyCellCount(game.freeCells);
        const emptyColumns = GameActions.emptyCellCount(game.columns);
        const emptyHomeCells = GameActions.emptyCellCount(game.homeCells);
        expect(emptyFreeCells).to.eq(4);
        expect(emptyColumns).to.eq(0);
        expect(emptyHomeCells).to.eq(4);
    });
    it('calculates available moves', ()=> {
        const game = Game(1);
        const moves = GameActions.calcAvailableMoves(game.freeCells, game.columns);
        expect(moves).to.eq(5);

    });

});