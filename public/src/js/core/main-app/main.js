'use strict';
var SpaceElement;

var Game = function (width, height) {
    // this.ctx = false;
    this.width = width || 340;
    this.height = height || 500;
    // this.gameboard = new GameBoard();
    // this.gameboard = gameboard;
    Gameboard.call(this, width, height);

    // List of the items
    this.items = {
        "ships": {
            "id": "ships",
            "coord": [{ // Gros vaisseau ligne 1
                "posX": 15,
                "posY": 0,
                "width": 64,
                "height": 53
            }, { // Vaisseau rouge ligne 2
                "posX": 26,
                "posY": 57,
                "width": 45,
                "height": 31
            }, { // Vaisseau orange ligne 3
                "posX": 24,
                "posY": 88,
                "width": 48,
                "height": 45
            }, { // Vaisseau vert ligne 4
                "posX": 16,
                "posY": 131,
                "width": 64,
                "height": 49
            }, { // Vaisseau rose ligne 5
                "posX": 24,
                "posY": 181,
                "width": 48,
                "height": 35
            }, { // Pieuvre petite ligne 6
                "posX": 31,
                "posY": 218,
                "width": 32,
                "height": 26
            }, { // Spacionnaute ligne 7
                "posX": 37,
                "posY": 248,
                "width": 27,
                "height": 30
            }, { // Pieuvre grande ligne 8
                "posX": 19,
                "posY": 284,
                "width": 59,
                "height": 52
            }, { // Grand vaisseau ligne 9
                "posX": 3,
                "posY": 347,
                "width": 93,
                "height": 75
            }, { // Grand vaisseau ligne 10
                "posX": 3,
                "posY": 428,
                "width": 93,
                "height": 74
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

Game.prototype = Object.create(Gameboard.prototype);

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
 */
Game.prototype.setBackground = function () {
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
            // Clear the screen
            this.clearScreen();

            // Position the background element
            this.setBackground();

            // Write the score to the screen
            this.showScore();
        }
    }
};

Game.prototype.drawEnemy = function () {
    var newX,
        newY,
        objDirec;
    // Test


    // TODO si pas ennemy

    // TODO enemy existant
    objDirec = this.enemyDirection();
    newX = objDirec.newPosX;
    newY = objDirec.newPosY;
    for (var i = 0; i < this.items.ships.coord.length; i += 1) {
        this.draw(this.items.ships, i, 15, (15 + i * 60), 50, 50);
    }
    // this.draw(this.items.ships, 9, 15, 15, 50, 50);
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
    this.addElement(item, x, y, item.width, item.height);
};

/*
 * showScore - Print the score to the context
 * @return {void}
 */
Game.prototype.showScore = function () {
    // Add score
    this.ctx.font = '48px serif';
    this.ctx.fillStyle = "rgba(236, 240, 241,1.0)";
    this.ctx.fillText(this.score, (this.width - 50), 50);
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
 * Move the gamer ship
 * @param {String} Direction - direction where to move
 */
Game.prototype.moveGamer = function (direction) {
    var index;
    index = this.checkGetElement("gamer");
    switch (direction) {
        case "left":
            if (this.checkMove("gamer", "left") === true) { // If move is authorized
                // Set new position, and draw items
                // console.log(vm.gameboard.tabElement);
                this.drawGamer((vm.tabElement[index].x - 1), this.gameboard.tabElement[index].y);
            }
            break;
        case "right":
            break;
        case "up":
            break;
        case "down":
            break;
    }
};
/*
 * checkDirection - Read keyboard
 */
Game.prototype.checkDirection = function () {
    // Save the context
    var vm = this;

    var intervalID;
    window.onkeydown = function (event) {
        var code = event.keyCode;

        switch (code) {
            case 37:
                //*instructions*
                // intervalID = window.setInterval(function () {
                    console.log("vm=",vm);                    
                    wm1.moveGamer("left");
                // }, 100);

                alert('gauche');
                break;
            case 38:
                //instructions
                vm.checkMove("gamer", "up");
                alert('haut');
                break;
            case 39:
                //instructions
                vm.checkMove("gamer", "right");
                alert('droite');
                break;
            case 40:
                //instructions
                vm.checkMove("gamer", "down");
                alert('bas');
                break;
        }

    };
    window.onkeyup = function (event) {
        var code = event.keyCode;
        switch (code) {
            case 37:
                //*instructions*
                clearInterval(intervalID);

                // alert('gauche');
                break;
            case 38:
                //instructions
                vm.gameboard.checkMove("gamer", "up");
                alert('haut');
                break;
            case 39:
                //instructions
                vm.gameboard.checkMove("gamer", "right");
                alert('droite');
                break;
            case 40:
                //instructions
                vm.gameboard.checkMove("gamer", "down");
                alert('bas');
                break;
        }
    };
};
/*
 * Generate the new direction for the enemy ship
 * @return {Object} New direction of the ship
 */
Game.prototype.enemyDirection = function () {
    var newPosX,
        newPosY;
    return {
        newPosX: 1 - this.random(2),
        newPosY: 1 - this.random(2)
    };
};

/*
 * Draw the gamer ship
 * @param {Number}  gamerX - X position of the gamer
 * @param {Number}  gamerY - Y position of the gamer
 */
Game.prototype.drawGamer = function (gamerX, gamerY) {
    var gamer;

    // Create the gamer Space Ship element
    // gamer = new SpaceElement("gamer", this.items.ships.coord[1].width, this.items.ships.coord[1].height);
    this.initialize("gamer", this.items.ships.coord[1].width, this.items.ships.coord[1].height);
    // Add the spaceship onto the table
    this.addElement("gamer", gamerX, gamerY, this.items.ships.coord[1].width, this.items.ships.coord[1].height);

    // draw the ship on the canvas

    this.draw(this.items.ships, 1, gamerX, gamerY, this.items.ships.coord[1].width, this.items.ships.coord[1].height);

    // console.log(gamer);
};