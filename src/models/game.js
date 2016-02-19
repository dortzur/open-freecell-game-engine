'use strict';
const Deck = require("./deck");


function createColumns(gameNumber) {
    var deck = Deck(gameNumber);
    var board = {CO1: [], CO2: [], CO3: [], CO4: [], CO5: [], CO6: [], CO7: [], CO8: []};
    const boardKeys = Object.keys(board);

    for (var i = 0; i < deck.length; i++) {
        board[boardKeys[i % 8]].push(deck[i]);
    }
    return board;
}

function Game(gameNumber) {
    var game = {
        homeCells: {HM1: [], HM2: [], HM3: [], HM4: []},
        columns: createColumns(gameNumber),
        freeCells: {FC1: [], FC2: [], FC3: [], FC4: []},
        get gameMap() {
            return Object.assign({},game.freeCells, game.columns, game.homeCells);
        }
    };
    return game;
}

module.exports = Game;