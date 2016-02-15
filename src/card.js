"use strict";
const Notation = require("./notation");

function Card(cardNotation) {
    const notation = cardNotation;
    const id = cardNotation;
    const value = id[0];
    const suit = id[1];
    const rank = Notation.cardRank.indexOf(value);
    let color;

    if (suit == Notation.suitMap.diamonds || suit == Notation.suitMap.hearts) {
        color = Notation.notationMap.red;
    } else {
        color = Notation.notationMap.black;
    }
    const colorRank = Notation.colorRank.indexOf(color);

    return {
        notation,
        id,
        value,
        suit,
        rank,
        color,
        colorRank
    }
}


module.exports = Card;