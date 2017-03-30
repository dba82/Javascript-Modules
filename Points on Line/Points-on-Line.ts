export function pointsOnLine(opt){
    opt.offSet = opt.offSet || 0;
    if (!opt.spacing){
        opt.equidistant = true;
    } 
    let step;
    let result = [];
    if (opt.equidistant){
        step = opt.lineLength/opt.numberOfPoints;
    }
    for (let i = 0; i < opt.numberOfPoints; i++){
        result.push(opt.offSet + i*step);
    }
    return result;
}