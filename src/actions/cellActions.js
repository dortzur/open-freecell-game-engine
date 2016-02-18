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
const CellActions = {
    isEmpty,
    getCard,
    getTopCard,
    getCellType,
    getTopStack,
};

module.exports = CellActions;