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
 * @param {String} name - Name of the element
 * @param {Number} posX - X position of the element
 * @param {Number} posY - Y position of the element
 * @param {Number} width - Width of the element
 * @param {Number} height - Height of the element
 * @return {null}
 */
Gameboard.prototype.addElement = function (name, img, dx, dy, dw, dh, posX, posY, width, height) {
    var index;
    index = this.checkGetElement(name);
    if (index === -1) { // If does not exists, Add the element
        this.tabElement.push({
            "name": name,
            "img": img,
            "dx": dx,
            "dy": dy,
            "dw": dw,
            "dh": dh,
            "x": posX,
            "y": posY,
            "w": width,
            "h": height,
            "inlife": 1
        });
    } else { // update the value of the element
        this.tabElement[index] = {
            "name": name,
            "img": img,
            "dx": dx,
            "dy": dy,
            "dw": dw,
            "dh": dh,
            "x": posX,
            "y": posY,
            "w": width,
            "h": height,
            "inlife": 1
        };
    }
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
    if ((x1 >= x2) && (x1 <= (x2 + w2))) {
        return true;
    }
    if (((x1 + w1) >= x2) && ((x1 + w1) <= (x2 + w2))) {
        return true;
    }
    return false;
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
    if ((y1 >= y2) && (y1 <= (y2 + h2))) {
        return true;
    }
    if (((y1 + h1) >= y2) && ((y1 + h1) <= (y2 + h2))) {
        return true;
    }
    return false;
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
    var i;

    if (direction === "right") {
        // Check if the element touch the right of the canvas
        if ((posX + width + 1) > this.maxBoard) {
            return false;
        }

        // Test element with its environment
        for (i = 1; this.tabElement[i]; i += 1) {
            // If it is the calling element, do nothing            

            if (i !== id) {
                if (this.testVerticalZone(posY, this.tabElement[i].y, height, this.tabElement[i].h) && this.testHorizontalZone(posX + 1, this.tabElement[i].x, width, this.tabElement[i].w)) {
                    return false; // We touch
                }
            }
        }
        return true; // Nothing around
    }
    if (direction === "left") {
        // Check if the element touch the left of the canvas
        if ((posX - 1) < this.minBoard) {
            return false;
        }

        // Test element with its environment
        for (i = 1; this.tabElement[i]; i += 1) {
            // If it is the calling element, do nothing
            if (i !== id) {
                if (this.testVerticalZone(posY, this.tabElement[i].y, height, this.tabElement[i].h) === true && this.testHorizontalZone(posX - 1, this.tabElement[i].x, width, this.tabElement[i].w) === true) {
                    return false; // We touch
                }
            }
        }
        return true; // Nothing around
    }
    if (direction === "up") {
        // Check if the element touch the top of the canvas
        if ((posY - 1) < 0) {
            return false;
        }

        // Test element with its environment
        for (i = 1; this.tabElement[i]; i += 1) {
            // If it is the calling element, do nothing

            if (i !== id) {
                if (this.testVerticalZone(posY - 1, this.tabElement[i].y, height, this.tabElement[i].h) === true && this.testHorizontalZone(posX, this.tabElement[i].x, width, this.tabElement[i].w) === true) {
                    return false; // We touch
                }
            }
        }
        return true; // Nothing around

    }
    if (direction === "down") {
        // Check if the element touch the bottom of the canvas
        if ((posY + height + 1) >= this.gameboardHeight) {
            return false;
        }

        // Test element with its environment
        for (i = 1; this.tabElement[i]; i += 1) {
            // If it is the calling element, do nothing

            if (i !== id) {
                if (this.testVerticalZone(posY + 1, this.tabElement[i].y, height, this.tabElement[i].h) === true && this.testHorizontalZone(posX, this.tabElement[i].x, width, this.tabElement[i].w) === true) {
                    return false; // We touch
                }
            }
        }
        return true; // Nothing around
    }
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
    if (id !== -1) {
        return this.tabElement[id].x;
    }
};

/*
 * GetY - Get the Y position of the Object
 * @param {String} name - Name of the element
 * @return {Number} Position Y : Position of the object
 */
Gameboard.prototype.getY = function (name) {
    var id = this.checkGetElement(name);
    if (id !== -1) {
        return this.tabElement[id].y;
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
    if (id !== -1) {
        this.tabElement[id].x = posX;
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
    if (id !== -1) {
        this.tabElement[id].y = posY;
        return this.getY(name);
    }
};

/*
 * moveX - Move the element on the X axis
 * @param {String} name - Name of the element to move
 * @return {Number} pos - New position of the element
 */
Gameboard.prototype.moveX = function (name) {
    var id = this.checkGetElement(name);
    if (id !== -1) {
        this.tabElement[id].x -= 1;
        return this.getX(name);
    }
};
/*
 * moveY - Move the element on the Y axis
 * @param {String} name - Name of the element to move
 * @return {Number} pos - New position of the element
 */
Gameboard.prototype.moveY = function (name) {
    var id = this.checkGetElement(name);
    if (id !== -1) {
        this.tabElement[id].y -= 1;
        return this.getY(name);
    }
};
/*
 * incScore - Increment the score counter
 * @param {Null}
 * @return {Number} - Score value, or -1 if games is finished
 */
Gameboard.prototype.incScore = function () {
    if (this.score < this.maxScore - 1) {
        // Increment the score value
        this.score += 1;
        return this.score;
    }

    return -1; // The game is finished

};