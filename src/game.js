const Deck = require("./deck");

function createBoard(gameNumber) {
    var deck = Deck.makeDeck();
    deck = Deck.shuffle(deck, gameNumber);
    var board = [[], [], [], [], [], [], [], []];
    for (var i = 0; i < deck.length; i++) {
        board[i % 8].push(deck[i]);
    }
    return board;
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