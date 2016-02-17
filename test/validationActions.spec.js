const expect = require('chai').expect;
const GameEngine = require('../src');
const ValidationActions = GameEngine.ValidationActions;
const Game = GameEngine.Game;
describe('ValidationActions', () => {
    it('creates random numbers for specified seed. MSRand compliant', () => {
        var game = Game(1);

    })
});