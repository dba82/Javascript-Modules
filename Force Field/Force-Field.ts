import { vec } from '2d-vector-functions';

export class RadialForcefield{
    constructor(public position, public strength, public reach){}

    applyToBodies(bodies){
        this.getBodiesInReach(bodies).forEach(this.applyToBody.bind(this))
    }

    getBodiesInReach(bodies){
        return bodies.filter( b => vec.distance(this.position, b.position) < this.reach)
    }

    applyToBody(b){
        let dir = vec.direction(vec.subtract(this.position, b.position))
        let d =  vec.distance(this.position, b.position);
        b.applyForce(vec.multiply(this.strength /  d*d, dir));
    }
}