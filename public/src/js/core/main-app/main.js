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
    this.userShip = "orange";

    // Time beetwen new Ennemy ship spawn
    this.minSpawnTime = 2000;
    this.lastSpawnTime = false;

    // Time beetwen new planet spawn
    this.minPlanetSpawnTime = 4000;
    this.lastSpawnTimePlanet = false;

    // Rocket
    // Save Move actions of the rocket
    this.intervalIDRocket = false;


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
            // "url": "dist/img/ships.png",
            "url": "dist/img/space_items.png",
            "shipList": ["blue", "red", "orange", "blue", "red", "orange", "green", "pink", "smallOctopus", "spaceMan", "bigOctopus", "bigBlueShip"],
            "shipListInverted": ["blueInverted", "redInverted", "orangeInverted", "greenInverted", "pinkInverted", "smallOctopus", "spaceMan", "bigOctopus", "bigBlueShipInverted"],
            "spaceShips": {
                "blue": { // Gros vaisseau
                    "srcX": 5,
                    "srcY": 5,
                    "srcWidth": 62,
                    "srcHeight": 51,
                    "guns": [{ // Guns  Position
                        "gX": 17,
                        "gy": 0,
                        "gw": 8,
                        "gh": 0,
                    }, {
                        "gX": 39,
                        "gy": 0,
                        "gw": 8,
                        "gh": 0
                    }],
                    "nozel": [{ // Nozel Position
                        "nX": 14,
                        "nY": 51,
                        "nw": 7,
                        "nh": 0
                    }, { // Nozel Position
                        "nX": 42,
                        "nY": 51,
                        "nw": 7,
                        "nh": 0
                    }]
                },
                "blueInverted": { // Gros vaisseau
                    "srcX": 184,
                    "srcY": 5,
                    "srcWidth": 62,
                    "srcHeight": 51,
                    "guns": [{ // Guns  Position
                        "gX": 17,
                        "gy": 51,
                        "gw": 8,
                        "gh": 0,
                    }, {
                        "gX": 38,
                        "gy": 51,
                        "gw": 8,
                        "gh": 0
                    }],
                    "nozel": [{ // Nozel Position
                        "nX": 15,
                        "nY": 0,
                        "nw": 7,
                        "nh": 0
                    }, { // Nozel Position
                        "nX": 42,
                        "nY": 0,
                        "nw": 7,
                        "nh": 0
                    }]
                },
                "red": { // Vaisseau rouge
                    "srcX": 525,
                    "srcY": 5,
                    "srcWidth": 39,
                    "srcHeight": 34,
                    "guns": [{ // Guns  Position
                        "gX": 2,
                        "gy": 4,
                        "gw": 10,
                        "gh": 0,
                    }, {
                        "gX": 26,
                        "gy": 4,
                        "gw": 10,
                        "gh": 0
                    }],
                    "nozel": [{ // Nozel Position
                        "nX": 9,
                        "nY": 34,
                        "nw": 7,
                        "nh": 0
                    }, { // Nozel Position
                        "nX": 22,
                        "nY": 34,
                        "nw": 7,
                        "nh": 0
                    }]
                },
                "redInverted": { // Vaisseau rouge
                    "srcX": 573,
                    "srcY": 5,
                    "srcWidth": 38,
                    "srcHeight": 34,
                    "guns": [{ // Guns  Position
                        "gX": 2,
                        "gY": 30,
                        "gW": 10,
                        "gH": 0,
                    }, {
                        "gX": 27,
                        "gY": 30,
                        "gW": 10,
                        "gH": 0
                    }],
                    "nozel": [{ // Nozel Position
                        "nX": 9,
                        "nY": 0,
                        "nW": 7,
                        "nH": 0
                    }, { // Nozel Position
                        "nX": 22,
                        "nY": 0,
                        "nW": 7,
                        "nH": 0
                    }]
                },
                "orange": { // Vaisseau orange
                    "srcX": 5,
                    "srcY": 69,
                    "srcWidth": 46,
                    "srcHeight": 45,
                    "guns": [{ // Guns  Position
                        "gX": 6,
                        "gY": 6,
                        "gW": 8,
                        "gH": 0,
                    }, {
                        "gX": 32, //27
                        "gY": 6,
                        "gW": 8,
                        "gH": 0
                    }],
                    "nozel": [{ // Nozel Position
                        "nX": 10,
                        "nY": 40,
                        "nW": 5,
                        "nH": 0
                    }, { // Nozel Position
                        "nX": 31,
                        "nY": 40,
                        "nW": 5,
                        "nH": 0
                    }]
                },
                "orangeInverted": { // Vaisseau orange
                    "srcX": 184,
                    "srcY": 69,
                    "srcWidth": 46,
                    "srcHeight": 45,
                    "guns": [{ // Guns  Position
                        "gX": 6,
                        "gY": 39,
                        "gW": 8,
                        "gH": 0,
                    }, {
                        "gX": 27,
                        "gY": 39,
                        "gW": 8,
                        "gH": 0
                    }],
                    "nozel": [{ // Nozel Position
                        "nX": 10,
                        "nY": 5,
                        "nW": 5,
                        "nH": 0
                    }, { // Nozel Position
                        "nX": 31,
                        "nY": 5,
                        "nW": 5,
                        "nH": 0
                    }]
                },
                "green": { // Vaisseau vert
                    "srcX": 240,
                    "srcY": 69,
                    "srcWidth": 64,
                    "srcHeight": 47,
                    "guns": [{ // Guns  Position
                        "gX": 14,
                        "gY": 0,
                        "gW": 7,
                        "gH": 0,
                    }, {
                        "gX": 43,
                        "gY": 0,
                        "gW": 7,
                        "gH": 0
                    }],
                    "nozel": [{ // Nozel Position
                        "nX": 25,
                        "nY": 47,
                        "nW": 14,
                        "nH": 0
                    }]
                },
                "greenInverted": { // Vaisseau vert
                    "srcX": 499,
                    "srcY": 69,
                    "srcWidth": 64,
                    "srcHeight": 47,
                    "guns": [{ // Guns  Position
                        "gX": 14,
                        "gY": 47,
                        "gW": 7,
                        "gH": 0,
                    }, {
                        "gX": 43,
                        "gY": 47,
                        "gW": 7,
                        "gH": 0
                    }],
                    "nozel": [{ // Nozel Position
                        "nX": 25,
                        "nY": 0,
                        "nW": 14,
                        "nH": 0
                    }]
                },
                "pink": { // Vaisseau rose
                    "srcX": 648,
                    "srcY": 69,
                    "srcWidth": 44,
                    "srcHeight": 36,
                    "guns": [{ // Guns  Position
                        "gX": 7,
                        "gy": 39,
                        "gW": 8,
                        "gH": 0,
                    }, {
                        "gX": 29,
                        "gY": 39,
                        "gW": 8,
                        "gH": 0
                    }],
                    "nozel": [{ // Nozel Position
                        "nX": 20,
                        "nY": 36,
                        "nW": 4,
                        "nH": 0
                    }]
                },
                "pinkInverted": { // Vaisseau rose
                    "srcX": 389,
                    "srcY": 115,
                    "srcWidth": 44,
                    "srcHeight": 36,
                    "guns": [{ // Guns  Position
                        "gX": 7,
                        "gY": 36,
                        "gW": 8,
                        "gH": 0,
                    }, {
                        "gX": 29,
                        "gY": 36,
                        "gW": 8,
                        "gH": 0
                    }],
                    "nozel": [{ // Nozel Position
                        "nX": 20,
                        "nY": 0,
                        "nW": 4,
                        "nH": 0
                    }]
                },
                "smallOctopus": { // Pieuvre petite
                    "srcX": 257,
                    "srcY": 5,
                    "srcWidth": 27,
                    "srcHeight": 25,
                    "guns": [] // No guns
                },
                "spaceMan": { // Spacionnaute
                    "srcX": 703,
                    "srcY": 52,
                    "srcWidth": 22,
                    "srcHeight": 29
                },
                "bigOctopus": { // Pieuvre grande
                    "srcX": 5,
                    "srcY": 169,
                    "srcWidth": 56,
                    "srcHeight": 51,
                    "guns": [] // No guns
                },
                "bigBlueShip": { // Grand vaisseau
                    "srcX": 443,
                    "srcY": 144,
                    "srcWidth": 98,
                    "srcHeight": 87,
                    "guns": [], // Guns position
                    "nozel": [{ // Nozel Position
                        "nX": 13,
                        "nY": 82,
                        "nW": 16,
                        "nH": 0
                    }, { // Nozel Position
                        "nX": 35,
                        "nY": 86,
                        "nW": 28,
                        "nH": 0
                    }, { // Nozel Position
                        "nX": 70,
                        "nY": 84,
                        "nW": 16,
                        "nH": 0
                    }]
                },
                "bigBlueShipInverted": { // Grand vaisseau
                    "srcX": 550,
                    "srcY": 169,
                    "srcWidth": 98,
                    "srcHeight": 87,
                    "guns": [], // Guns position
                    "nozel": [{ // Nozel Position
                        "nX": 14,
                        "nY": 11,
                        "nW": 16,
                        "nH": 0
                    }, { // Nozel Position
                        "nX": 37,
                        "nY": 0,
                        "nW": 28,
                        "nH": 0
                    }, { // Nozel Position
                        "nX": 72,
                        "nY": 5,
                        "nW": 16,
                        "nH": 0
                    }]
                }
            }
        },
        "planets": { // All planets
            "id": "planets",
            "url": "dist/img/space_items.png",
            "planetList": ["blackhole", "meteor1", "meteor2", "meteor3", "meteor4", "meteor5", "moon", "planet1", "planet2", "star1", "star2", "stars"],
            "planet": {
                "blackhole": {
                    "srcX": 5,
                    "srcY": 266,
                    "srcWidth": 97,
                    "srcHeight": 75
                },
                "meteor1": {
                    "srcX": 671,
                    "srcY": 443,
                    "srcWidth": 42,
                    "srcHeight": 42
                },
                "meteor2": {
                    "srcX": 30,
                    "srcY": 232,
                    "srcWidth": 22,
                    "srcHeight": 20
                },
                "meteor3": {
                    "srcX": 671,
                    "srcY": 492,
                    "srcWidth": 31,
                    "srcHeight": 36
                },
                "meteor4": {
                    "srcX": 5,
                    "srcY": 538,
                    "srcWidth": 26,
                    "srcHeight": 27
                },
                "meteor5": {
                    "srcX": 145,
                    "srcY": 232,
                    "srcWidth": 17,
                    "srcHeight": 15
                },
                "moon": {
                    "srcX": 41,
                    "srcY": 537,
                    "srcWidth": 44,
                    "srcHeight": 42
                },
                "planet1": {
                    "srcX": 96,
                    "srcY": 520,
                    "srcWidth": 64,
                    "srcHeight": 68
                },
                "planet2": {
                    "srcX": 169,
                    "srcY": 522,
                    "srcWidth": 64,
                    "srcHeight": 62
                },
                "star1": {
                    "srcX": 386,
                    "srcY": 541,
                    "srcWidth": 36,
                    "srcHeight": 30
                },
                "star2": {
                    "srcX": 659,
                    "srcY": 233,
                    "srcWidth": 21,
                    "srcHeight": 20
                },
                "stars": {
                    "srcX": 732,
                    "srcY": 0,
                    "srcWidth": 507,
                    "srcHeight": 591
                }
            }

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
            "id": "planets",
            "url": "dist/img/space_items.png",
            "shootItemList": ["rocket1", "rocket2"],
            "shootItems": {
                "rocket1": {
                    "srcX": 705,
                    "srcY": 232,
                    "srcWidth": 17,
                    "srcHeight": 26
                },
                "rocket2": {
                    "srcX": 65,
                    "srcY": 13,
                    "srcWidth": 14,
                    "srcHeight": 15
                }
            }
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
    var backImg;
    // Create a new Image object
    backImg = new Image();

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
    // direcList = ["up", "down", "right", "left", "shoot"];
    direcList = ["up", "up-right", "right", "down-right", "down", "down-left", "left", "up-left", "shoot"];
    // direcList = ["down", "right", "left", "shoot"];
    // direcList = ["down", "shoot"];

    // generate the ennemy number

    itemNum = this.random(this.spaceItems.ships.shipListInverted.length - 1);

    index = this.checkGetElement(this.spaceItems.ships.shipListInverted[itemNum]); // Check if the ship is already present

    if (index !== -1 && itemNum !== this.spaceItems.ships.shipListInverted.indexOf(this.userShip + "Inverted")) {
        // Ship exists
        if (!this.tabElement[index].inlife) {
            // Ship exists but was killed
            this.tabElement[index].inlife = true;
        }
        //Generate a new direction for the move
        direc = direcList[this.random(direcList.length - 1)];

        // add the direction to the Element array
        switch (direc) {
            // case "up":
            //     this.tabElement[index].direction[direc] = true;
            //     break;
            // case "up-right":
            //     this.tabElement[index].direction.right = true;
            //     this.tabElement[index].direction.up = true;
            //     break;
            case "right":
                this.tabElement[index].direction.right = true;
                break;
            case "down-right":
                this.tabElement[index].direction.down = true;
                this.tabElement[index].direction.right = true;
                break;
            case "down":
                this.tabElement[index].direction.down = true;
                break;
            case "down-left":
                this.tabElement[index].direction.down = true;
                this.tabElement[index].direction.left = true;
                break;
            case "left":
                this.tabElement[index].direction.left = true;
                break;
                // case "up-left":
                //     this.tabElement[index].direction.left = true;
                //     this.tabElement[index].direction.up = true;
                //     break;
            case "shoot":
                this.tabElement[index].direction.shoot = true;
                break;
            default:
                this.tabElement[index].direction.down = true;
        }

        // Move the element
        this.moveEnnemy(this.spaceItems.ships.shipListInverted[itemNum], direc);

        // If the ship go over the max size of the canvas


        // We reset its y position, to place it
        // To the upper side
        if (this.tabElement[index].y > this.height) {
            this.removeElement(this.tabElement[index].name);
        }

    } else {
        if (itemNum !== this.spaceItems.ships.shipListInverted.indexOf(this.userShip + "Inverted")) {
            if ((!this.lastSpawnTime) || ((Date.now() - this.lastSpawnTime) > this.minSpawnTime)) {
                this.lastSpawnTime = Date.now();
                // Ship doesn't not exists
                // Define all carateristics of the ship
                // It size, image, etc.
                name = this.spaceItems.ships.shipListInverted[itemNum];
                img = new Image();
                img.src = this.spaceItems.ships.url;
                objName = this.spaceItems.ships.spaceShips[name];
                x = this.random(this.width);
                if ((x + this.spaceItems.ships.spaceShips[name].srcWidth) > this.width) {
                    x = this.width - this.spaceItems.ships.spaceShips[name].srcWidth;
                }
                // y = this.random(this.height / 5);
                y = -.1 * (this.spaceItems.ships.spaceShips[name].srcHeight);
                h = this.spaceItems.ships.spaceShips[name].srcHeight;
                w = this.spaceItems.ships.spaceShips[name].srcWidth;

                // add it to the active Element array
                this.addElement(name, objName, img, x, y, w, h);
            }
        }
    }
};

