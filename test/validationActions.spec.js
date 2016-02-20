const expect = require('chai').expect;
const GameEngine = require('../src');
const GameActions = GameEngine.GameActions;
const Notation = GameEngine.Notation;
const Game = GameEngine.Game;
const illegalMoves = Notation.illegalMoves;
const GamePositions = require("./fixtures/gamePositions");
describe('ValidationActions', () => {
    it('validate COFC', () => {
        var game = Game(1);
        var result = GameActions.attemptMove(game, "CO1", "FC1");
        expect(result.validationResult.success).to.eq(true);
        expect(result.game).to.not.eq(game);
        expect(result.game.freeCells.FC1[0].id).to.eq("6S");
        expect(result.game.columns.CO1[5].id).to.eq("6D");
        expect(result.game.columns.CO1[6]).to.eq(undefined);
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
        var game = Game(1);
        game = GameActions.attemptMove(game, "CO6", "FC1").game;
        game = GameActions.attemptMove(game, "CO6", "FC2").game;
        game = GameActions.attemptMove(game, "CO6", "HM1").game;
        var result = GameActions.attemptMove(game, "CO6", "HM2");
        result = GameActions.attemptMove(result.game, "HM2", "HM1");
        expect(result.validationResult.success).to.eq(false);
        expect(result.validationResult.illegalMove).to.eq(illegalMoves.cellNotEmpty);
        result = GameActions.attemptMove(game, "HM2", "HM3");
        expect(result.validationResult.success).to.eq(true);
        expect(game.homeCells.HM3[0].id).to.eq("AS")
    });

    it('validate FCCO', () => {
        var game = Game(1);
        game = GameActions.attemptMove(game, "CO8", "FC1").game;
        game = GameActions.attemptMove(game, "CO1", "FC2").game;
        var result = GameActions.attemptMove(game, "FC2", "CO3");
        expect(result.validationResult.success).to.eq(false);
        expect(result.validationResult.illegalMove).to.eq(illegalMoves.columnCellWrongColorOrRank);
        result = GameActions.attemptMove(game, "FC2", "CO8");
        expect(result.validationResult.success).to.eq(true);
        const CO8Top = game.gameMap.CO8.length - 1;
        expect(result.game.gameMap.CO8[CO8Top].id).to.eq("6S");
        expect(result.game.gameMap.FC2[0]).to.eq(undefined);

    });
    it('validate HMCO', () => {
        var game = Game(1);
        game = GameActions.attemptMove(game, "CO6", "FC1").game;
        game = GameActions.attemptMove(game, "CO6", "FC2").game;
        game = GameActions.attemptMove(game, "CO6", "HM1").game;
        var result = GameActions.attemptMove(game, "FC2", "HM1");
        expect(result.validationResult.success).to.eq(true);
        expect(result.game.homeCells.HM1[1].id).to.eq("2C");
        game = GameActions.attemptMove(result.game, "CO3", "FC2").game;
        game = GameActions.attemptMove(game, "CO3", "FC3").game;
        game = GameActions.attemptMove(game, "FC1", "CO3").game;
        result = GameActions.attemptMove(game, "HM1", "CO3");
        expect(result.validationResult.success).to.eq(true);
        expect(result.game.columns.CO3[result.game.columns.CO3.length - 1].id).to.eq("2C");
        expect(result.game.homeCells.HM1[0].id).to.eq("AC");

    });
    it('validate COCO', () => {


        var game = GamePositions.game1StackedCards();
        console.log(GameActions.print(game));
        var result = GameActions.attemptMove(game, "CO3", "CO1");
        expect(result.validationResult.success).to.eq(false);
        expect(result.validationResult.illegalMove).to.eq(illegalMoves.columnCellWrongColorOrRank);

    })
});