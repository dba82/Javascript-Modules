import { vec } from '2d-vector-functions';
import { getBoundingboxForPoints } from 'db82-shape-analytics';
import { Body } from 'db82-physics-body';

export class Polygon extends Body{
    /** Punkte müssen im Uhrzeigersinn angegeben werden, damit die Normalen nach aussen zeigen.*/
    public position = [0,0]
    public points = [[-1, 1],[-4, -1],[-3, -3],[3,3],[-1, 1]];
    constructor(id , points?){
        super(id);
        if (points){
            if (points[points.length-1][0] != points[0][0] && points[points.length-1][1] != points[0][1]){
                points.push([...points[0]])
            }
            this.points = [...points];
        }
    }
    rotateAround(angle, anchor){}
    move(){this.moveBy(this['velocity'])}
    moveBy(vector){
        this.points = this.points.map( x => vec.add(x, vector));
        this.position = vec.add(this.position, vector);
        return this;
    }
    scale(factor){
        this.points = this.points.map( x => vec.multiply(factor, x));
        return this;        
    }
    getBoundingbox(){ return getBoundingboxForPoints(this.points);}
    getShape(){ return this.points;}
    getVolume(){ return 1}
    draw(dcan){
        dcan.polyline(this.points);
        dcan.ctx.fillStyle = 'white';
        dcan.fill();
    }
}