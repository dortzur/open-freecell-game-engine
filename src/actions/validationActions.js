"use strict";
const ValidationResult = require("../models/validationResult");
const Notation = require("../models/notation");
const CellActions = require("./cellActions");
const illegalMoves = Notation.illegalMoves;
const AnalysisActions = require('./analysisActions');
const CardActions = require('./cardActions');
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


//top card; is target empty
function validateTopCardToEmptyCell(game, movedCellId, targetCellId) {
    var movedCell = game.gameMap[movedCellId];
    var topCard = CellActions.getTopCard(movedCell);
    var targetCell = game.gameMap[targetCellId];

    if (!CardActions.isCard(topCard)) {
        return ValidationResult(false, illegalMoves.inputError);

    }
    return CellActions.isEmpty(targetCell) ? ValidationResult(true) : ValidationResult(false, illegalMoves.cellNotEmpty)
}
//top card; same suit; ascending
function validateTopCardToHomeCell(game, movedCellId, targetCellId) {
    var movedCell = game.gameMap[movedCellId];
    var card = CellActions.getTopCard(movedCell);
    var homeCell = game.gameMap[targetCellId];

    if (!CardActions.isCard(card)) {
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
//top card; column card move;
function validateTopCardToColumnCard(game, movedCellId, targetCellId) {
    var movedCell = game.gameMap[movedCellId];
    var movedCard = CellActions.getTopCard(movedCell);
    var targetCell = game.gameMap[targetCellId];
    var targetCard = CellActions.getTopCard(targetCell);

    return validateColumnCardToColumnCard(movedCard, targetCard);
}
//column card move;
function validateColumnCardToColumnCard(movedCard, targetCard) {
    if (!movedCard.id) {
        return ValidationResult(false, illegalMoves.inputError);
    }
    if (!targetCard.id) {
        return ValidationResult(true);
    }
    if (CardActions.areCardsStackable(movedCard, targetCard)) {
        return ValidationResult(true);
    }
    return ValidationResult(false, illegalMoves.columnCellWrongColorOrRank);
}

// calc max stack size; descending stack; column card move;
function validateColumnCellToColumnCell(game, movedCellId, targetCellId) {
    var movedCell = game.gameMap[movedCellId];
    var targetCell = game.gameMap[targetCellId];
    var isEmptyTarget = CellActions.isEmpty(targetCell);
    var availableMoves = AnalysisActions.calcAvailableMoves(game, isEmptyTarget);
    if (isEmptyTarget) {
        return ValidationResult(true, null, availableMoves);
    }
    var movedStack = CellActions.getTopStack(movedCell, availableMoves);
    var targetCard = CellActions.getTopCard(targetCell);

    var approvedStackIndex = movedStack.indexOf(function (movedCard) {
        return validateColumnCardToColumnCard(movedCard, targetCard).validationResult.success;
    });
    if (approvedStackIndex == -1) {
        return ValidationResult(false, illegalMoves.columnCellWrongColorOrRank);
    }
    var approvedStackSize = movedStack.length - approvedStackIndex;

    return ValidationResult(true, null, approvedStackSize);
}
const ValidationsActions = {
    validateTopCardToEmptyCell,
    validateTopCardToHomeCell,
    validateTopCardToColumnCard,
    validateColumnCellToColumnCell
};

module.exports = ValidationsActions;