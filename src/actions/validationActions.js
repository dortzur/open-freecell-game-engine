"use strict";
const ValidationResult = require("../models/validationResult");
const Notation = require("../models/notation");
const GameActions = require("./gameActions");
const CellActions = require("./cellActions");
const illegalMoves = Notation.illegalMoves;

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


//top card; column card move;
function validateCardToColumnCell(game, movedCellId, targetCellId) {

}

//top card; is target empty
function validateCardToEmptyCell(game, movedCellId, targetCellId) {
    var movedCell = game.gameMap[movedCellId];
    var topCard = CellActions.getTopCard(movedCell);
    var targetCell = game.gameMap[targetCellId];

    if (!isCard(topCard)) {
        return ValidationResult(false, illegalMoves.inputError);

    }
    return CellActions.isEmpty(targetCell) ? ValidationResult(true) : ValidationResult(false, illegalMoves.cellNotEmpty)
}
//top card; same suit; ascending
function validateCardToHomeCell(game, movedCellId, targetCellId) {
    var movedCell = game.gameMap[movedCellId];
    var card = CellActions.getTopCard(movedCell);
    var homeCell = game.gameMap[targetCellId];

    if (!isCard(card)) {
        return ValidationResult(false, illegalMoves.inputError);
    }
    if (CellActions.isEmpty(homeCell)) {
        if (card.rank == 0) {
            return ValidationResult(true);
        } else {
            return ValidationResult(false, illegalMoves.homeCellWrongRankOrSuit)
        }
    }
    const homeCard = CellActions.getTopCard(homeCell);
    if (card.suitRank == homeCard.suitRank && card.rank - homeCard.rank == 1) {
        return ValidationResult(true);
    }
    return ValidationResult(false, illegalMoves.homeCellWrongRankOrSuit)
}

function validateCardToColumnCard(game, movedCellId, targetCellId) {
    var movedCell = game.gameMap[movedCellId];
    var movedCard = CellActions.getTopCard(movedCell);
    var targetCell = game.gameMap[targetCellId];
    var targetCard = CellActions.getTopCard(targetCell);

    if (!movedCard.id) {
        return ValidationResult(false, illegalMoves.inputError);
    }
    if (!targetCard.id) {
        return ValidationResult(true);
    }
    if (movedCard.color == targetCard.color || movedCard.rank - targetCard.rank != -1) {
        return ValidationResult(false, illegalMoves.columnCellWrongColorOrRank);
    }
    return ValidationResult(true);
}

const ValidationsActions = {
    validateCardToEmptyCell,
    validateCardToHomeCell,
    validateCardToColumnCard
};

module.exports = ValidationsActions;