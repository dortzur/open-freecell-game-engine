function isEmpty(cell) {
    return cell.length == 0;
}

function getCard(cell, cardId) {
    return cell.find((card)=> {
        return card.id == cardId
    })
}
const CellActions = {
    isEmpty,
    getCard
};

module.exports = CellActions;