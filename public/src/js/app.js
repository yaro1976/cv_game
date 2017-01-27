"use strict";

var Gameboard,
    Game,
    window;

var start = null;

window.addEventListener('load', function () {
    var width = 600,
        height = 800;


    // Initialize Game
    var gameboard = new Gameboard(width, height);
    var g = new Game(gameboard, width, height);

    g.init();

    // Generate Enemy ship
    g.drawEnemy();

    // Generate own ship
    g.drawGamer(width / 2, height - 100); // Set the initial position of the ship

    // Main step
    var step = function (timestamp) {
        if (!start) {
            start = timestamp;
        }
        var progress = timestamp - start;

        if (progress < 2000) {
            window.requestAnimationFrame(step);
        }
        if ((progress % 2) === 0 ) {
            start = null;
            g.enemyDirection();
            g.checkDirection();
            window.requestAnimationFrame(step);
        }
    };
    var startFunct = function () {
        window.requestAnimationFrame(step);
    };
    startFunct();
});
