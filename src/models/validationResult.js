"use strict";

function ValidationResult(isSuccess, illegalMove, approvedStackSize) {
    if (!!illegalMove) {
        approvedStackSize = 0;
    } else {
        approvedStackSize = approvedStackSize || 1;
    }
    return {
        success: isSuccess,
        illegalMove: illegalMove,
        approvedStackSize: approvedStackSize
    }
}
module.exports = ValidationResult;