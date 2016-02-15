'use strict';
function Position(cell, index, cellSize, card) {
    cell = cell || "";
    index = index || 0;
    cellSize = cellSize || 1;
    card = card || null;

    return {
        cell,
        index,
        cellSize,
        card,
        get stackSize() {
            return this.cellSize - this.index;
        }
    }

}


module.exports = Position;