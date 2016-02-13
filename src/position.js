'use strict';
class _Position {
    constructor(cell, index, cellSize, card) {
        this.cell = cell || "";
        this.index = index || 0;
        this.cellSize = cellSize || 1;
        this.card = card || null;
    }

    get stackSize() {
        return this.cellSize - this.index;
    }

}
const Position = {
    makePosition(cell, index, cellSize, card){
        return new _Position(cell, index, cellSize, card);
    }
};
module.exports = Position;