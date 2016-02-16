"use strict";
const GameEngine = require("../");
const ValidationResult = GameEngine.ValidationResult;
const Notation = GameEngine.Notation;
const Actions = GameEngine.Actions;


/*
 * Validation move logic
 *
 * HM to HM -> top card; is target empty
 * FC to HM -> top card; same suit; ascending
 * CO to HM -> top card; same suit; ascending
 *
 * FC to FC -> top card; is target empty
 * HM to FC -> top card; is target empty
 * CO to FC -> top card; is target empty
 *
 * CO to CO -> calc max stack size; descending stack; column card move;
 * FC to CO -> top card; column card move;
 * HM to cO -> top card; column card move;
 *
 * */


function validateCardMove(movedCard, targetCard) {
    if (!movedCard.id) {
        return ValidationResult(false, Notation.illegalMoves.inputError);
    }
    if (!targetCard.id) {
        return ValidationResult(true);
    }
    if (movedCard.color == targetCard.color) {
        return ValidationResult(false, Notation.illegalMoves.sameColor);
    }
    if (movedCard.rank - targetCard.rank != -1) {
        return ValidationResult(false, Notation.illegalMoves.wrongRank);
    }
}

function validateCellMove(game, movedCellId, targetCellId) {
    const gameMap = game.gameMap;
    const movedCell = gameMap[movedCellId];
    const targetCell = gameMap[targetCellId];
    if (movedCell === targetCell || movedCell === undefined || targetCell === undefined) {
        return ValidationResult(false, Notation.illegalMoves.inputError);
    }



    const availableMoves = Actions.calcAvailableMoves(game.freeCells, game.columns);


}
const ValidationsActions = {
    validateCardMove
};

module.exports = ValidationsActions;