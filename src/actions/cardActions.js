"use strict";

function isCard(card) {
    return card && card.id && card.notation;
}
function areCardsStackable(movedCard, targetCard) {
    if (!movedCard || !targetCard) {
        return false;
    }
    return !!(movedCard.color != targetCard.color && movedCard.rank - targetCard.rank == -1);
}

const CardActions = {
    isCard,
    areCardsStackable
};
module.exports = CardActions;