/*
 * Generate Planets
 */
Game.prototype.generatePlanets = function () {
    var itemNum,
        index,
        name, img, objName, x, y, h, w,
        direcList, direc;


    direcList = ["up", "desapear", "up-right", "desapear", "right", "desapear", "down-right", "desapear", "down", "down-left", "desapear", "left", "desapear", "up-left", "desapear"];

    if ((!this.lastSpawnTimePlanet) || ((Date.now() - this.lastSpawnTimePlanet) > this.minPlanetSpawnTime)) {
        this.lastSpawnTimePlanet = Date.now();
        // Choose the planet to move

        itemNum = this.random(this.spaceItems.planets.planetList.length - 1);

        index = this.checkGetElement(this.spaceItems.planets.planetList[itemNum]); // Check if the ship is already present


        if (index !== -1) {
            // Planets exists

            //Generate a new direction for the move
            direc = direcList[this.random(direcList.length - 1)];

            // add the direction to the Element array
            switch (direc) {
                case "up":
                    this.tabElement[index].direction[direc] = true;
                    break;
                case "up-right":
                    this.tabElement[index].direction.right = true;
                    this.tabElement[index].direction.up = true;
                    break;
                case "right":
                    this.tabElement[index].direction.right = true;
                    break;
                case "down-right":
                    this.tabElement[index].direction.down = true;
                    this.tabElement[index].direction.right = true;
                    break;
                case "down":
                    this.tabElement[index].direction.down = true;
                    break;
                case "down-left":
                    this.tabElement[index].direction.down = true;
                    this.tabElement[index].direction.left = true;
                    break;
                case "left":
                    this.tabElement[index].direction.left = true;
                    break;
                case "up-left":
                    this.tabElement[index].direction.left = true;
                    this.tabElement[index].direction.up = true;
                    break;
                case "desapear":
                    this.tabElement[index].x = -15;
                    this.tabElement[index].y = -15;
                    break;
                default:
                    this.tabElement[index].direction.down = true;
            }

            // Change the planet position
            // Move the element
            this.moveEnnemy(this.spaceItems.planets.planetList[itemNum], direc);
        } else {
            // Planet doesn't not exists
            // Define all carateristics of the planet
            // It size, image, etc.
            name = this.spaceItems.planets.planetList[itemNum];
            img = new Image();
            img.src = this.spaceItems.planets.url;
            objName = this.spaceItems.planets.planet[name];
            x = this.random(this.width);
            if ((x + this.spaceItems.planets.planet[name].srcWidth) > this.width) {
                x = this.width - this.spaceItems.planets.planet[name].srcWidth;
            }
            y = this.random(this.height);
            h = this.spaceItems.planets.planet[name].srcHeight;
            w = this.spaceItems.planets.planet[name].srcWidth;

            // add it to the active Element array
            this.addElement(name, objName, img, x, y, w, h);
            index = this.checkGetElement(this.spaceItems.planets.planetList[itemNum]); // Check if the ship is already present
            this.tabElement[index].canBeTouch = false;
        }
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
    var i;
    // Clear the canvas element
    this.clearScreen();

    for (i = 0; this.tabElement[i]; i += 1) {
        // Select all element present
        // draw each element
        if (this.tabElement[i].img) {
            this.ctx.drawImage(this.tabElement[i].img, this.tabElement[i].item.srcX, this.tabElement[i].item.srcY, this.tabElement[i].item.srcWidth, this.tabElement[i].item.srcHeight, this.tabElement[i].x, this.tabElement[i].y, this.tabElement[i].w, this.tabElement[i].h);
        }

    }

    // Add the score element
    this.showScore();
};

/*
 * Move the player ship
 * @param {String} name - name of the element to move
 * @param {String} movestatus - Check if the element moving
 */
Game.prototype.movePlayer = function (name, moveStatus) {
    var index,
        intervalID, // Save the Interval ID
        vm;

    // Retreive the index element
    index = this.checkGetElement(name);
    vm = this;

    if (name === "player") {
        intervalID = window.setInterval(function () {
            if (vm.keyStatus.up && moveStatus) {
                // Key up pressed
                if (vm.checkMove("player", "up") === true) { // If move is authorized
                    // Set new position, and draw spaceItems
                    if (vm.getY("player") >= (vm.height * 3 / 4)) {
                        // if we do not go over 3/4 of the canvas, we can go up
                        vm.moveY("player", -1);
                    }
                };
            }

            if (vm.keyStatus.down && moveStatus) {
                // Key up pressed
                if (vm.checkMove("player", "down") === true) { // If move is authorized
                    // Set new position, and draw spaceItems
                    vm.moveY("player", +1);
                };
            }

            if (vm.keyStatus.left && moveStatus) {
                // Key left pressed
                if (vm.checkMove("player", "left") === true) { // If move is authorized
                    // Set new position, and draw spaceItems
                    vm.moveX("player", -1);
                };
            }

            if (vm.keyStatus.right && moveStatus) {
                // Key right pressed
                if (vm.checkMove("player", "right") === true) { // If move is authorized
                    // Set new position, and draw spaceItems
                    vm.moveX("player", +1);
                };
            }

            if (vm.keyStatus.shoot && moveStatus) {
                // Key space pressed               
                vm.shoot("player");
                vm.moveRocket("player");
                // vm.keyStatus.shoot = false;
            }
        }, 50);
    }
};

/*
 * Move the Ennemy ship
 * @param {String} name - name of the element to move
 * @param {String} movestatus - Check if the element moving
 */
Game.prototype.moveEnnemy = function (name, moveStatus) {
    var index,
        intervalID, // Save the Interval ID
        vm;

    // Retreive the index element
    index = this.checkGetElement(name);
    vm = this;

    window.setInterval(function () {
        if (vm.tabElement[index]) {
            if (vm.tabElement[index].direction.up) {
                // Key up pressed
                // if (vm.checkMove(name, "up") === true) { // If move is authorized
                // Set new position, and draw spaceItems
                vm.moveY(name, -5);
                vm.tabElement[index].direction.up = false;
                // };
            }

            if (vm.tabElement[index].direction.down) {
                // Key up pressed
                // if (vm.checkMove(name, "down") === true) { // If move is authorized
                // Set new position, and draw spaceItems
                vm.moveY(name, 5);
                vm.tabElement[index].direction.down = false;
                // };
            }

            if (vm.tabElement[index].direction.left) {
                // Key left pressed
                // if (vm.checkMove(name, "left") === true) { // If move is authorized
                // Set new position, and draw spaceItems
                vm.moveX(name, -5);
                vm.tabElement[index].direction.left = false;
                // };
            }

            if (vm.tabElement[index].direction.right) {
                // Key right pressed
                // if (vm.checkMove(name, "right") === true) { // If move is authorized
                // Set new position, and draw spaceItems
                vm.moveX(name, 5);
                vm.tabElement[index].direction.right = false;
                // };
            }
        }

    }, 2);
}
/*
 *   Delete the rocket
 */
Game.prototype.removeRocket = function () {
    var i,
        re,
        vm;

    vm = this;
    // To check if the item name "rocket*"
    re = /rocket/gi;

    // Get all targets
    for (i = 0; vm.tabElement[i]; i += 1) {
        // Get position of rockets
        if (vm.tabElement[i].name.match(re)) {
            console.log(vm.tabElement);
            vm.removeElement(vm.tabElement[i].name);
        }
    }
    this.tabElement[this.checkGetElement("player")].shootOn = false;
    this.keyStatus.shoot = false;
    console.log("removeRocket", this.tabElement[this.checkGetElement("player")].shootOn);
};

/*
 * Move the rocket
 * @param {String} name - Name of the player who shoot
 * @param {String} moveStatus - Check if the status 
 */
Game.prototype.moveRocket = function (name, moveStatus) {
    var i,
        index,
        re,
        vm,
        playerId;

    // Save the calling function
    vm = this;

    index = this.checkGetElement(name);
    playerId = this.tabElement[index];


    // To check if the item name "rocket*"
    re = /rocket/gi;
    // Check if shoot is active
    if (this.keyStatus.shoot && playerId.shootOn === true) {
        this.intervalIDRocket = window.setInterval(function () {
            // Get all targets
            for (i = 0; vm.tabElement[i]; i += 1) {
                // Get position of rockets
                if (vm.tabElement[i].name.match(re)) {
                    // If it is the player who shoot
                    if (name === "player" && playerId.shootOn) {
                        vm.checkGetElementXY(vm.tabElement[i].x - 1, vm.tabElement[i].y - 1)
                        if (vm.spaceItems.ships.shipListInverted.indexOf(vm.checkGetElementXY(vm.tabElement[i].x, vm.tabElement[i].y)) !== -1) {
                            // We touch an ennemy
                            // playerId.shootOn = false;
                            // vm.keyStatus.shoot = false;
                            // if (this.intervalIDRocket) {
                            //     clearInterval(this.intervalIDRocket);
                            // }
                            // vm.removeRocket();

                        } else {
                            // nothing arround, the rocket move
                            vm.moveY(vm.tabElement[i].name, -1);
                        }

                        // if its position is not on canvas, stop the animation
                        if (vm.tabElement[i].y === -40) {
                            console.log("Stop animation");
                            playerId.shootOn = false;
                            vm.keyStatus.shoot = false;

                            vm.removeRocket();
                            // vm.removeElement(vm.tabElement[i].name);
                            console.log(vm.tabElement)
                        }
                    }
                }
            }

        }, 1)
    }
}

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
                    intervalID = vm.movePlayer("player", moveOn);
                }
                break;
            case 38:
                // Up key is pressed
                if (!moveOn) {
                    moveOn = true;
                    vm.keyStatus.up = true;
                    intervalID = vm.movePlayer("player", moveOn);
                }
                break;
            case 39:
                // Right key is pressed
                if (!moveOn) {
                    moveOn = true;
                    vm.keyStatus.right = true;
                    intervalID = vm.movePlayer("player", moveOn);
                }
                break;
            case 40:
                // Down key is pressed
                if (!moveOn) {
                    moveOn = true;
                    vm.keyStatus.down = true;
                    intervalID = vm.movePlayer("player", moveOn);
                }
                break;
            case 32:
                // Space key is pressed
                if (!moveOn) {
                    moveOn = true;
                    vm.keyStatus.shoot = true;
                    intervalID = vm.movePlayer("player", moveOn);
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
    this.addElement("player", this.spaceItems.ships.spaceShips[this.userShip], img, gamerX, gamerY, dw, dh);

};

