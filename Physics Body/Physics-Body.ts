import { vec } from '2d-vector-functions';

export class Body{
    public type;

    private position;
    private angle;
    private volume;
    private density = 1;
    private restitution = 1;//bounciness
    private friction = 1;
    private mass; //=volume * density
    private inverseMass;
    private velocity = [0,0];
    private acceleration = [0,0];
    private angularVelocity;
    private torque;

    private appliedForce = [0, 0];

    constructor(public id){
        this.init();
    }

    update(){
        this.velocity = vec.multiply(this.friction, 
                            vec.add(this.velocity, 
                                vec.multiply(this.inverseMass, this.appliedForce)));
        this.move();
        this.appliedForce = [0,0];
    }

    init(){
        this.volume = this.getVolume();
        this.mass = this.volume * this.density;
        this.inverseMass = 1/this.mass;
        this.type = ('' + this.constructor).split(' ')[1].split(/[\(\{]/)[0].toLowerCase();
    }

    applyForce(f){
        this.appliedForce = vec.add(this.appliedForce, f);
    }
    move(){
        this.position = vec.add(this.position, this.velocity);
    }
    getBoundingBox(){}
    getShape(){}
    getVolume(){
        return 1;
    }

}