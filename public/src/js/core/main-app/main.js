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

    // spaceItems number for user ship 
    this.userShip = "red";

    // Save key press status ( up, down, right, left, space)
    this.keyStatus = {
        "up": false,
        "down": false,
        "right": false,
        "left": false,
        "space": false
    };

    // List of the spaceItems
    this.spaceItems = {
        "ships": { // All Ships
            "id": "ships",
            "url": "dist/img/ships.png",
            "shipList": ["blue", "red", "orange", "green", "pink", "small", "spaceMan", "big", "bigBlueShip", "bigOrangeShip"],
            "spaceShips": {
                "blue": { // Gros vaisseau ligne 1
                    "srcX": 15,
                    "srcY": 0,
                    "srcWidth": 64,
                    "srcHeight": 53
                },
                "red": { // Vaisseau rouge ligne 2
                    "srcX": 26,
                    "srcY": 57,
                    "srcWidth": 45,
                    "srcHeight": 31
                },
                "orange": { // Vaisseau orange ligne 3
                    "srcX": 24,
                    "srcY": 88,
                    "srcWidth": 48,
                    "srcHeight": 45
                },
                "green": { // Vaisseau vert ligne 4
                    "srcX": 16,
                    "srcY": 131,
                    "srcWidth": 64,
                    "srcHeight": 49
                },
                "pink": { // Vaisseau rose ligne 5
                    "srcX": 24,
                    "srcY": 181,
                    "srcWidth": 48,
                    "srcHeight": 35
                },
                "small": { // Pieuvre petite ligne 6
                    "srcX": 31,
                    "srcY": 218,
                    "srcWidth": 32,
                    "srcHeight": 26
                },
                "spaceMan": { // Spacionnaute ligne 7
                    "srcX": 37,
                    "srcY": 248,
                    "srcWidth": 27,
                    "srcHeight": 30
                },
                "big": { // Pieuvre grande ligne 8
                    "srcX": 19,
                    "srcY": 284,
                    "srcHidth": 59,
                    "srcHeight": 52
                },
                "bigBlueShip": { // Grand vaisseau ligne 9
                    "srcX": 3,
                    "srcY": 347,
                    "srcWidth": 93,
                    "srcHeight": 75
                },
                "bigOrangeShip": { // Grand vaisseau ligne 10
                    "srcX": 3,
                    "srcY": 428,
                    "srcWidth": 93,
                    "srcHeight": 74
                }
            },
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
            "backList": ["violet"],
            "backImage": {
                "violet": {
                    "srcX": 0,
                    "srcY": 0,
                    "srcWidth": 640,
                    "srcHeight": 480
                }
            }
        },
        "shoots": { // Shotting animation
            "img": "backImg",
            "id": "",
            "shootLists": [],
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
    w = this.spaceItems.background.backImage.violet.width;
    h = this.spaceItems.background.backImage.violet.height;

    // Set the backgound image
    backImg.src = this.spaceItems.background.url;

    // Position the image    
    this.addElement("backimage", this.spaceItems.background.backImage.violet, backImg, 0, 0, this.width, this.height);
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

            // Draw spaceItems
            this.draw();

            // Write the score to the screen
            this.showScore();
        }
    }
};

/*
 * Generate ennemy
 */
Game.prototype.generateEnemy = function () {
    var itemNum,
        index,
        name, img, objName, x, y, h, w,
        direcList, direc;

    // List of the possible actions
    // direcList = ["up", "down", "right", "left", "space"];
    direcList = ["down", "right", "left", "space"];

    // generate the ennemy number

    itemNum = this.random(this.spaceItems.ships.shipList.length - 1);

    index = this.checkGetElement(this.spaceItems.ships.shipList[itemNum]); // Check if the ship is already present        

    if (index !== -1) {
        // Ship exists        
        if (!this.tabElement[index].inlife) {
            // Ship exists but was killed
            this.tabElement[index].inlife = true;
            //Generate a new direction for the move
            direc = direcList[this.random(direcList.length)];
            // add the direction to the Element array
            this.tabElement[index].direction[direc] = true;

            // Move the element
            this.moveGamer(this.spaceItems.ships.shipList[itemNum], direc);

            // If the ship go over the max size of the canvas
            // We reset its y position, to place it 
            // To the upper side
            if (this.tabElement[index].y > this.height) {
                this.tabElement[index].y = -1;
            }
        }
        if (this.tabElement[index].inlife) {
            // Ship exists and it is not killed 
            //Generate a new direction for the move
            direc = direcList[this.random(direcList.length)];
            // add the direction to the Element array
            this.tabElement[index].direction[direc] = true;

            // Move the element
            this.moveGamer(this.spaceItems.ships.shipList[itemNum], direc);

            // If the ship go over the max size of the canvas
            // We reset its y position, to place it 
            // To the upper side
            if (this.tabElement[index].y > this.height) {
                this.tabElement[index].y = -1;
            }
        }
    } else {
        // Ship doesn't not exists
        // Define all acarateristics of the ship
        // It size, image, etc.
        name = this.spaceItems.ships.shipList[itemNum];
        img = new Image();
        img.src = this.spaceItems.ships.url;
        objName = this.spaceItems.ships.spaceShips[name];
        x = this.random(this.width);
        y = this.random(this.height / 5);
        h = this.spaceItems.ships.spaceShips[name].srcHeight;
        w = this.spaceItems.ships.spaceShips[name].srcWidth;

        // add it to the active Element array
        this.addElement(name, objName, img, x, y, w, h);
    }
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
        this.ctx.drawImage(this.tabElement[i].img, this.tabElement[i].item.srcX, this.tabElement[i].item.srcY, this.tabElement[i].item.srcWidth, this.tabElement[i].item.srcHeight, this.tabElement[i].x, this.tabElement[i].y, this.tabElement[i].w, this.tabElement[i].h);
    }

    // Add the score element
    this.showScore();
};

