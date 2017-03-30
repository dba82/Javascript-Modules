import { vec } from '2d-vector-functions';

export function arrow(ctx, start, tip, tipoptions?){
  if (!this.drawing){
  	ctx.beginPath();
		this.drawing = true;
  }
  let tipheight = tipoptions.height || 10;
  let tipwidth = tipoptions.width || 10;
  let v1 = vec.subtract(tip, start);
  let v = vec.add(start, v1)
  let w = vec.direction(v1);
  let wm = vec.multiply(-tipheight, w);
  let ww = vec.add(v, wm);
  let www = vec.normal(v1);
  let z = vec.add(vec.multiply(tipwidth*.5, vec.direction(www)), ww);
  let u = vec.add(vec.multiply(-tipwidth*.5, vec.direction(www)), ww);
  ctx.moveTo(...start);
  ctx.lineTo(...ww);
  ctx.lineTo(...z);
  ctx.lineTo(...tip);
  ctx.lineTo(...u);
  ctx.lineTo(...ww);
};