'use strict';
/* global document, Image, GameBoard */
/*jslint browser: true*/

// var game = (function (Game) {
// Main function

var Game = function (gameboard, width, height) {
    // this.ctx = false;
    this.width = width || 340;
    this.height = height || 500;
    // this.gameboard = new GameBoard();
    this.gameboard = gameboard;

    // List of the items
    this.items = {
        "ships": {
            "id": "ships",
            "coord": [{
                "posX": 15,
                "posY": 0,
                "width": 64,
                "height": 53
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
            "posX": 0,
            "posY": 0,
            "width": 640,
            "height": 480
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
 * random - Generate a random number
 * @param {Number} maxval - Max value generated
 * @return {Number} Value generated
 */
Game.prototype.random = function (maxval) {
    return Math.floor(Math.random() * maxval);
};
/*
 * setBackground - Position the background Image
 * @param {String} name - name of the Image
 */
Game.prototype.setBackground = function (name) {
    // var backImg = new Image(),
    var backImg,
        w,
        h;

    w = this.items.background.width;
    h = this.items.background.height;
    
    backImg = document.getElementById("back");
    this.ctx.drawImage(backImg, this.items.background.posX, this.items.background.posY, w, h, 0, 0, this.width, this.height);
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
    var idGame = document.getElementById("game");
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
 * clearScreen - Clear the canvas Zone
 * @return {void}
 */
Game.prototype.clearScreen = function () {
    // Clearing elements    
    this.ctx.clearRect(0, 0, this.width, this.height);
};

/*
 * init - Initialize the Game.
 *        Position the elements
 */
Game.prototype.init = function () {
    var i;
    var maxEnemy = 5;
    if (this.createGameZone()) {
        this.getContext();
        if (this.ctx) {
            // Generate the ennemy
            for (i = 0; i < maxEnemy; i += 1) {
                this.genObject();
            }
for (i = 15; i <= 250 ; i += 1) {
            // Clear the screen
            this.clearScreen();

            // Position the background element
            this.setBackground();

            // Write the score to the screen
            this.showScore();

            // Test            
            // this.draw(this.items.ships,0, 15, 15, 50 ,50);
            // for (i = 15; i <= 250 ; i += 1) {
                this.draw(this.items.ships,0, i, 15, 50 ,50);               

            }
        }
    }
};

/*
 * genObject - generate Ennemy
 * 
 */
Game.prototype.genObject = function () {
    //
    var x, y, item;

    item = this.items.ships.coord[this.random(this.items.ships.coord.length)];
    x = this.random(this.width);
    y = this.random(this.height / 3);
    this.gameboard.addElement(item, x, y, item.width, item.height);
};

/*
 * showScore - Print the score to the context
 * @return {void}
 */
Game.prototype.showScore = function () {
    // Add score
    this.ctx.font = '48px serif';
    this.ctx.fillStyle = "rgba(236, 240, 241,1.0)";
    this.ctx.fillText(this.gameboard.score, (this.width - 50), 50);
}

/*
 * Draw - Draw all elements on the canvas
 * @param {String} el - element to draw
 * @param {Number} id - Index of the element
 * @return {void}
 */
Game.prototype.draw = function (el, id, dx, dy, dw, dh) {
    // TODO Draw an item to the context
    var x,
        y,
        w,
        h;
var img = document.getElementById(el.id);
this.ctx.drawImage(img, el.coord[id].posX, el.coord[id].posY, el.coord[id].width, el.coord[id].height, dx, dy, dw, dh);
    // this.ctx.drawImage(el, el.x, y);

};

/*
 * checkDirection - Read keyboard
 */
Game.prototype.checkDirection = function () {
    window.onkeydown = function (event) {
        var code = event.keyCode;
        switch (code) {
            case 37:
                //*instructions*
                alert('gauche');
                break;
            case 38:
                //instructions
                alert('haut');
                break;
            case 39:
                //instructions
                alert('droite');
                break;
            case 40:
                //instructions
                alert('bas');
                break;
        }

    };
};
//     return new Game();
// })(Game || {});