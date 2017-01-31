'use strict';

var SpaceElement;
/*
 * Gameboard - Create the gameboard
 * @constructor
 * @param {Null}
 * @return {null}
 */

var Gameboard = function (width, height) {
    SpaceElement.call(this);
    this.tabElement = []; // tabElement - Global game array
    this.gameboardWidth = width || 340;
    this.gameboardHeight = height || 640;
    this.minBoard = 0; // Min position to draw items
    this.maxBoard = this.gameboardWidth; // Max position to draw items
    this.score = 0; // to Save the score
    this.maxScore = 9; // Score Maximum
};
Gameboard.prototype = Object.create(SpaceElement.prototype);

/*
 * addElement - addElement onto the gameboard
 * @param {String} name - Item Object
 * @param {String} item - Item Object
 * @param {Object} img - image url of the initial image
 * @param {Number} posX - X position of the element
 * @param {Number} posY - Y position of the element
 * @param {Number} width - Width of the element
 * @param {Number} height - Height of the element
 * @return {null}
 */

Gameboard.prototype.addElement = function (name, item, img, posX, posY, width, height) {
    var index;

    index = this.checkGetElement(name);
    if (index === -1) { // If does not exists, Add the element
        this.tabElement.push({
            "name": name, // Name of the object
            "item": item, // item Object
            "img": img, // Image object property
            "x": posX, // Source X position
            "y": posY, // Source Y position
            "w": width, // Source width
            "h": height, // Source height
            "inlife": true, // is inlife ?
            "direction": { // Store the direction of the move
                "up": false,
                "down": false,
                "right": false,
                "left": false,
                "shoot": false
            },
            "canBeTouch": true,
            "shootOn": false
        });
    } else { // update the value of the element
        this.tabElement[index] = {
            "name": name, // Name of the object
            "item": item, // item Object
            "x": posX, // Source X position
            "y": posY, // Source Y position
            "w": width, // Source width
            "h": height, // Source height
            "inlife": true, // is inlife ?
            "direction": { // Store the direction of the move
                "up": false,
                "down": false,
                "right": false,
                "left": false,
                "shoot": false
            },
            "speed": 0,
            "canBeTouch": true,
            "shootOn": false
        };
    }
};

/*
 * removeElement - addElement onto the gameboard
 * @param {String} name - Item Object
 * @return {null}
 */

Gameboard.prototype.removeElement = function (name) {
    var index;

    index = this.checkGetElement(name);
    return this.tabElement.splice(index, 1);
};

/*
 * checkGetElement - Check if element is present on gameboard
 * @param {String} name - Name of the element
 * @return {Number} id - The index of the element, present on tabElement array
 */
Gameboard.prototype.checkGetElement = function (name) {
    var i;

    for (i = 0; this.tabElement[i]; i += 1) {
        if (this.tabElement[i].name === name) {
            // If found => Return the index
            return i;
        }
    }
    // If not
    return -1;
};

/*
 * testHorizontalZone - Test Horizontal zone
 * @param {Number} x1 - First Y position to be check
 * @param {Number} x2 - Second Y position
 * @param {Number} w1 - Height of the first element
 * @param {Number} w2 - Height of the second element
 * @return {Boolean} - True elements are present is the zone
 */
Gameboard.prototype.testHorizontalZone = function (x1, x2, w1, w2) {
    // If left point of the first element is beetwen the first left point and the right point of the second object
    // We should touch him
    if ((x1 >= x2) && (x1 <= (x2 + w2))) {
        return true; // We touch
    }
    // If right point of the first element is beetwen the first left point and the right point of the second object
    // We should touch him
    if (((x1 + w1) >= x2) && ((x1 + w1) <= (x2 + w2))) {
        return true; // we touch
    }
    return false; // Zone is clear
};

/*
 * testVerticalZone - Test vertical zone
 * @param {Number} y1 - First Y position to be check
 * @param {Number} y2 - Second Y position
 * @param {Number} h1 - Height of the first element
 * @param {Number} h2 - Height of the second element
 * @return {Boolean} - True elements are present is the zone
 */
