'use strict';
const Game = require("./index").Game;
const Position = require("./index").Position;

function validateMove(game, cardId, targetCell) {
    const freeCellCount = Game.freeCellCount(game);
    const position = Game.findCard(game, cardId);

}
function attemptMove(game, cardId, targetCell) {
    const move = validateMove(game, cardId, targetCell);
    if(move.isLegal){

    }else{
        return move.illegal;
    }

}

const Actions = {};
module.exports = Actions;