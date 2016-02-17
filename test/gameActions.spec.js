'use strict';
const expect = require('chai').expect;
const Actions = require('../src').Actions;
const Game = require('../src').Game;
describe('GameActions', () => {

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

});