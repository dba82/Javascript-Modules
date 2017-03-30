import { getBoundingboxForSegment } from 'db82-shape-analytics';
import { Body } from 'db82-physics-body';

export class Wall extends Body{
    constructor(id, public position, public end){super(id); this['init']();}
    getBoundingbox(){ return getBoundingboxForSegment([this.position, this.end])}
    getShape(){return [this.end, this.position]}
}