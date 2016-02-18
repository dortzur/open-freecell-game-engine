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

var ValidationMap = {
    HMHM: VA.validateTopCardToEmptyCell,
    FCHM: VA.validateTopCardToHomeCell,
    COHM: VA.validateTopCardToHomeCell,

    FCFC: VA.validateTopCardToEmptyCell,
    HMFC: VA.validateTopCardToEmptyCell,
    COFC: VA.validateTopCardToEmptyCell,

    COCO: VA.validateColumnCellToColumnCell,
    FCCO: VA.validateTopCardToColumnCard,
    HMCO: VA.validateTopCardToColumnCard
};

module.exports = ValidationMap;