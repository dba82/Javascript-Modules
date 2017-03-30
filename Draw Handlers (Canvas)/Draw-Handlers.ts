import * as can from 'db82-canvas-shapes';
import { vec } from '2d-vector-functions';
import * as arrow from 'db82-arrow-math';
import * as _ from 'lodash';

export function protectContext(ctx, func){
	return function(){
		ctx.save();
		func().apply(this, _.toArray(arguments));
		ct.restore();
	}
}

export function make(ctxOrCanvasElm, colorfunction, func, thisObject){
	var ctx;
	
	ctx = ( ctxOrCanvasElm instanceof HTMLCanvasElement)
				? ctxOrCanvasElm.getContext('2d')
				: ctxOrCanvasElm;
	return protectContext(ctx, _.curry(func)(ctx, colorfunction)).bind(thisObject);
};

export function webby(ctx, colorfunction, lastPoint, previousPoint, points){
	this.maxDistance = this.maxDistance || 50;
	this.densityFactor = this.densityFactor || 1;
	this.reach = this.reach || 0;
	var self = this;

	ctx.strokeStyle = colorfunction(points.length);
	points.slice(self.reach,-1)
				.filter(function(x,i){ return i % self.densityFactor === 0})
				.filter(function(x){return vec.distance(lastPoint,x) < self.maxDistance})
				.forEach(function(x){can.line([lastPoint, x])});
}

export function boring(ctx, colorfunction, lastPoint, previousPoint, points){
		ctx.strokeStyle = colorfunction(points.length);
		ctx.beginPath();
		ctx.moveTo(previousPoint[0],previousPoint[1]);
		ctx.lineTo(lastPoint[0],lastPoint[1]);
		ctx.stroke();
}


export function fastTail(ctx, colorfunction, lastPoint, previousPoint, points){
		points.filter(function(x,i){return i % this.m === 0})
					.slice(-this.t,-2)
					.forEach(function(point,i){
						ctx.fillStyle = colorfunction(points.length, this.fillColor);//statt i points.length ist auch cool und ganza anders
						can.polygon(ctx)([lastPoint, point].concat(points.slice(points.length-this.t-i,points.length-1)))
						ctx.fill();
					})
}


export function orthos(ctx, colorfunction, lastPoint, previousPoint, points){
		//praktisch nur auf Tablet gut
		var o;

		ctx.strokeStyle = colorfunction(points.length);
		o = _(points
						 .slice(-4)
						 .reverse())
						 .chunk(2)
						 .value()
						 .filter(function(x){return x.length === 2})
						 .map(function(x){return arrow.orthogonalArrows(x[1], x[0], 30)}) //in Arrow Math Modul

		//Variante 1: o.forEach(function(x){can.polyline(ctx, x); ctx.stroke()})
		/*Variante 2: points
		.slice(-2)
		.reverse()
		.forEach(function(x){can.polyline(ctx, x); ctx.stroke()})
		*/

		can.polyline(ctx, o.map(function(x){return x[0]}))
		ctx.stroke()
		can.polyline(ctx, o.map(function(x){return x[1]}))
		ctx.stroke()
}