/*
 * Function to activate the shoot
 * @param {String} name - name of the shooting fly
 */
Game.prototype.shoot = function (name) {
    var index,
        gunsX,
        gunsY,
        i,
        img;


    // If shoot, get the element caracteristics
    index = this.checkGetElement(name);

    if (!this.tabElement[index].shootOn) {
        this.tabElement[index].shootOn = true;
        // Get the image of rockets
        img = new Image();
        img.src = this.spaceItems.shoots.url;

        // get the position of the guns

        // console.log(this.tabElement[index])

        for (i = 0; this.tabElement[index].item.guns[i]; i += 1) {
            img = new Image();
            img.src = this.spaceItems.shoots.url;
            gunsX = this.tabElement[index].x + this.tabElement[index].item.guns[i].gX;
            gunsY = this.tabElement[index].y + this.tabElement[index].item.guns[i].gY - this.spaceItems.shoots.shootItems.rocket1.srcHeight;

            this.addElement('rocket1' + i, this.spaceItems.shoots.shootItems.rocket1, img, gunsX, gunsY, this.tabElement[index].item.guns[i].gW, this.spaceItems.shoots.shootItems.rocket1.srcHeight);
        }
        // console.log(this.tabElement);
        // console.log("shoot - index=", index);
        // Get the calling fly position

        // Set the rocket since the fly

        // Call the moving rocket

        // if we touch a fly
        // Activate the animation
        // move out the fly
    } else {
        if (this.intervalIDRocket) {
            clearInterval(this.intervalIDRocket);
        }

    }

};