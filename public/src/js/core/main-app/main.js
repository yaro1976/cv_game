'use strict';
var SpaceElement;

/*
 * Create the main game Object
 * @constructor
 * @param {Number} width - Width of the canvas
 * @ param {Number} Height - height of the canvas
 */
var Game = function (width, height) {
    this.width = width || 600; // Set the main width
    this.height = height || 800; // Set the main height
    Gameboard.call(this, width, height); // Call the Gameboard constructor

    // Save key press status ( up, down, right, left, space)
    this.keyStatus = {
        "up": false,
        "down": false,
        "right": false,
        "left": false,
        "space": false
    };

    // List of the items
    this.items = {
        "ships": { // All Ships
            "id": "ships",
            "url": "dist/img/ships.png",
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
        "planet": { // All planets
            "img": "",
            "url": "",
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
        "background": { // background images
            "id": "backImg",
            "url": "dist/img/background/1.png",
            "coord": [{
                "posX": 0,
                "posY": 0,
                "width": 640,
                "height": 480
            }]
        },
        "shots": { // Shotting animation
            "img": "backImg",
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

// Define the parent Object
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
    // Create a new Image object    
    backImg = new Image();
    // Get the width and the height of the object
    w = this.items.background.coord[0].width;
    h = this.items.background.coord[0].height;

    // Set the backgound image
    backImg.src = this.items.background.url;

    // Position the image
    this.addElement("backImg", backImg, 0, 0, w, h, 0, 0, this.width, this.height);
};

/*
 * getContext - Store the drawing context of the canvas zone
 */
Game.prototype.getContext = function () {
    var canvas;
    // Get the canvas element
    canvas = document.getElementById("gameZone");

    // Get the canvas context
    if (canvas.getContext) {
        this.ctx = canvas.getContext('2d');
    }
};

/*
 * createGameZone - Create the game zone
 * @return {Boolean} - True: The zone is created | False : the zone is not created
 */
Game.prototype.createGameZone = function () {
    var newCanvas,
        idGame;

    // Create a canvas element
    newCanvas = document.createElement('canvas');
    newCanvas.setAttribute("width", this.width);
    newCanvas.setAttribute("height", this.height);
    newCanvas.setAttribute("id", "gameZone");

    // Add the canvas element to the web page
    idGame = document.getElementById("game");
    idGame.appendChild(newCanvas);

    // If the canvas is created
    if (document.getElementById("gameZone")) {
        return true; // Created
    }
    return false; // Error
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
Game.prototype.init = function (w, h) {
    var i,
        maxEnemy = 5;

    if (this.createGameZone()) {
        // Get the canvas context
        this.getContext();
        if (this.ctx) {
            // Clear the canvas
            this.clearScreen();

            // Position the background element
            this.setBackground();

            // The draw the gamers ship
            this.drawGamer(w, h);

            // Draw items
            this.draw();

            // Write the score to the screen
            this.showScore();
        }
    }
};

/*
 * Drw the enemy ship
 * @return {void}
 */
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
    var x,
        y,
        item;

    // Select the enemy ship
    item = this.items.ships.coord[this.random(this.items.ships.coord.length)];

    // Set X and Y position
    x = this.random(this.width);
    y = this.random(this.height / 3);

    // Add element item
    this.addElement(item, x, y, item.width, item.height);
};

/*
 * showScore - Print the score to the context
 * @return {void}
 */
Game.prototype.showScore = function () {
    var textPosX, // X position
        textPosY; // y position

    // Set position of the text element
    textPosX = this.width - 50;
    textPosY = 50;
    // Add score
    this.ctx.font = '48px serif';
    // Set color
    this.ctx.fillStyle = "rgba(236, 240, 241,1.0)";
    // Get the score item, and write it to the canvas
    this.ctx.fillText(this.score, textPosX, textPosY);
}

/*
 * Draw - Draw all elements on the canvas  
 * @return {void}
 */
Game.prototype.draw = function () {
    // TODO Draw an item to the context
    var x,
        y,
        w,
        h,
        i,
        img;

    // Clear the canvas element
    this.clearScreen();

    for (i = 0; this.tabElement[i]; i += 1) {
        // Select all element present
        // draw each element
        this.ctx.drawImage(this.tabElement[i].img, this.tabElement[i].dx, this.tabElement[i].dy, this.tabElement[i].dw, this.tabElement[i].dh, this.tabElement[i].x, this.tabElement[i].y, this.tabElement[i].w, this.tabElement[i].h);
    }

    // Add the score element
    this.showScore();
};

/*
 * Move the gamer ship
 * @param {String} movestatus - Check if the element moving
 */
Game.prototype.moveGamer = function (moveStatus) {
    var index,
        intervalID, // Save the Interval ID
        vm;

    // Retreive the index element
    index = this.checkGetElement("gamer");
    vm = this;

    intervalID = window.setInterval(function () {
        if (vm.keyStatus.up && moveStatus) {
            // Key up pressed
            if (vm.checkMove("gamer", "up") === true) { // If move is authorized
                // Set new position, and draw items                
                vm.drawGamer((vm.tabElement[index].x), vm.tabElement[index].y - 1);
            };
        }

        if (vm.keyStatus.down && moveStatus) {
            // Key up pressed                    
            if (vm.checkMove("gamer", "down") === true) { // If move is authorized
                // Set new position, and draw items                
                vm.drawGamer((vm.tabElement[index].x), vm.tabElement[index].y + 1);
            };
        }

        if (vm.keyStatus.left && moveStatus) {
            // Key left pressed                    
            if (vm.checkMove("gamer", "left") === true) { // If move is authorized
                // Set new position, and draw items                
                vm.drawGamer((vm.tabElement[index].x - 1), vm.tabElement[index].y);
            };
        }

        if (vm.keyStatus.right && moveStatus) {
            // Key right pressed
            if (vm.checkMove("gamer", "right") === true) { // If move is authorized
                // Set new position, and draw items                
                vm.drawGamer((vm.tabElement[index].x + 1), vm.tabElement[index].y);
            };
        }
    }, 1);
};
/*
 * checkDirection - Read keyboard and move the user ship
 */
Game.prototype.checkDirection = function () {
    // Save the context
    var vm = this;
    var moveOn = false;

    var intervalID;

    // If the key is pressed
    window.onkeydown = function (event) {
        var code = event.keyCode;

        switch (code) {
            case 37: // Left key is pressed
                if (!moveOn) {
                    moveOn = true;
                    vm.keyStatus.left = true;
                    intervalID = vm.moveGamer(moveOn);
                }
                break;
            case 38:
                // Up key is pressed
                if (!moveOn) {
                    moveOn = true;
                    vm.keyStatus.up = true;
                    intervalID = vm.moveGamer(moveOn);
                }
                break;
            case 39:
                // Right key is pressed
                if (!moveOn) {
                    moveOn = true;
                    vm.keyStatus.right = true;
                    intervalID = vm.moveGamer(moveOn);
                }
                break;
            case 40:
                // Down key is pressed
                if (!moveOn) {
                    moveOn = true;
                    vm.keyStatus.down = true;
                    intervalID = vm.moveGamer(moveOn);
                }
                break;
            default:
                console.log(code);
        }
    };

    // if the key is release
    window.onkeyup = function (event) {
        clearInterval(intervalID);
        moveOn = false;
        var code = event.keyCode;
        switch (code) {
            case 37: // Left key is released                
                vm.keyStatus.left = false;
                break;
            case 38: // Up key is released                
                vm.keyStatus.up = false;
                break;
            case 39: // Right key is released                     
                vm.keyStatus.right = false;
                break;
            case 40: // Down key is released                
                vm.keyStatus.down = false;
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
    var gamer,
        img,
        numShip,
        dx,
        dy,
        dh,
        dw;

    // Create the gamer Space Ship element
    // Define the ship element
    numShip = 1; // Ship element

    // Select the object zone
    dx = this.items.ships.coord[numShip].posX;
    dy = this.items.ships.coord[numShip].posY;
    dh = this.items.ships.coord[numShip].height;
    dw = this.items.ships.coord[numShip].width;

    // Select the image
    img = new Image();
    img.src = this.items.ships.url;

    // Add the spaceship onto the table    
    this.addElement("gamer", img, dx, dy, dw, dh, gamerX, gamerY, dw, dh);
};