"use strict";

function ValidationResult(isSuccess,illegalMove) {
    return{
        success:isSuccess,
        illegalMove:illegalMove
    }
}
module.exports = ValidationResult;