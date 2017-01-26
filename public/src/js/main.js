'use strict';
/* global document, Image, GameBoard */
/*jslint browser: true*/

// (function () {
// Main function

var Game = function () {
    this.ctx = false;
    this.width = 640;
    this.height = 340;
    this.gameboard = new GameBoard();

    // List of the items
    this.items = {
        "ships": {
            "img": "",
            "coord": [{
                "posX": 0,
                "posY": 0,
                "width": 0,
                "height": 0
            }, {
                "posX": 0,
                "posY": 0,
                "width": 0,
                "height": 0
            }, {
                "posX": 0,
                "posY": 0,
                "width": 0,
                "height": 0
            }]
        },
        "planet": {
            "img": "",
            "coord": [{
                "posX": 0,
                "posY": 0,
                "width": 0,
                "height": 0
            }, {
                "posX": 0,
                "posY": 0,
                "width": 0,
                "height": 0
            }, {
                "posX": 0,
                "posY": 0,
                "width": 0,
                "height": 0
            }]
        },
        "background": {
            "img": "",
            "coord": [{
                "posX": 0,
                "posY": 0,
                "width": 0,
                "height": 0
            }, {
                "posX": 0,
                "posY": 0,
                "width": 0,
                "height": 0
            }, {
                "posX": 0,
                "posY": 0,
                "width": 0,
                "height": 0
            }]
        },
        "shots": {
            "img": "",
            "coord": [{
                "posX": 0,
                "posY": 0,
                "width": 0,
                "height": 0
            }, {
                "posX": 0,
                "posY": 0,
                "width": 0,
                "height": 0
            }, {
                "posX": 0,
                "posY": 0,
                "width": 0,
                "height": 0
            }]
        }
    };

};

/*
 * setBackground - Position the background Image
 * @param {String} name - name of the Image
 */
Game.prototype.setBackground = function (name) {
    var backImg = new Image();
    backImg.src = name;
};



/*
 * getContext - Store the drawing context of the canvas zone
 */
Game.prototype.getContext = function () {
    var canvas = document.getElementById("gameZone");

    if (canvas.getContext) {
        this.ctx = canvas.getContext('2d');
    }
};

/*
 * createGameZone - Create the game zone
 * @return {Boolean} - True: The zone is created | False : the zone is not created
 */
Game.prototype.createGameZone = function () {
    var newCanvas = document.createElement('canvas');
    var idGame = document.getElementById("Game");
    newCanvas.setAttribute("width", this.width);
    newCanvas.setAttribute("height", this.height);
    newCanvas.setAttribute("id", "gameZone");

    idGame.appendChild(newCanvas);

    if (document.getElementById("gameZone")) {
        return true;
    }
    return false;
};

/*
 * init - Initialize the Game.
 *        Position the elements
 */
Game.prototype.init = function () {
    var i;
    var maxEnemy = 5;
    this.createGameZone();
    this.getContext();

    // Generate the ennemy
    for (i = 0; i < maxEnemy; i += 1) {
        this.genObject();
    }
};

/*
 * genObject - generate Ennemy
 * 
 */
Game.prototype.genObject = function () {
    //
    var x, y, item;

    item = this.items.ships.coord[Math.floor((Math.random() * this.items.ships.coord.length))];
    x = Math.floor(Math.random()) * this.width;
    y = Math.floor(Math.random() * (this.height / 3));
    this.gameboard.addElement(item, x, y, item.width, item.height);
};
// })();
