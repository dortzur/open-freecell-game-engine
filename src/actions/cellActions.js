"user strict";
const CardActions = require('./cardActions');

function isEmpty(cell) {
    return cell.length == 0;
}

function getTopCard(cell) {
    return cell[cell.length - 1];
}
function getTopStack(cell, stackSize) {
    var maxAvailableStack = cell.slice(cell.length - stackSize, cell.length);
    var topCard = maxAvailableStack.pop();
    var topStack = [topCard];
    var nextCard = maxAvailableStack.pop();
    var areCardsStackable = CardActions.areCardsStackable(topCard, nextCard);

    while (areCardsStackable) {
        topStack.push(nextCard);
        topCard = nextCard;
        nextCard = maxAvailableStack.pop();
        areCardsStackable = CardActions.areCardsStackable(topCard, nextCard);
    }
    return topStack;
}
function getCellType(cellId) {
    return cellId.substring(0, 2);
}
function emptyCellCount(cellMap) {
    return Object.keys(cellMap).reduce(function (prev, currCell) {
        const isEmpty = CellActions.isEmpty(cellMap[currCell]);
        if (isEmpty) {
            return ++prev
        }
        return prev;
    }, 0)
}

const CellActions = {
    isEmpty,
    getTopCard,
    getCellType,
    getTopStack,
    emptyCellCount
};

module.exports = CellActions;