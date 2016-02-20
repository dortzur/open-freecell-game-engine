const expect = require('chai').expect;
const CellActions = require('../src/actions/cellActions');
const Game = require('../src/models/game');

describe('CellActions', () => {

    it('counts empty cells', () => {
        const game = Game(1);
        const emptyFreeCells = CellActions.emptyCellCount(game.freeCells);
        const emptyColumns = CellActions.emptyCellCount(game.columns);
        const emptyHomeCells = CellActions.emptyCellCount(game.homeCells);
        expect(emptyFreeCells).to.eq(4);
        expect(emptyColumns).to.eq(0);
        expect(emptyHomeCells).to.eq(4);
    });

});