'use strict';

const illegalMoves = require("../models/notation").illegalMoves;
const ValidationResult = require('../models/validationResult');
const CellActions = require('./cellActions');
const ValidationMap = require('../models/validationMap');
const MoveResult = require('../models/moveResult');


function getMoveId(movedCellId, targetCellId) {
    movedCellId = movedCellId || "";
    targetCellId = targetCellId || "";
    const movedCellType = CellActions.getCellType(movedCellId);
    const targetCellType = CellActions.getCellType(targetCellId);
    return movedCellType + targetCellType;
}

function performMove(game, movedCellId, targetCellId, approvedStackSize) {
    const _game = Object.assign({}, game);
    const movedCell = _game.gameMap[movedCellId];
    const targetCell = _game.gameMap[targetCellId];
    const moveId = getMoveId(movedCellId, targetCellId);

    if (moveId == "COCO" && approvedStackSize > 1) {
        var topStack = CellActions.getTopStack(movedCell, approvedStackSize);
        for (var i = 0; i < approvedStackSize; i++) {
            targetCell.push(topStack.pop());
            movedCell.pop();
        }
    } else {
        targetCell.push(movedCell.pop());
    }
    return _game;
}

function validateMove(game, movedCellId, targetCellId) {
    const moveId = getMoveId(movedCellId, targetCellId);
    if (ValidationMap[moveId] == undefined) {
        return ValidationResult(false, illegalMoves.inputError);
    }
    return ValidationMap[moveId](game, movedCellId, targetCellId);
}

function attemptMove(game, movedCellId, targetCellId) {
    const validationResult = validateMove(game, movedCellId, targetCellId);
    if (validationResult.success) {
        game = performMove(game, movedCellId, targetCellId, validationResult.approvedStackSize);
    }
    return MoveResult(game, validationResult);
}
function print(game) {
    function printHeaders(cellMap) {
        var template = "";
        Object.keys(cellMap).forEach((key, index, keys)=> {
            template += `${key} `;
            if (index < keys.length - 1) {
                template += "\t";
            }
        });
        return template;
    }

    function printCells(cells) {
        var emptyCount = 0;
        var row = 0;
        var template = "";
        const cellCount = Object.keys(cells).length;
        while (emptyCount < cellCount) {
            var rowTemplate = "";
            Object.keys(cells).forEach((key, index, keys)=> {
                if (cells[key][row]) {
                    rowTemplate += `[${cells[key][row].id}]`;
                } else {
                    rowTemplate += "\t";
                    emptyCount++;
                }
                if (index < cellCount - 1) {
                    rowTemplate += "\t";
                }
            });
            row++;
            if (emptyCount < cellCount) {
                emptyCount = 0;
                rowTemplate += "\n";
                template += rowTemplate;
            }
        }
        return template;
    }

    let template = "";
    template += printHeaders(game.freeCells);
    template += " \t";
    template += printHeaders(game.homeCells);
    template += "\n";
    template += printCells(Object.assign({}, game.freeCells, game.homeCells));
    template += "\n";
    template += printHeaders(game.columns);
    template += "\n";
    template += printCells(game.columns);
    return template;
}
var GameActions = {
    validateMove,
    attemptMove,
    print
};
module.exports = GameActions;