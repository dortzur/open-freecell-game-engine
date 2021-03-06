const CellActions = require('./cellActions');

function calcAvailableMoves(game) {
    const isEmptyColumnTarget = !!arguments[1];
    var emptyColumnCount = CellActions.emptyCellCount(game.columns);
    if (isEmptyColumnTarget && emptyColumnCount > 0) {
        emptyColumnCount--;
    }
    return (1 + CellActions.emptyCellCount(game.freeCells)) * Math.pow(2, emptyColumnCount);
}

var AnalysisActions = {
    calcAvailableMoves
};
module.exports = AnalysisActions;