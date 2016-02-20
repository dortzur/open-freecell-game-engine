function isEmpty(cell) {
    return cell.length == 0;
}

function getCard(cell, cardId) {
    return cell.find((card)=> {
        return card.id == cardId
    })
}
function getTopCard(cell) {
    return cell[cell.length - 1];
}
function getTopStack(cell,stackSize) {
    return cell.slice(cell.length - stackSize,cell.length);
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
    getCard,
    getTopCard,
    getCellType,
    getTopStack,
    emptyCellCount
};

module.exports = CellActions;