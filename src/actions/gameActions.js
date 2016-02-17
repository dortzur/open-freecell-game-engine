'use strict';
const Game = require("./../index").Game;
const Position = require("./../index").Position;
const Notation = require('./../index').Notation;
const CellActions = require('./cellActions');


function _findCardInCells(cellArray, cardId) {
    //home cells or columns
    const position = Position();
    if (Array.isArray(cellArray[0])) {
        cellArray.findIndex(function (cells, cellIndex) {
            const cardIndex = cells.findIndex(function (card) {
                return card.id == cardId;
            });
            if (cardIndex > -1) {
                if (cellArray.length == 8) {
                    position.cell = Notation.columnRank[cellIndex];
                    position.cellSize = cellArray[cellIndex].length;
                } else {
                    position.cell = Notation.homeCellRank[cellIndex];
                    position.cellSize = 1
                }
                position.card = cellArray[cellIndex][cardIndex];
                position.index = cardIndex;
                return true;
            }
            return false;
        });
        if (position.cell) {
            return position;
        }
    } else {
        const cellIndex = cellArray.findIndex(function (card) {
            return card.id == cardId;
        });
        if (cellIndex > -1) {
            position.cell = Notation.freeCellRank(cellIndex);
            position.index = 0;
            position.cellSize = 1;
            position.card = cellArray[cellIndex];
            return position;
        }
    }

}
function _getCellType(cellId) {
    return cellId.substring(0, 2);
}



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


function findCard(game, cardId) {

    var position = _findCardInCells(game.freeCells, cardId);
    if (position) {
        return position;
    }

    position = _findCardInCells(game.columns, cardId);
    if (position) {
        return position;
    }
    position = _findCardInCells(game.homeCells, cardId);
    if (position) {
        return position;
    }

}
function validateMove(game, movedCellId, targetCellId) {
    const freeCellCount = Game.freeCellCount(game);
    const position = Game.findCard(game, cardId);

}
function attemptMove(game, movedCellId, targetCellId) {
    const move = validateMove(game, cardId, targetCell);
    if (move.isLegal) {

    } else {
        return move.illegal;
    }

}

const GameActions = {
    calcAvailableMoves,
    emptyCellCount,
};
module.exports = GameActions;