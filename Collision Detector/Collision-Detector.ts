import { Grid } from 'db82-collision-detection-broad-phase';
import { CollisionTable } from 'db82-collision-table';

export class CollisionDetector{
    public grid;
    public table = new CollisionTable();
    public checked = {};

    constructor(canvasW, canvasH, public objects){
        this.grid = new Grid(canvasW, canvasH, 8,8);//die Zellengröße muss noch mindestens so groß wie das größte Objekt sein!
    }
    
    update(){
        this.grid.putObjectsOnGrid(this.objects).forEach( objs => this.table.checkCollisions(objs, this.checked));
        this.checked = {};
    }
}