/*
 * Move the gamer ship
 * @param {String} name - name of the element to move
 * @param {String} movestatus - Check if the element moving
 */
Game.prototype.moveGamer = function (name, moveStatus) {
    var index,
        intervalID, // Save the Interval ID
        vm;

    // Retreive the index element
    index = this.checkGetElement(name);
    vm = this;

    if (name === "gamer") {
        intervalID = window.setInterval(function () {
            if (vm.keyStatus.up && moveStatus) {
                // Key up pressed
                if (vm.checkMove("gamer", "up") === true) { // If move is authorized
                    // Set new position, and draw spaceItems  
                    if (vm.getY("gamer") >= (vm.height * 3 / 4)) {
                        // if we do not go over 3/4 of the canvas, we can go up
                        vm.moveY("gamer", -1);
                    }
                };
            }

            if (vm.keyStatus.down && moveStatus) {
                // Key up pressed                    
                if (vm.checkMove("gamer", "down") === true) { // If move is authorized
                    // Set new position, and draw spaceItems 
                    vm.moveY("gamer", +1);
                };
            }

            if (vm.keyStatus.left && moveStatus) {
                // Key left pressed                    
                if (vm.checkMove("gamer", "left") === true) { // If move is authorized
                    // Set new position, and draw spaceItems     
                    vm.moveX("gamer", -1);
                };
            }

            if (vm.keyStatus.right && moveStatus) {
                // Key right pressed
                if (vm.checkMove("gamer", "right") === true) { // If move is authorized
                    // Set new position, and draw spaceItems
                    vm.moveX("gamer", +1);
                };
            }
        }, 50);
    } else {
        window.setInterval(function () {
            if (vm.tabElement[index].direction.up) {
                // Key up pressed
                if (vm.checkMove(name, "up") === true) { // If move is authorized
                    // Set new position, and draw spaceItems                
                    vm.moveY(name, -8);
                    vm.tabElement[index].direction.up = false;
                };
            }

            if (vm.tabElement[index].direction.down) {
                // Key up pressed                    
                if (vm.checkMove(name, "down") === true) { // If move is authorized
                    // Set new position, and draw spaceItems                
                    vm.moveY(name, 8);
                    vm.tabElement[index].direction.down = false;
                };
            }

            if (vm.tabElement[index].direction.left) {
                // Key left pressed                    
                if (vm.checkMove(name, "left") === true) { // If move is authorized
                    // Set new position, and draw spaceItems                
                    vm.moveY(name, -8);
                    vm.tabElement[index].direction.left = false;
                };
            }

            if (vm.tabElement[index].direction.right) {
                // Key right pressed
                if (vm.checkMove(name, "right") === true) { // If move is authorized
                    // Set new position, and draw spaceItems                
                    vm.moveY(name, 8);
                    vm.tabElement[index].direction.right = false;
                };
            }
        }, 500);
    }
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
                    intervalID = vm.moveGamer("gamer", moveOn);
                }
                break;
            case 38:
                // Up key is pressed
                if (!moveOn) {
                    moveOn = true;
                    vm.keyStatus.up = true;
                    intervalID = vm.moveGamer("gamer", moveOn);
                }
                break;
            case 39:
                // Right key is pressed
                if (!moveOn) {
                    moveOn = true;
                    vm.keyStatus.right = true;
                    intervalID = vm.moveGamer("gamer", moveOn);
                }
                break;
            case 40:
                // Down key is pressed
                if (!moveOn) {
                    moveOn = true;
                    vm.keyStatus.down = true;
                    intervalID = vm.moveGamer("gamer", moveOn);
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
        dx,
        dy,
        dh,
        dw;

    // Create the gamer Space Ship element

    // Select the object zone
    dx = this.spaceItems.ships.spaceShips[this.userShip].srcX;
    dy = this.spaceItems.ships.spaceShips[this.userShip].srcY;
    dh = this.spaceItems.ships.spaceShips[this.userShip].srcHeight;
    dw = this.spaceItems.ships.spaceShips[this.userShip].srcWidth;

    // Select the image
    img = new Image();
    img.src = this.spaceItems.ships.url;

    // Add the spaceship onto the table    
    this.addElement("gamer", this.spaceItems.ships.spaceShips[this.userShip], img, gamerX, gamerY, dw, dh);

};