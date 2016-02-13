'use strict';
const notation = require("./notation");
var srand = require("./srand");

const _deckProto = [];

for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 4; j++) {
        _deckProto.push(notation.cardRank[i] + notation.suitRank[j]);
    }
}
function _shuffle(gameNumber) {
    var deck = _deckProto.concat([]);
    var rand = srand(gameNumber);
    for (var i = deck.length - 1; i > 0; i--) {
        var r = rand() % (i + 1);
        var card = deck[r];
        deck[r] = deck[i];
        deck[i] = card;
    }
    return deck.reverse();
}
var Deck = {
    makeDeck(gameNumber){
        if (!gameNumber) {
            return _deckProto.concat([]);
        }
        return _shuffle(gameNumber);
    }

};
module.exports = Deck;