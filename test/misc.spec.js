const expect = require('chai').expect;
const GameEngine = require('../src');
const Game = require('../src').Game;
const GameActions = require('../src').GameActions;

describe('Miscellaneous tests', () => {
    it('prints game', () => {
        var game = Game(1);
        console.log(GameActions.toString(game));

        game = GameActions.attemptMove(game, "CO3", "FC1").game;
        console.log(GameActions.toString(game));

    })
});