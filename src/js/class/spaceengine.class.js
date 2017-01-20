'use strict';

/*
    * SpaceEngine - Create the Fly object
    * @constructor
    * @param {string} name - name of the object 
    * @param {number} X - initial X position
    * @param {number} Y - initial Y position
    * @return {Object} flyElement - a flyElement Object
    */
var SpaceEngine = function(name, x, y) {

    /*
    * SpaceElement - Create the FlyElement object
    * @constructor
    * @param {string} name - name of the object 
    * @param {number} X - initial X position 
    * @param {number} Y - initial Y position
    */
    var SpaceElement = function(name, x, y) {
        // Common object property 
        this.name = name; // Name of the element
        this.posX = x; // Initial position in X
        this.posY = y; // Initial position in Y
        // ==> To add width, height, tabElement (= Array prototype)
        this.life = 100; // Initial Life
        this.dead = false; // Set death or not status
        this.speed = 1; // Speed in pixels
    };

    /*
    * moveX - Set the new position of the Object
    * @param {number} newIncrPositionX - new position increment
    * @return {null}
    */
    SpaceElement.prototype.moveX = function(newIncrPositionX) {
        this.posX += newIncrPositionX;
    };

    /*
    * moveY - Set the new position of the Object
    * @param {number} newIncrPositionX - new position increment
    * @return {null}
    */
    SpaceElement.prototype.moveY = function(newIncrPositionY) {
        this.posY += newIncrPositionY;
    };
    
    /*
    * decrementLife - Decrease the life level if touch
    * @param {Null}
    * @return {null}
    */
    SpaceElement.prototype.decrementLife = function() {
        this.life -= 1;
        if (this.life <= 0) {
            this.dead = true;
        }
    };
    
    /*
    * setImage - Set Images of the element
    * @param {String} url - Url of the element
    * @return {null}
    */
    SpaceElement.prototype.setImage = function(url) {
        this.img = new Image();
        this.img.src=url;
        this.img.alt=this.name;
    };
    
    /*
    * checkMove - Check if move is valid
    * @param {Number} X - Next X position, 
    * @param {Number} Y - Next Y position
    * @param {Array} tabElement - Array of all elements position on Game
    * @return {Boolean} True Valid, False Refused
    */
    SpaceElement.prototype.checkMove = function(x, y, tabElement) {
       
       return true;
    };

    return new SpaceElement(name, x, y);
};


var monElement = SpaceEngine("monElement", 2, 3);
console.log(monElement);
monElement.moveX(-1);
console.log(monElement.posX);
// localStorage.setItem('vaisseau', -5);
// localStorage.removeItem('vaisseau');
var monElement2 = SpaceEngine("monElement2",12,23);
monElement2.decrementLife();
console.log(monElement2);
monElement2.setImage('img/ship.png');
console.log(monElement2);
