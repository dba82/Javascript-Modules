export function pointsOnGrid(opts){
    let nofr = opts.numberOfRows;
    let nofc = opts.numberOfColumns;
    let alt = opts.alternating || 1;
    let w = opts.width;
    let h = opts.height;
    let result = [];
    opts.xOffset = opts.xOffset || 0;
    opts.yOffset = opts.yOffset || 0;
    for (let row = 0; row < nofr; row++){
        for (let column = 0; column < nofc; column++){
                result.push([
                    ((row%alt) * (1/alt) * (w/nofc)) + opts.xOffset + (w/nofc)*column, 
                    opts.yOffset + (h/nofr)*row]);
            }
        }
        return result;
}
