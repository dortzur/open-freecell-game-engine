const expect = require('chai').expect;
const GameEngine = require('../src');
const Game = GameEngine.Game;
const GameActions = GameEngine.GameActions;
const GamePositions = require("./fixtures/gamePositions");
const illegalMoves = GameEngine.Notation.illegalMoves;
describe('Miscellaneous tests', () => {
    it('prints game', () => {
        var game = Game(1);
        game = GameActions.attemptMove(game, "CO6", "FC1").game;
        game = GameActions.attemptMove(game, "CO6", "FC2").game;
        game = GameActions.attemptMove(game, "CO6", "HM1").game;
        game = GameActions.attemptMove(game, "CO6", "HM2").game;
        game = GameActions.attemptMove(game, "FC2", "HM2").game;
        expect(GameActions.print(game).length).to.eq(366);
    });
    it("returns invalid input errors", ()=> {
        var game = Game(1);
        var result = GameActions.attemptMove(game, "C06", "FC1");
        expect(result.validationResult.illegalMove).to.eq(illegalMoves.inputError);
        result = GameActions.attemptMove(game, "CO6", "FQ1");
        expect(result.validationResult.illegalMove).to.eq(illegalMoves.inputError);
        result = GameActions.attemptMove(game, "FQ1");
        expect(result.validationResult.illegalMove).to.eq(illegalMoves.inputError);
        result = GameActions.attemptMove(game, undefined, "CO6");
        expect(result.validationResult.illegalMove).to.eq(illegalMoves.inputError);

    });
    it("returns wrong move on empty column moves", ()=> {
        var game = GamePositions.game1EmptyColumn();
        var result = GameActions.attemptMove(game, "CO6", "CO7");
        expect(result.validationResult.illegalMove).to.eq(illegalMoves.columnCellWrongColorOrRank);
        console.log(GameActions.print(result.game));
    });
});