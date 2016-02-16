"use strict";
const GameEngine = require("../");
const ValidationResult = GameEngine.ValidationResult;
const Notation = GameEngine.Notation;

function validateCardMove(movedCard, targetCard) {
    if(!movedCard.id) {
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

const ValidationsActions = {
    validateCardMove
};

module.exports = ValidationsActions;