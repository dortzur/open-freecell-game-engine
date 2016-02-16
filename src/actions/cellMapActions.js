function getTopCard(cellMap, cellId) {
    const cell = cellMap[cellId];
    return cell[cell.length - 1];
}
const CellMapActions = {
    getTopCard
};

module.exports = CellMapActions;