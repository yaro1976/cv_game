"use strict";

var Gameboard,
    Game,
    window;

window.addEventListener('load', function () {
    var width = 600,
        height = 800;

    // var gameboard = new Gameboard(480, 640);
    var gameboard = new Gameboard(width, height);
    // console.log(gameboard);
    // var g = new Game(gameboard, 480, 640);
    var g = new Game(gameboard, width, height);
    // console.log(g);
    // g.createGameZone();

    g.init();
    // console.log(g.enemyDirection());

    var start = null;

    var step = function (timestamp) {
        if (!start) {
            start = timestamp;
        }
        var progress = timestamp - start;

        if (progress < 2000) {
            window.requestAnimationFrame(step);
        } else {
            console.log("reset");
            start = null;
            g.enemyDirection();
            console.log(g.enemyDirection());
            window.requestAnimationFrame(step);
        }
    };
    var startFunct = function () {
        window.requestAnimationFrame(step);
    };
    startFunct();
});