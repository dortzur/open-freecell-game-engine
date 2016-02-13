'use strict';
const Game = require("./index").Game;

function validateMove(game, cardId, target) {
    const freeCellCount = Game.freeCellCount(game);
    const position = Game.findCard(game, cardId);
}

const Actions = {

};
module.exports = Actions;