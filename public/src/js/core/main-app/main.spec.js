/* global Game, chai */
'use strict';

var expect = chai.expect;

describe("#main function", function () {
    describe('Initialization of the gamezone', function () {
        xit('Should create a game object', function () {            
            var g = new Game();            
            expect(g.spaceItems).to.exist;
        });
    });
    describe('Initialization part', function () {
        xit('should create a canvas element', function () {
            var g = new Game();
            g.createGameZone();
            expect(document.getElementById("gameZone")).to.exist;
        });
    });
});
