import { boundingboxOverlapsBoundingbox } from 'db82-shape-overlap-functions';

export class Grid{ 
    //for the idea behind such a grid cf. http://stackoverflow.com/questions/1616448/broad-phase-collision-detection-methods
    public rowBorders = [];
    public columnBorders = [];
    public cells = [];

    constructor(public width, public height, public nOfRows, public nOfColumns){
        /**
         * TODO:
         * ich glaube die width und height müssen/sollten nicht in die rowborders/columnBorders
         * und die row und columnbordersarrays brauche ich auch nicht, ich kann die zellen direkt
         * in einer geschachtelten schleife generieren
         */
        for (let r = 0; r < this.nOfRows; r+=1){
            this.rowBorders.push(r * this.height/this.nOfRows);
        }
        this.rowBorders.push(this.height);
        for (let c = 0; c < this.nOfColumns; c +=1){
            this.columnBorders.push(c * this.width/this.nOfColumns);
        }
        this.columnBorders.push(this.width);
        let cellHeight = this.height/nOfRows;
        let cellWidth = this.width/nOfColumns;
        this.columnBorders.forEach( x => {
            this.rowBorders.forEach(y => {
                this.cells.push([x, y, cellWidth, cellHeight])
            })
        })        
    }

    putObjectsOnGrid(objects){
        /**
         * TODO:
         * hier kann noch optimiert werden
         * anfangs die Objekte nach der linken oberen Ecke (x-Wert) ihrer boundingbox sortieren
         * dann können wunderbar welche ausgeschlossen werden (vllt. das dann sogar auch mit ner binary-search oder so)
         */
        return this.cells.map( 
            cell => objects.filter(
                o => boundingboxOverlapsBoundingbox(o.getBoundingbox(), cell)
            )
        )
    }
}