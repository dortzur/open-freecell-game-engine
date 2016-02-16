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
const CellActions = {
    isEmpty,
    getCard,
    getTopCard
};

module.exports = CellActions;