const expect = require('chai').expect;
const GameEngine = require('../src');
const GameActions = GameEngine.Actions;
const ValidationActions = GameEngine.ValidationActions;
const Notation = GameEngine.Notation;
const Game = GameEngine.Game;
describe('ValidationActions', () => {
    it('validate COFC', () => {
        var game = Game(1);
        var result = GameActions.attemptMove(game, "CO1", "FC1");
        expect(result.validationResult.success).to.eq(true);
        expect(result.game).to.not.eq(game);
        expect(result.game.freeCells.FC1[0].id).to.eq("6S");
        expect(result.game.freeCells.CO1[5].id).to.eq("6D");
        expect(result.game.freeCells.CO1[6]).to.eq(undefined);
    });
    it('validate COHM', () => {
        var game = Game(1);
        var result = GameActions.attemptMove(game, "CO1", "HM1");
        expect(result.validationResult.success).to.eq(false);
        expect(result.validationResult.illegalMove).to.eq(Notation.illegalMoves.homeCellWrongRankOrSuit);
        expect(result.game).to.eq(game);
    })
});