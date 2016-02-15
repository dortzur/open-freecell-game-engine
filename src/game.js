'use strict';
const Deck = require("./deck");
const Notation = require('./notation');
const Position = require('./position');


function createBoard(gameNumber) {
    var deck = Deck(gameNumber);
    var board = {CO1: [], CO2: [], CO3: [], CO4: [], CO5: [], CO6: [], CO7: [], CO8: []};
    const boardKeys = Object.keys(board);

    for (var i = 0; i < deck.length; i++) {
        board[boardKeys[i % 8]].push(deck[i]);
    }
    return board;
}
function _findCardInCells(cellArray, cardId) {
    //home cells or board
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
function getTopCard(game, cellId) {
    const cellType = _getCellType(cellId);
    var card;
    var cell;
    switch (cellType) {
        case Notation.notationMap.freeCell:
            card = game.freeCells[Notation.freeCellRank[cellId]];
            break;
        case Notation.notationMap.column:
            cell = game.board[Notation.colorRank[cellId]];
            card = cell[cell.length - 1];
            break;
        case Notation.notationMap.homeCell:
            cell = game.homeCells[Notation.homeCellRank[cellId]];
            card = cell[cell.length - 1];
    }
    if (card && card.id) {
        return card;
    }
    return null;
}
function isEmptyCell(cell) {
    return cell.length == 0;
}
function emptyCellCount(cells) {
    return Object.keys(cells).reduce(function (prev, curr) {
        const isEmpty = isEmptyCell(cells[curr]);
        if (isEmpty) {
            return prev++
        }
        return prev;
    }, 0)
}

function findCard(game, cardId) {

    var position = _findCardInCells(game.freeCells, cardId);
    if (position) {
        return position;
    }

    position = _findCardInCells(game.board, cardId);
    if (position) {
        return position;
    }
    position = _findCardInCells(game.homeCells, cardId);
    if (position) {
        return position;
    }

}

function Game(gameNumber) {

    return {
        moveHistory: [],
        homeCells: {HM1: [], HM2: [], HM3: [], HM4: []},
        board: createBoard(gameNumber),
        freeCells: {FC1: [], FC2: [], FC3: [], FC4: []}
    };


}
Game.findCard = findCard;
Game.countEmptyCells = emptyCellCount;

module.exports = Game;