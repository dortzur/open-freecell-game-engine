'use strict';
const Deck = require("./deck");
const Notation = require('./notation');
const Position = require('./position');


function _createBoard(gameNumber) {
    var deck = Deck.makeDeck(gameNumber);
    var board = [[], [], [], [], [], [], [], []];
    for (var i = 0; i < deck.length; i++) {
        board[i % 8].push(deck[i]);
    }
    return board;
}
function _findCardInCells(cellArray, cardId) {
    //home cells or board
    const position = Position.makePosition();
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

function newGame(gameNumber) {
    return {
        moveHistory: [],
        homeCells: [[], [], [], []],
        board: _createBoard(gameNumber),
        freeCells: [{}, {}, {}, {}]
    };
}
function freeCellCount(game) {
    return game.freeCells.filter((card)=> {
        return !card.id;
    }).length;
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

const Game = {
    newGame,
    findCard,
    freeCellCount
};

module.exports = Game;