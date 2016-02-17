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
function getCellType(cellId) {
    return cellId.substring(0, 2);
}
const CellActions = {
    isEmpty,
    getCard,
    getTopCard,
    getCellType
};

module.exports = CellActions;