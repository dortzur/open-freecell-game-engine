'use strict';
const notation = require("./notation");
var srand = require("../utils/srand");

const _initialDeck = [];

for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 4; j++) {
        _initialDeck.push(notation.rank[i] + notation.suitRank[j]);
    }
}
var Deck = {
    makeDeck(){
        return _initialDeck.concat([]);
    },
    shuffle(deck, gameNumber){
        var newDeck = deck.concat([]);
        var rand = srand(gameNumber);
        for (var i = newDeck.length - 1; i > 0; i--) {
            var r = rand() % (i + 1);
            var card = newDeck[r];
            newDeck[r] = newDeck[i];
            newDeck[i] = card;
        }
        return newDeck.reverse();
    }
};
module.exports = Deck;