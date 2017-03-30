import { vec } from '2d-vector-functions';
/*
  Arrow = [ArrowFoot, ArrowTip] (Ankerpunkt und Pfeilspitzenpunkt)
*/

export function orthogonal2d(arrow, length){
		length = length || 1;
		return vec.orthonormals(vec.subtract(arrow[1], arrow[0]))
			.map(x => vec.add(arrow[0], vec.multiply(length,x)))
}
