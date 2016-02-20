const expect = require('chai').expect;
const AnalysisActions = require('../src/actions/analysisActions');
const Game = require('../src/models/game');

describe('AnalysisActions', () => {


    it('calculates available moves', ()=> {
        const game = Game(1);
        const moves = AnalysisActions.calcAvailableMoves(game);
        expect(moves).to.eq(5);

    });

});