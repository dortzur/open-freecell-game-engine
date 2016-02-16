"use strict";

function ValidationResult(successStatus,reason) {
    return{
        success:successStatus,
        reason
    }
}
module.exports = ValidationResult;