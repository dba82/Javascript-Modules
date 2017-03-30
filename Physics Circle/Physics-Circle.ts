import { getBoundingboxForCircle } from 'db82-shape-analytics';
import { Body } from 'db82-physics-body';

export class Circle extends Body{
    public color = 'purple';
    constructor(id, public position, public radius = 5){ super(id); this['init']();}
    getBoundingbox(){return getBoundingboxForCircle(this.position, this.radius)}
    getShape(){return {radius:this.radius, center: this.position}}
    getVolume(){return this.radius * this.radius * Math.PI;}
    draw(dcan){
        dcan.ctx.fillStyle = this.color;
        dcan.circle(this.position, this.radius);
        dcan.fill();        
    }
}