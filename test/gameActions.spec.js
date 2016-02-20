'use strict';
const expect = require('chai').expect;
const GameActions = require('../src').GameActions;
const Game = require('../src').Game;
describe('GameActions', () => {


    it('calculates available moves', ()=> {
        const game = Game(1);
        const moves = GameActions.calcAvailableMoves(game.freeCells, game.columns);
        expect(moves).to.eq(5);

    });

});