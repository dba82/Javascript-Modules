import { xMath } from 'xmath';

class VectorFunctions{

    add(v1 , v2 ){
	    return [v1[0]+v2[0], v1[1]+v2[1]]
    }

    multiply(s : number, v ){
	    return [s*v[0], s*v[1]]
    }

    subtract(v1 , v2 ){
	    return [v1[0]-v2[0], v1[1]-v2[1]]
    }

    dotProduct(v1 , v2 ){
	    return v1[0]*v2[0] + v1[1]*v2[1];
    }

    length(v ){//=norm
	    return Math.sqrt(v[0]*v[0] + v[1]*v[1])
    }

    distance(v1 , v2 ){
	    return Math.sqrt((v1[0]-v2[0])*(v1[0]-v2[0]) + (v1[1]-v2[1])*(v1[1]-v2[1]))
    }

    direction(v ){//=normalize
	    if (v[0] === 0 && v[1] === 0) return v;
	    return [v[0]/Math.sqrt(v[0]*v[0] + v[1]*v[1]), v[1]/Math.sqrt(v[0]*v[0] + v[1]*v[1])];
    };

    rotate2d(v , t : number){
	    return [v[0] * Math.cos(t) - v[1] * Math.sin(t),
					v[0] * Math.sin(t) + v[1] * Math.cos(t)];
    }

    orthonormals(v ){
	    let w;
	    if (v[0] === 0 && v[1] === 0) return v;

    	w = [(64 * -v[1] / v[0]), 64];
        w = [v[0]/Math.sqrt(w[0]*w[0] + w[1]*w[1]), w[1]/Math.sqrt(w[0]*w[0] + w[1]*w[1])]
        return [w, [-w[0], -w[1]]];
    }

    modulo(v : number, nVector ){
        return [xMath.modulo(v[0],nVector[0]),xMath.modulo(v[1],nVector[1])]
    }

    mirror(v, N){
        let s = (N[0]*v[0] + N[1]*v[1]) / (N[0]*N[0] + N[1]*N[1]);
        return [ - v[0] + 2*s*N[0], - v[1] + 2*s*N[1]]
    }
    
    normal(v){
        return [-v[1], v[0]];
    }

    reflect(v, w){
        let o = this.normal(w);
        return this.mirror(this.inverse(v), o);
    }

    inverse(v){
        return [-v[0], -v[1]];
    }

    withLength(l, v){
        return this.multiply(l, this.direction(v));
    }
    normalWithLength(l, v){
        return this.withLength(l, [-v[1], v[0]])
    }
}

export let vec = new VectorFunctions();