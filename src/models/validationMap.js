/*
 * Validation map logic
 *
 * HM to HM -> top card; is target empty
 * FC to HM -> top card; same suit; ascending
 * CO to HM -> top card; same suit; ascending
 *
 * FC to FC -> top card; is target empty
 * HM to FC -> top card; is target empty
 * CO to FC -> top card; is target empty
 *
 * CO to CO -> calc max stack size; descending stack; column card move;
 * FC to CO -> top card; column card move;
 * HM to CO -> top card; column card move;
 *
 * */
const VA = require("../actions/validationActions");

function parameterMapper(validationFunction,game,movedCellId,targetCellId){

    return validationFunction();
}
var ValidationMap = {
    HMHM:VA.validateCardToEmptyCell,
    FCHM:VA.validateCardToHomeCell,
    COHM:VA.validateCardToHomeCell,
    FCFC:VA.validateCardToEmptyCell,
    HMFC:VA.validateCardToEmptyCell,
    COFC:VA.validateCardToEmptyCell,
    COCO:{},
    FCCO:{},
    HMCO:{}
};

module.exports = ValidationMap;