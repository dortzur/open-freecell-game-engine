const expect = require('chai').expect;
const GameEngine = require('../src');
const GameActions = GameEngine.Actions;
const ValidationActions = GameEngine.ValidationActions;
const Notation = GameEngine.Notation;
const Game = GameEngine.Game;
const illegalMoves = Notation.illegalMoves;
describe('ValidationActions', () => {
    it('validate COFC', () => {
        var game = Game(1);
        var result = GameActions.attemptMove(game, "CO1", "FC1");
        expect(result.validationResult.success).to.eq(true);
        expect(result.game).to.not.eq(game);
        expect(result.game.freeCells.FC1[0].id).to.eq("6S");
        expect(result.game.freeCells.CO1[5].id).to.eq("6D");
        expect(result.game.freeCells.CO1[6]).to.eq(undefined);
        result = GameActions.attemptMove(result.game, "CO2", "FC1");
        expect(result.validationResult.success).to.eq(false);
        expect(result.validationResult.illegalMove).to.eq(illegalMoves.cellNotEmpty);
    });

    it('validate HMFC', () => {
        var game = Game(1);
        game = GameActions.attemptMove(game, "CO6", "FC1").game;
        game = GameActions.attemptMove(game, "CO6", "FC2").game;
        game = GameActions.attemptMove(game, "CO6", "HM1").game;
        var result = GameActions.attemptMove(game, "HM1", "FC2");
        expect(result.validationResult.illegalMove).to.eq(illegalMoves.cellNotEmpty);
        result = GameActions.attemptMove(game, "HM1", "FC3");
        expect(result.validationResult.success).to.eq(true);
        expect(game.freeCells.FC3[0].id).to.eq("AC");
    });
    it('validate FCFC', () => {
        var game = Game(1);
        game = GameActions.attemptMove(game, "CO1", "FC1").game;
        game = GameActions.attemptMove(game, "CO1", "FC2").game;
        var result = GameActions.attemptMove(game, "FC1", "FC3");
        expect(result.validationResult.success).to.eq(true);
        result = GameActions.attemptMove(game, "FC3", "FC2");
        expect(result.validationResult.illegalMove).to.eq(illegalMoves.cellNotEmpty);
        result = GameActions.attemptMove(game, "FC4", "FC2");
        expect(result.validationResult.illegalMove).to.eq(illegalMoves.inputError);
    });

    it('validate FCHM', () => {
        var game = Game(1);
        game = GameActions.attemptMove(game, "CO6", "FC1").game;
        game = GameActions.attemptMove(game, "CO6", "FC2").game;
        game = GameActions.attemptMove(game, "CO6", "HM1").game;
        var result = GameActions.attemptMove(game, "FC2", "HM2");
        expect(result.validationResult.success).to.eq(false);
        expect(result.validationResult.illegalMove).to.eq(illegalMoves.homeCellWrongRankOrSuit);
        result = GameActions.attemptMove(game, "FC2", "HM1");
        expect(result.validationResult.success).to.eq(true);
        expect(result.game.homeCells.HM1[1].id).to.eq("2C");
        expect(result.game.freeCells.FC2[0]).to.eq(undefined);
    });
    it('validate COHM', () => {
        var game = Game(1);
        var result = GameActions.attemptMove(game, "CO1", "HM1");
        expect(result.validationResult.success).to.eq(false);
        expect(result.validationResult.illegalMove).to.eq(illegalMoves.homeCellWrongRankOrSuit);
        expect(result.game).to.eq(game);
    });
    it('validate HMHM', () => {

    });

    it('validate FCCO', () => {

    });
    it('validate HMCO', () => {

    });
    it('validate COCO', () => {

    })
});