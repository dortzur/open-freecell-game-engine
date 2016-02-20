const Game = require('../../src/models/game');
const GameActions = require('../../src/actions/gameActions');
function game1StackedCards() {
    var game = Game(1);
    game = GameActions.attemptMove(game, "CO6", "FC1").game;
    game = GameActions.attemptMove(game, "CO6", "FC2").game;
    game = GameActions.attemptMove(game, "CO6", "HM1").game;
    game = GameActions.attemptMove(game, "FC2", "HM1").game;
    game = GameActions.attemptMove(game, "CO6", "HM2").game;
    game = GameActions.attemptMove(game, "CO3", "FC2").game;
    game = GameActions.attemptMove(game, "CO3", "FC3").game;
    return  GameActions.attemptMove(game, "FC1", "CO3").game;
}
const GamePositions = {
    game1StackedCards,
};

module.exports = GamePositions;