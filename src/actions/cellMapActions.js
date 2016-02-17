const CellActions = require("./cellActions");
function getTopCard(cellMap, cellId) {
    const cell = cellMap[cellId];
    return cell[cell.length - 1];
}

function getCard(cellMap, cardId) {
    return Object.keys(cellMap).reduce(function (result, cellId) {
        //card already found
        if (result) {
            return result
        }
        return CellActions.getCard(cellMap[cellId], cardId);
    }, undefined);
}

const CellMapActions = {
    getTopCard,
    getCard
};

module.exports = CellMapActions;