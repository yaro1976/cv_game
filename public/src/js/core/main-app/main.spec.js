/* global Game, chai */
'use strict';

var expect = chai.expect;

describe("#main function", function () {
    describe('Initialization of the gamezone', function () {
        it('Should create a game object', function () {            
            var g = new Game();            
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
