'use strict';

const Notation = require("./notation");
const srand = require("../utils/srand");
const Card = require("./card");

function createDefaultDeck() {
    const deck = [];
    for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 4; j++) {
            const card = Card(Notation.cardRank[i] + Notation.suitRank[j]);
            deck.push(card);
        }
    }
    return deck;
}
function shuffle(gameNumber) {
    var deck = createDefaultDeck();
    var rand = srand(gameNumber);
    for (var i = deck.length - 1; i > 0; i--) {
        var r = rand() % (i + 1);
        var card = deck[r];
        deck[r] = deck[i];
        deck[i] = card;
    }
    return deck.reverse();
}


function Deck(gameNumber) {
    if (!gameNumber) {
        return createDefaultDeck();
    }
    return shuffle(gameNumber);
}


module.exports = Deck;