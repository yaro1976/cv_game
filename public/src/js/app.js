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

    // Play the party
    // party.start();

    var vm,
        start,

        start = null;

    var play = function (timestamp) {
        // Main step        
        if (!start) {
            start = timestamp;
        }
        // Check keyboard
        party.checkDirection();
        // Show Planets and generate it
        party.generatePlanets();
        // Show and generate Ennemies
        party.generateEnemy();
        // Move ennemies ship
        party.enemyDirection();
        // Draw all active elements
        party.draw();

        if (!party.gameWin && !party.lost) {
            party.animation.main = window.requestAnimationFrame(play);
        }
        if (party.gameWin || party.lost) {
            window.cancelAnimationFrame(party.animation.main);
            party.ended();
            console.log("app cycle", party.tabElement)
            console.log(party.lost)

            // Verify, if party is ended
            if (party.gameWin || party.lost) {
                party.ended();
            }

            if (party.gameWin) {
                // User win the game
            }
            if (party.lost) {
                // User lost the game
            }
        }
    };

    this.animation.main = window.requestAnimationFrame(play);
});