Gameboard.prototype.testVerticalZone = function (y1, y2, h1, h2) {
    // If upper point of the first element is beetwen the upper left point and the lower point of the second object
    // We should touch him
    if ((y1 >= y2) && (y1 <= (y2 + h2))) {
        return true; // we touch
    }

    // If lower point of the first element is beetwen the upper left point and the lower point of the second object
    // We should touch him
    if (((y1 + h1) >= y2) && ((y1 + h1) <= (y2 + h2))) {
        return true; // We touch
    }
    return false; // Zone is clear
};

/*
 * checkMove - Check the move of the element
 * @param {String} name - Name of the tested element
 * @param {String} Direction - Direction of the move
 * @return {Boolean} - true : position clear, false : an element is present
 */
Gameboard.prototype.checkMove = function (name, direction) {
    var id = this.checkGetElement(name); // Get the index of the moving element
    var posX = this.getX(name); // Get its X position
    var posY = this.getY(name); // Get its Y position
    var width = this.tabElement[id].w; // Get its width
    var height = this.tabElement[id].h; // Get its height
    var i; // Index of the element

    // if (name !== "player" && name !== "spaceTest" && name !== "spaceTest2") {
    //     // if (direction === "creation") {
    //     // Check if the element touch the right of the canvas
    //     // if ((posX + width + 1) > this.maxBoard) {
    //     //     return false;
    //     // }

    //     // // Test element with its environment
    //     // for (i = 1; this.tabElement[i]; i += 1) {
    //     //     // If it is the calling element, do nothing

    //     //     if (i !== id && !this.tabElement[i].dead) { // It is the initial testing object called
    //     //         // We test the X and Y position
    //     //         if (this.testVerticalZone(posY, this.tabElement[i].y, height, this.tabElement[i].h) && this.testHorizontalZone(posX, this.tabElement[i].x, width, this.tabElement[i].w)) {
    //     //             return false; // We touch
    //     //         }
    //     //     }
    //     // }
    //     return true; // Nothing around
    //     // }
    //     // return true;
    // } else {

    // If we go to right
    if (direction === "right") {
        // Check if the element touch the right of the canvas
        if ((posX + width + 1) > this.maxBoard) {
            return false;
        }

        // Test element with its environment
        for (i = 1; this.tabElement[i]; i += 1) {
            // If it is the calling element, do nothing

            if (i !== id && !this.tabElement[i].dead && this.tabElement[i].canBeTouch) { // It is the initial testing object called
                // We test the X and Y position
                if (this.testVerticalZone(posY, this.tabElement[i].y, height, this.tabElement[i].h) && this.testHorizontalZone(posX + 1, this.tabElement[i].x, width, this.tabElement[i].w)) {
                    return false; // We touch
                }
            }
        }
        return true; // Nothing around
    }

    // If we go to left
    if (direction === "left") {
        // Check if the element touch the left of the canvas
        if ((posX - 1) < this.minBoard) {
            return false;
        }

        // Test element with its environment
        for (i = 1; this.tabElement[i]; i += 1) {
            // If it is the calling element, do nothing
            if (i !== id && !this.tabElement[i].dead && this.tabElement[i].canBeTouch) { // It is the initial testing object called
                // We test the X and Y position
                if (this.testVerticalZone(posY, this.tabElement[i].y, height, this.tabElement[i].h) && this.testHorizontalZone(posX - 1, this.tabElement[i].x, width, this.tabElement[i].w)) {
                    return false; // We touch
                }
            }
        }
        return true; // Nothing around
    }

    // if we go to up direction
    if (direction === "up") {
        // Check if the element touch the top of the canvas
        if ((posY - 1) < 0) {
            return false;
        }

        // Test element with its environment
        for (i = 1; this.tabElement[i]; i += 1) {
            // If it is the calling element, do nothing

            if (i !== id && !this.tabElement[i].dead && this.tabElement[i].canBeTouch) { // It is the initial testing object called
                // We test the X and Y position
                if (this.testVerticalZone(posY - 1, this.tabElement[i].y, height, this.tabElement[i].h) && this.testHorizontalZone(posX, this.tabElement[i].x, width, this.tabElement[i].w)) {
                    return false; // We touch
                }
            }
        }
        return true; // Nothing around
    }

    // if we go to down direction
    if (direction === "down") {
        // Check if the element touch the bottom of the canvas
        if ((posY + height + 1) >= this.gameboardHeight) {
            return false;
        }

        // Test element with its environment
        for (i = 1; this.tabElement[i]; i += 1) {
            // If it is the calling element, do nothing

            if (i !== id && !this.tabElement[i].dead && this.tabElement[i].canBeTouch) { // It is the initial testing object called
                // We test the X and Y position
                if (this.testVerticalZone(posY + 1, this.tabElement[i].y, height, this.tabElement[i].h) && this.testHorizontalZone(posX, this.tabElement[i].x, width, this.tabElement[i].w)) {
                    return false; // We touch
                }
            }
        }
        return true; // Nothing around
    }
    // }
};

