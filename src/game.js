const Deck = require("./deck");
function newGame(gameNumber) {
    var deck = Deck.makeDeck();
    deck = Deck.shuffle(deck, gameNumber);
    var game = [[], [], [], [], [], [], [], []];
    for (var i = 0; i < deck.length; i++) {
        game[i % 8].push(deck[i]);
    }
    return game;
}

const Game = {
    newGame
};

module.exports = Game;