/*
*   Main app file.
*   Start and stop the game
*/

"use strict";

var Gameboard,
    Game,
    window;

var start = null;

window.addEventListener('load', function () {
    var width = 600,
        height = 800,
        party;

    // Initialize Game
    party = new Game(width, height);
    party.init(width / 2, height - 100);

    // Start the party
    party.start();

    // Verify, if party is ended
    if (party.gameWin || party.lost) {
        party.end();
    }

    if (party.gameWin) {
        // User win the game
    }
    if (party.lost) {
        // User lost the game
    }
});