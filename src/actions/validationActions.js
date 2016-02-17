"use strict";
const ValidationResult = require("../models/validationResult");
const Notation = require("../models/notation");
const Actions = require("./gameActions");
const CellActions = require("./cellActions");


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


//CO to CO calc available stack should include whether target cell is empty
const isCard = (card)=>card && card.id && card.notation;

//top card; is target empty
function validateCardToEmptyCell(game, movedCellId, targetCellId) {
    var movedCell = game.gameMap[movedCellId];
    var topCard = CellActions.getTopCard(movedCell);
    var targetCell = game.gameMap[targetCellId];

    if (!isCard(topCard)) {
        return ValidationResult(false, Notation.illegalMoves.inputError);

    }
    return CellActions.isEmpty(targetCell) ? ValidationResult(true) : ValidationResult(false, Notation.illegalMoves.cellNotEmpty)
}
//top card; same suit; ascending
function validateCardToHomeCell(game, movedCellId, targetCellId) {
    var movedCell = game.gameMap[movedCellId];
    var card = CellActions.getTopCard(movedCell);
    var homeCell = game.gameMap[targetCellId];

    if (!isCard(card)) {
        return ValidationResult(false, Notation.illegalMoves.inputError);
    }
    if (CellActions.isEmpty(homeCell)) {
        if (card.rank == 0) {
            return ValidationResult(true);
        } else {
            return ValidationResult(false, Notation.illegalMoves.homeCellWrongRankOrSuit)
        }
    }
    const homeCard = CellActions.getTopCard(homeCell);
    if (card.suitRank == homeCard.suitRank && card.rank - homeCard.rank == 1) {
        return ValidationResult(true);
    }
    return ValidationResult(false, Notation.illegalMoves.homeCellWrongRankOrSuit)
}

function validateCardToColumnCard(movedCard, targetCard) {
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

    return ValidationResult(true);
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
    validateCardToEmptyCell,
    validateCardToHomeCell
};

module.exports = ValidationsActions;