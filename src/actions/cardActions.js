"use strict";

function isCard(card) {
    return card && card.id && card.notation;
}


const CardActions = {
    isCard
};
module.exports = CardActions;