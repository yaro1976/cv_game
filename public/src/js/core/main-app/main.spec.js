/* global Game, chai */
'use strict';

var expect = chai.expect;
var Gameboard;

describe("#main function", function () {
    describe('Initialization of the gamezone', function () {
        it('Should create a game object', function () {
            var gb = new Gameboard(640, 480);
            var g = new Game(gb, 640, 480);

            // g.init();
            console.log("items=",g.items);
            expect(g.items).to.exist;
        });
    });
    describe('Initialization part', function () {
        it('should create a canvas element', function () {
            var g = new Game();
            g.createGameZone();
            expect(document.getElementById("gameZone")).to.exist;
        });
    });
});
