"use strict";
exports.__esModule = true;
var _2d_vector_functions_1 = require("2d-vector-functions");
var Body = (function () {
    function Body(id) {
        this.id = id;
        this.density = 1;
        this.restitution = 1; //bounciness
        this.friction = 1;
        this.velocity = [0, 0];
        this.acceleration = [0, 0];
        this.appliedForce = [0, 0];
        this.init();
    }
    Body.prototype.update = function () {
        this.velocity = _2d_vector_functions_1.vec.multiply(this.friction, _2d_vector_functions_1.vec.add(this.velocity, _2d_vector_functions_1.vec.multiply(this.inverseMass, this.appliedForce)));
        this.move();
        this.appliedForce = [0, 0];
    };
    Body.prototype.init = function () {
        this.volume = this.getVolume();
        this.mass = this.volume * this.density;
        this.inverseMass = 1 / this.mass;
        this.type = ('' + this.constructor).split(' ')[1].split(/[\(\{]/)[0].toLowerCase();
    };
    Body.prototype.applyForce = function (f) {
        this.appliedForce = _2d_vector_functions_1.vec.add(this.appliedForce, f);
    };
    Body.prototype.move = function () {
        this.position = _2d_vector_functions_1.vec.add(this.position, this.velocity);
    };
    Body.prototype.getBoundingBox = function () { };
    Body.prototype.getShape = function () { };
    Body.prototype.getVolume = function () {
        return 1;
    };
    return Body;
}());
exports.Body = Body;
