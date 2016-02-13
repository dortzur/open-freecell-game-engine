'use strict';
class _Position {
    constructor(cell, index) {
        this.cell = cell || "";
        this.index = index || 0;
    }
}
const Position = {
    makePosition(cell, index){
        return new _Position(cell, index);
    }
};
module.exports = Position;