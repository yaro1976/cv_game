'use strict';
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
});