'use strict';
class _Position {
    constructor(cell, index, cellSize, card) {
        this.cell = cell || "";
        this.index = index || 0;
        this.cellSize = cellSize || 0;
        this.card = card || null;
    }
}
const Position = {
    makePosition(cell, index){
        return new _Position(cell, index);
    }
};
module.exports = Position;