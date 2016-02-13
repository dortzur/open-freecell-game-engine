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

function _findFreeCellCard(game, card) {
    var index = game.freeCells.indexOf(card);
    if (index > -1) {
        return Position.makePosition(Notation.freeCellRank[index]);
    }
    return null;
}
function _findBoardCard(game, card) {
    var column = game.board.filter((column) => {
        return column.indexOf(card) > -1;
    })[0];
    if (column) {
        let cell = Notation.columnRank[game.board.indexOf(column)];
        let cardIndex = column.indexOf(card);
        return Position.makePosition(cell, cardIndex);
    }
    return null;
}
function _findHomeCellCard(game, card) {
    var homeCell = game.homeCells.filter((homeCell) => {
        return homeCell.indexOf(card) > -1;
    })[0];
    if (homeCell) {
        let cell = Notation.homeCellRank[game.homeCells.indexOf(homeCell)];
        let cardIndex = homeCell.indexOf(card);
        return Position.makePosition(cell, cardIndex);
    }
    return null;
}

function findCard(game, card) {
    var position = _findFreeCellCard(game, card);
    if (position) {
        return position;
    }
    position = _findBoardCard(game, card);
    if (position) {
        return position;
    }
    return _findHomeCellCard(game, card);
}
function newGame(gameNumber) {
    return {
        moveHistory: [],
        homeCells: [[], [], [], []],
        board: _createBoard(gameNumber),
        freeCells: ["", "", "", ""]
    };
}

const Game = {
    newGame,
    findCard
};

module.exports = Game;