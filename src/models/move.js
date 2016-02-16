"use strict";

function MoveResult() {
    return{
        success:true,
        illegalReason:{},
        autoMovesAvailable:[]
    }
}
module.exports = MoveResult;