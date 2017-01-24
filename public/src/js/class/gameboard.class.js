'use strict';

/*
 * Gameboard - Create the gameboard 
 * @constructor
 * @param {Null}
 * @return {null}
 */

var Gameboard = function () {
    this.tabElement = []; // tabElement - Global game array
    this.gameboardWidth = 340;
    this.gameboardHeight = 640;
};

/*
 * addElement - addElement onto the gameboard
 * @param {String} name - Name of the element
 * @param {Number} posX - X position of the element
 * @param {Number} posY - Y position of the element
 * @param {Number} width - Width of the element
 * @param {Number} height - Height of the element
 * @return {null}
 */
Gameboard.prototype.addElement = function (name, posX, posY, width, height) {
    this.tabElement.push({
        "name": name,
        "x": posX,
        "y": posY,
        "w": width,
        "h": height
    });
};

/*
 * checkGetElement - Check if element is present on gameboard
 * @param {String} name - Name of the element
 * @return {Boolean} - true element exists, false if not
 */
Gameboard.prototype.checkGetElement = function (name) {
    for (var i = 0; this.tabElement[i]; i++) {
        if (this.tabElement[i].name == name) {
            return i;
        }
    };
    return -1;
};

/*
 * checkmoveX - Check the move of the element
 * @param {String} name - Name of the tested element
 * @param {Number} posX - X position of the element
 * @return {Boolean} - true : position clear, false : an element is present
 */
Gameboard.prototype.checkMoveX = function (name, posx) {
    var width = 0;
    var height = 0;
    var authMove = true;

    if (posx <= 0) {
        return false;
    }

    // Retreve the width and the height of the moving object
    for (var i = 0; this.tabElement[i]; i++) {
        if (this.tabElement[i].name === name) {
            width = this.tabElement[i].w;
            height = this.tabElement[i].h;
        }
    }

    for (var i = 0; this.tabElement[i]; i++) {
        if (this.tabElement[i].name !== name) {

            // Check if the new X position is over an existing object

            if (this.tabElement[i].x < posx || posx < (this.tabElement[i].x + this.tabElement[i].w)) {
                authMove = false;
            }
            else if ((this.tabElement[i].x) < posx || posx < this.tabElement[i].x) {
                //
            }
            // } else if (  (posx + width )< this.tabElement[i].x || (posx + width ) > (this.tabElement[i].x + this.tabElement[i].w) ) {
            //     // The X + width element are over an existing object

            // } 
            else {
                authMove = true;
            }
        }
    }
    return authMove;
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
    if (id != -1) {
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
    if (id != -1) {
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
    if (id != -1) {
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
    if (id != -1) {
        this.tabElement[id].y = posY;
        return this.getY(name);
    }
};

/*
* moveX - Move the element on the X axis
* @param {String} name - Name of the element to move
* @return {Number} pos - New position of the element
*/
Gameboard.prototype.moveX = function (name){
    var id = this.checkGetElement(name);
    if (id != -1) {
        this.tabElement[id].x -=1;
        return this.getX(name);
    }
};
/*
* moveY - Move the element on the Y axis
* @param {String} name - Name of the element to move
* @return {Number} pos - New position of the element
*/
Gameboard.prototype.moveY = function (name){
    var id = this.checkGetElement(name);
    if (id != -1) {
        this.tabElement[id].y -=1;
        return this.getY(name);
    }
};