/*
 * moveX - Set the new position of the Object
 * @param {number} newIncrPositionX - new position increment
 * @return {null}
 */
Gameboard.prototype.moveX = function (newIncrPositionX) {
    this.posX += newIncrPositionX;
};

/*
 * moveY - Set the new position of the Object
 * @param {number} newIncrPositionX - new position increment
 * @return {null}
 */
Gameboard.prototype.moveY = function (newIncrPositionY) {
    this.posY += newIncrPositionY;
};

/*
 * Getx - Get the X position of the Object
 * @param {String} name - Name of the element
 * @return {Number} Position X : Position of the object
 */
Gameboard.prototype.getX = function (name) {
    var id = this.checkGetElement(name);
    if (id !== -1) { // Element is found
        return this.tabElement[id].x; // We return the X value
    }
};

/*
 * GetY - Get the Y position of the Object
 * @param {String} name - Name of the element
 * @return {Number} Position Y : Position of the object
 */
Gameboard.prototype.getY = function (name) {
    var id = this.checkGetElement(name);
    if (id !== -1) { // Element is found
        return this.tabElement[id].y; // Return the Y value
    }
};
/*
 * Getx - Get the X position of the Object
 * @param {String} name - Name of the element
 * @param {Number} posX - New X position of the element
 * @return {Number} Position X : Position of the object
 */
Gameboard.prototype.setX = function (name, posX) {
    var id = this.checkGetElement(name);
    if (id !== -1) { // If the element is found
        this.tabElement[id].x = posX; // Change the X value
        return this.getX(name);
    }
};

/*
 * GetY - Get the Y position of the Object
 * @param {String} name - Name of the element
 * @param {Number} posY - New Y position of the element
 * @return {Number} Position Y : Position of the object
 */
Gameboard.prototype.setY = function (name, posY) {
    var id = this.checkGetElement(name);
    if (id !== -1) { // If the object is found
        this.tabElement[id].y = posY; // Change its Y value
        return this.getY(name);
    }
};

/*
 * moveX - Move the element on the X axis
 * @param {String} name - Name of the element to move
 * @param {String} step - Step of the move
 * @return {Number} pos - New position of the element
 */
Gameboard.prototype.moveX = function (name, step) {
    var id = this.checkGetElement(name);
    if (id !== -1) { // If the element is found
        this.tabElement[id].x += step; // Change its X value
        return this.getX(name);
    }
};
/*
 * moveY - Move the element on the Y axis
 * @param {String} name - Name of the element to move
 * * @param {String} step - Step of the move
 * @return {Number} pos - New position of the element
 */
Gameboard.prototype.moveY = function (name, step) {
    var id = this.checkGetElement(name);
    if (id !== -1) { // If the element is found
        this.tabElement[id].y += step; // Change its Y value
        return this.getY(name);
    }
};
/*
 * incScore - Increment the score counter
 * @param {Null}
 * @return {Number} - Score value, or -1 if games is finished
 */
Gameboard.prototype.incScore = function () {
    if (this.score < this.maxScore - 1) { // If not element found
        // Increment the score value
        this.score += 1;
        return this.score;
    }

    return -1; // The game is finished
};

/*
 * Retreve the element presents at a position
 * @param {Number} x - x postition of the element
 * @param {Number} y - y postition of the element
 * @return {String} The name of the element
 */
Gameboard.prototype.checkGetElementXY = function (x, y) {
    var i;

    for (i = 0; this.tabElement[i]; i += 1) {
        // Test if the coordonates are in an object

        if ((x >= this.tabElement[i].x) && (x <= (this.tabElement[i].x + this.tabElement[i].w))) {
            if ((y >= this.tabElement[i].y) && (y <= (this.tabElement[i].y + this.tabElement[i].h))) {
                // Return the name of the element found
                if (this.tabElement[i].name !== "backimage") {
                    return this.tabElement[i].name;
                }

            }

        }
    }
};