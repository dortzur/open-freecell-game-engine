const expect = require('chai').expect;
const GameEngine = require('../src');
const Game = require('../src').Game;
const GameActions = require('../src').GameActions;
describe('Miscellaneous tests', () => {
    it('prints game', () => {
        var game = Game(1);
        console.log(GameActions.print(game));
        game = GameActions.attemptMove(game, "CO6", "FC1").game;
        game = GameActions.attemptMove(game, "CO6", "FC2").game;
        game = GameActions.attemptMove(game, "CO6", "HM1").game;
        game = GameActions.attemptMove(game, "CO6", "HM2").game;
        game = GameActions.attemptMove(game, "FC2", "HM2").game;
        expect(GameActions.print(game).length).to.eq(366);
    });
});