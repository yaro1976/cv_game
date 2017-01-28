'use strict';
var Image;

/*
 * SpaceElement - Create the FlyElement object
 * @constructor
 * @param {string} name - name of the object 
 * @param {number} W - Width of the object
 * @param {number} H - Height of the object
 */
var SpaceElement = function () {
    this.tabElement = {};
    this.life = 100; // Initial Life
    this.dead = false; // Set death or not status
    this.speed = 1; // Speed in pixels
    this.haveLazer = false; // If got lazer

};
/*
 * initialize - Create the FlyElement object 
 * @param {string} name - name of the object 
 * @param {number} W - Width of the object
 * @param {number} H - Height of the object
 */
SpaceElement.prototype.initialize = function (name,  w, h) {
    // Common object property 
    this.name = name; // Name of the element    
    this.width = w; // Width of the object
    this.height = h; // Width of the object    
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