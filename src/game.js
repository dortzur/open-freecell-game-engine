const Deck = require("./deck");
const Notation = require('./notation');
function createBoard(gameNumber) {
    var deck = Deck.makeDeck();
    deck = Deck.shuffle(deck, gameNumber);
    var board = [[], [], [], [], [], [], [], []];
    for (var i = 0; i < deck.length; i++) {
        board[i % 8].push(deck[i]);
    }
    return board;
}
function findCard(card, game) {
    if (game.freeCells.include(card)) {
        return Notation.freeCellRank(game.freeCells.indexOf(card));
    }
    var column = game.board.reduce(function (prev, curr, index) {
        if (curr.include(card)) {
            return Notation.columnRank(curr.indexOf(card));
        } else {
            return prev;
        }
    }, "");
    if (column) {
        return column;
    }

}
function newGame(gameNumber) {
    return {
        homeCells: [[], [], [], []],
        board: createBoard(gameNumber),
        freeCells: ["", "", "", ""]
    };
}

const Game = {
    newGame
};

module.exports = Game;