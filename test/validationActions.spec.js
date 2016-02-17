const expect = require('chai').expect;
const GameEngine = require('../src');
const GameActions = GameEngine.Actions;
const ValidationActions = GameEngine.ValidationActions;
const Game = GameEngine.Game;
describe('ValidationActions', () => {
    it('validate COFC', () => {
        var game = Game(1);
        var result = GameActions.validateMove(game, "CO1", "FC1");
        expect(result.success).to.eq(true);
    })
});