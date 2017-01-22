/* global Image */
/*jslint browser: true*/
'use strict';

/*
 * SpaceEngine - Create the Fly object
 * @constructor
 * @param {string} name - name of the object 
 * @param {number} X - initial X position
 * @param {number} Y - initial Y position
 * @param {number} W - Width of the object
 * @param {number} H - Height of the object
 * @return {Object} flyElement - a flyElement Object
 */
var spaceEngine = function (name, x, y, w, h) {

    /*
     * SpaceElement - Create the FlyElement object
     * @constructor
     * @param {string} name - name of the object 
     * @param {number} X - initial X position 
     * @param {number} Y - initial Y position
     * @param {number} W - Width of the object
     * @param {number} H - Height of the object
     */
    var SpaceElement = function (name, x, y, w, h) {
        // Common object property 
        this.name = name; // Name of the element
        this.posX = x; // Initial position in X
        this.posY = y; // Initial position in Y
        this.width = w; // Width of the object
        this.height = h; // Width of the object
        // ==> To add width, height, tabElement (= Array prototype)
        this.life = 100; // Initial Life
        this.dead = false; // Set death or not status
        this.speed = 1; // Speed in pixels
        this.haveLazer = false; // If got lazer
        

        /*
         * moveX - Set the new position of the Object
         * @param {number} newIncrPositionX - new position increment
         * @return {null}
         */
        SpaceElement.prototype.moveX = function (newIncrPositionX) {
            this.posX += newIncrPositionX;
        };

        /*
         * moveY - Set the new position of the Object
         * @param {number} newIncrPositionX - new position increment
         * @return {null}
         */
        SpaceElement.prototype.moveY = function (newIncrPositionY) {
            this.posY += newIncrPositionY;
        };

        /*
         * decrementLife - Decrease the life level if touch
         * @param {Null}
         * @return {null}
         */
        SpaceElement.prototype.decrementLife = function () {
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
        SpaceElement.prototype.setImage = function (url) {
            this.img = new Image();
            this.img.src = url;
            this.img.alt = this.name;
        };

        /*
         * checkMove - Check if move is valid
         * @param {Number} X - Next X position, 
         * @param {Number} Y - Next Y position
         * @return {Boolean} True Valid, False Refused
         */
        SpaceElement.prototype.checkMove = function (x, y) {
            // Calcul the global zone used by the object
            var endPointW = this.tabElement[this.name].w + x;
            var endPointH = this.tabElement[this.name].h + y;
            var i;
            for (i = 0; this.tabElement[i]; i += 1) {
                // Check all elements
                console.log(endPointH);
                console.log(endPointW);
            }
            return true;
        };

        /*
         * addElement - Add the element in the global game array
         */
        SpaceElement.prototype.addElement = function () {
            // Insert 
            
            this.tabElement[this.name] = {
                "x": this.posX,
                "y": this.posY,
                "w": this.width,
                "h": this.height
            };
        };

        /*
         * tabElement - Global game array
         */
        SpaceElement.prototype.tabElement = {};


    };
    return new SpaceElement(name, x, y, w, h);
};
