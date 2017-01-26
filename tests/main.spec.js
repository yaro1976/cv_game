/* global Game, chai */
'use strict';

var expect = chai.expect;

describe("#main function", function () {
    describe('Initialization part', function () {
        xit('should create a canvas element', function () {
            var g = new Game();
            g.createGameZone();
            expect(document.getElementById("gameZone")).to.exist;
        });
    });
});
