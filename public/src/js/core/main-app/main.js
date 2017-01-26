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
            "img": "dist/img/ship.png",
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
        "background": [{
            "img": "dist/img/background/1.png",
            "posX": 0,
            "posY": 0,
            "width": 640,
            "height": 480
        }, {
            "img": "dist/img/background/2.png",
            "posX": 0,
            "posY": 0,
            "width": 640,
            "height": 480
        }, {
            "img": "dist/img/background/3.png",
            "posX": 0,
            "posY": 0,
            "width": 640,
            "height": 480
        }, {
            "img": "dist/img/background/4.png",
            "posX": 0,
            "posY": 0,
            "width": 640,
            "height": 480
        }, {
            "img": "dist/img/background/5.png",
            "posX": 0,
            "posY": 0,
            "width": 640,
            "height": 480
        }],
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
    return Math.floor(Math.random() * (maxval - 1));
};
/*
 * setBackground - Position the background Image
 * @param {String} name - name of the Image
 */
Game.prototype.setBackground = function (name) {
    // var backImg = new Image(),
    var w,
        h;

    this.backImg = new Image();
    this.backImg.src = this.items.background[name].img;

    console.log(this.backImg);

    w = this.items.background[name].width;
    h = this.items.background[name].height;

    // this.ctx.drawImage(this.backImg, this.items.background[name].posX, this.items.background[name].posY, w, h, 0, 0, this.width, this.height);
    var im = document.getElementById("back");
    this.ctx.drawImage(im, this.items.background[name].posX, this.items.background[name].posY, w, h, 0, 0, this.width, this.height);
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
 * init - Initialize the Game.
 *        Position the elements
 */
Game.prototype.init = function () {
    var i;
    var maxEnemy = 5;
    if (this.createGameZone()) {
        this.getContext();
        console.log(this.ctx);
        if (this.ctx) {

            // Generate the ennemy
            for (i = 0; i < maxEnemy; i += 1) {
                this.genObject();
            }
            // this.draw();

            // Select a background
            this.setBackground(this.random(this.items.background.length));
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

    item = this.items.ships.coord[Math.floor((Math.random() * this.items.ships.coord.length))];
    x = Math.floor(Math.random()) * this.width;
    y = Math.floor(Math.random() * (this.height / 3));
    this.gameboard.addElement(item, x, y, item.width, item.height);
};

/*
 * Draw - Draw all elements on the canvas
 */
Game.prototype.draw = function () {
    var i,
        x,
        y,
        w,
        h;

    // Clearing elements
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Add score
    this.ctx.font = '48px serif';
    this.ctx.fillText(this.gameboard.score, (this.width - 50), 50);

    for (i = 0; this.gameboard.tabElement[i]; i += 1) {
        x = this.gameboard.tabElement[i].x;
        y = this.gameboard.tabElement[i].y;
        h = this.gameboard.tabElement[i].h;
        w = this.gameboard.tabElement[i].w;

        /* 
            TODO: Create a daw Enemy element
        */
        this.ctx.drawImage(this.items.ships, x, y);
        // this.ctx.drawImage(this.items.ships[this.gameboard.tabElement[i].name], x, y);
    }
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
