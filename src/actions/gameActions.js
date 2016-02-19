'use strict';

const illegalMoves = require("../models/notation").illegalMoves;
const ValidationResult = require('../models/validationResult');
const CellActions = require('./cellActions');
const ValidationActions = require('./validationActions');
const ValidationMap = require('../models/validationMap');
const MoveResult = require('../models/moveResult');
//
//function findCard(game, cardId) {
//
//    var position = _findCardInCells(game.freeCells, cardId);
//    if (position) {
//        return position;
//    }
//
//    position = _findCardInCells(game.columns, cardId);
//    if (position) {
//        return position;
//    }
//    position = _findCardInCells(game.homeCells, cardId);
//    if (position) {
//        return position;
//    }
//
//}
//function _findCardInCells(cellArray, cardId) {
//    //home cells or columns
//    const position = Position();
//    if (Array.isArray(cellArray[0])) {
//        cellArray.findIndex(function (cells, cellIndex) {
//            const cardIndex = cells.findIndex(function (card) {
//                return card.id == cardId;
//            });
//            if (cardIndex > -1) {
//                if (cellArray.length == 8) {
//                    position.cell = Notation.columnRank[cellIndex];
//                    position.cellSize = cellArray[cellIndex].length;
//                } else {
//                    position.cell = Notation.homeCellRank[cellIndex];
//                    position.cellSize = 1
//                }
//                position.card = cellArray[cellIndex][cardIndex];
//                position.index = cardIndex;
//                return true;
//            }
//            return false;
//        });
//        if (position.cell) {
//            return position;
//        }
//    } else {
//        const cellIndex = cellArray.findIndex(function (card) {
//            return card.id == cardId;
//        });
//        if (cellIndex > -1) {
//            position.cell = Notation.freeCellRank(cellIndex);
//            position.index = 0;
//            position.cellSize = 1;
//            position.card = cellArray[cellIndex];
//            return position;
//        }
//    }
//
//}


function emptyCellCount(cells) {
    return Object.keys(cells).reduce(function (prev, currCell) {
        const isEmpty = CellActions.isEmpty(cells[currCell]);
        if (isEmpty) {
            return ++prev
        }
        return prev;
    }, 0)
}
function calcAvailableMoves(freeCells, columns, isEmptyColumnTarget) {
    var emptyColumnCount = emptyCellCount(columns);
    if (isEmptyColumnTarget && emptyColumnCount > 0) {
        emptyColumnCount--;
    }
    return (1 + emptyCellCount(freeCells)) * Math.pow(2, emptyColumnCount);
}


function getMoveId(movedCellId, targetCellId) {
    const movedCellType = CellActions.getCellType(movedCellId);
    const targetCellType = CellActions.getCellType(targetCellId);
    return movedCellType + targetCellType;
}

function performMove(game, movedCellId, targetCellId, approvedStackSize) {
    const _game = Object.assign({}, game);
    const movedCell = _game.gameMap[movedCellId];
    const targetCell = _game.gameMap[targetCellId];
    const moveId = getMoveId(movedCellId, targetCellId);

    if (moveId == "COCO") {
        for (var i = 0; i < approvedStackSize; i++) {
            targetCell.push(movedCell.pop());
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
    function printCell(cell) {
        if (cell.length == 0) {
            return "[Empty]";
        }
        if (cell.length == 1) {
            return `[${cell[0].id}]`
        }
        var template = "[";
        cell.forEach((card, index, cell)=> {
            template += `${card.id}`;
            if (index < cell.length - 1) {
                template += "\n";
            }
        });
        return template;
    }

    function printCells(cellMap) {
        let template = "";

        Object.keys(cellMap).forEach((key, index,keys)=> {
            template += `${printCell(cellMap[key])}`;
            if (index < keys.length - 1) {
                template += "\t";
            }
        });
        return template;
    }

    function printHeaders(cellMap) {
        var template = "";
        Object.keys(cellMap).forEach((key, index,keys)=> {
            template += ` ${key}`;
            if (index < keys.length - 1) {
                template += "\t";
            }
        });
        return template;
    }

    let template = "";
    template += printHeaders(game.freeCells);
    template += " \t";
    template += printHeaders(game.homeCells);
    template += "\n";
    template += printCells(game.freeCells);
    template += "\t";
    template += printCells(game.homeCells);
    return template;
}
const GameActions = {
    calcAvailableMoves,
    emptyCellCount,
    validateMove,
    attemptMove,
    toString: print
};
module.exports = GameActions;