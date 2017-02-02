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

/*
* Call when game starts
*/
    var playGame = function () {
        var width = 600,
            height = 800,
            ratio,
            party,
            containerWidth,
            containerHeight,
            start;

        ratio = width / height;

        // Get the container initial size
        var container = document.getElementsByClassName("container")[0];
        containerWidth = container.offsetWidth;
        containerHeight = container.offsetHeight;

        console.log(container);

        if (containerWidth > 600) {
            width = 600;
            height = width / ratio;
        } else {
            width = containerWidth;
            height = width / ratio;
        }

        if (containerHeight > 800) {
            height = 800;
            width = height * ratio;
        } else {
            height = containerHeight;
            width = height * ratio;
        }
        console.log(containerWidth, containerHeight);
        console.log(width, height);

        // Initialize Game
        party = new Game(width, height);
        party.init(width / 2, height - 100);
    

        // Play the party   

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
                console.log("app cycle", party.tabElement);
                console.log(party.lost);

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
        party.animation.main = window.requestAnimationFrame(play);
    };
    
    playGame();
   
});