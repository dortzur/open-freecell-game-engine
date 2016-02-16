const srand = require("./utils/srand");
const _ = require('./utils/lodash.custom');
const Notation = require("./models/notation");
const Card = require("./models/card");
const Deck = require("./models/deck");
const Game = require("./models/game");
const Position = require("./models/position");
const Actions = require("./actions/actions");
const ValidationActions = require("./actions/validationActions");
const ValidationResult = require("./models/validationResult");


_.pipe = _.flow;
_.compose = _.flowRight;
const Utils = {
    srand,
    _
};


module.exports = {
    Actions,
    ValidationActions,
    Card,
    Deck,
    Game,
    Notation,
    Position,
    Utils,
    ValidationResult
};