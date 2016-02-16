function isEmpty(cell) {
    return cell.length == 0;
}

function getCard(cell, cardId) {
    return cell.find((card)=> {
        return card.id == cardId
    })
}
function getTopCard(cells, cellId) {
    const cell = cells[cellId];
    return cell[cell.length - 1];
}
function validateMove(sourceCard, TargetCard) {

}
const CellActions = {
    isEmpty,
    getCard,
    getTopCard
};

module.exports = CellActions;