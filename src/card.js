"use strict";
const Notation = require("./notation");

class _Card {
    constructor(cardNotation) {
        this.notation = this.id = cardNotation;
        this.value = this.id[0];
        this.suit = this.id[1];
        this.rank = Notation.cardRank.indexOf(this.value);
        if (this.suit == "D" || this.suit == "H") {
            this.color = Notation.notationMap.red;
        } else {
            this.color = Notation.notationMap.black;
        }
        this.colorRank = Notation.colorRank.indexOf(this.color);
    }
}

const Card = {
    makeCard(cardNotation){
        return new _Card(cardNotation);
    }
};
module.exports = Card;