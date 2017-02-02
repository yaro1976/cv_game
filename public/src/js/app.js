/*
 *   Main app file.
 *   Start and stop the game
 */

"use strict";
var document;

var Gameboard,
    Game,
    window;

var start = null;

window.addEventListener('load', function () {
    // Get Html elements


    var btnPlay = document.getElementById("play");    
    var intro = document.getElementById("intro");
    var gameOver = document.getElementById("gameover");
    var win = document.getElementById("win");

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
        containerWidth = container.offsetWidth - 60;
        containerHeight = container.offsetHeight - 60;

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

        // Initialize Game
        party = new Game(width, height);
        party.init(width / 2, height - 100);
        var gamezone = document.getElementById("gameZone");

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

            if (party.gameWin) {                
                // User win the game                
                // Hide the canvas
                gamezone.classList.add("hide");
                // Show the message
                win.classList.remove("hide");
                win.classList.add("show");

                party.ended();
                return;
            }
            if (party.lost) {
                // User lost the game                                
                // Hide the canvas
                gamezone.classList.add("hide");
                // Show the message
                gameOver.classList.remove("hide");
                gameOver.classList.add("show");
                party.ended();
                return;
            }
            // }
        };
        party.animation.main = window.requestAnimationFrame(play);
    };

    btnPlay.addEventListener("click", function () {
        intro.classList.remove("show");
        intro.classList.add("hide");
        playGame();
    });    
});