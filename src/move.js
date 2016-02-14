"use strict";
class MoveResult {
    constructor(isLegal, illegalReason) {
        this.isLegal = isLegal || false;
        illegalReason = "";
    }
}