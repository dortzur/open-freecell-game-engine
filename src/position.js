'use strict';
function Position(cell, index, cellSize, card) {
    cell = cell || "";
    index = index || 0;
    cellSize = cellSize || 1;
    card = card || null;

    var position = {
        cell,
        index,
        cellSize,
        card,
        get stackSize() {
            return position.cellSize - position.index;
        }
    };
    return position;
}


module.exports = Position;