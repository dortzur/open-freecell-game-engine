const expect = require('chai').expect;
const GameEngine = require('../src');
const GameActions = GameEngine.Actions;
const ValidationActions = GameEngine.ValidationActions;
const Notation = GameEngine.Notation;
const Game = GameEngine.Game;
describe('ValidationActions', () => {
    it('validate COFC', () => {
        var game = Game(1);
        var result = GameActions.validateMove(game, "CO1", "FC1");
        expect(result.success).to.eq(true);
    });
    it('validate COHM', () => {
        var game = Game(1);
        var result = GameActions.validateMove(game, "CO1", "HM1");
        expect(result.success).to.eq(false);
        expect(result.illegalMove).to.eq(Notation.illegalMoves.homeCellWrongRankOrSuit);
    })
});