'use strict';
const notation = require("./notation");
const srand = require("./srand");
const Card = require("./card");

const _deckProto = [];

for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 4; j++) {
        const card = Card.makeCard(notation.cardRank[i] + notation.suitRank[j]);
        _deckProto.push(card);
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