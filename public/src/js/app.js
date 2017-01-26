'use strict';
window.addEventListener('load', function () {
    var gameboard = new Gameboard(480, 640);
    // console.log(gameboard);
    var g = new Game(gameboard, 480, 640);
    // console.log(g);
    // g.createGameZone();

    g.init();
});
