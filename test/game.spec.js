import {expect} from "chai";
import {Game} from "../src";
describe('Game', () => {
    it('Creates a new game', () => {
        var game = Game.newGame(1);
        expect(game[0][0]).to.eq("JD")
    })
});