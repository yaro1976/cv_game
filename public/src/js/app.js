"use strict";

var Gameboard,
    Game,
    window;

var start = null;

window.addEventListener('load', function () {
    var width = 600,
        height = 800;

    // Initialize Game    
    var g = new Game(width, height);
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

        if (progress < 2) {
            window.requestAnimationFrame(step);
        } else {
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
