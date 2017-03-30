/*
from: /Users/david_bassler/Dropbox/Programmieren Python, PHP, javascript/boxplot.html
*/
var Statistics = {
	half: function(arr, n){
		var len = arr.length
		if (len % 2 === 0){
			  return !n ? arr.slice(0, len/2 + 1) : arr.slice(len/2 + 1)
		} else {
			return !n ? arr.slice(0, Math.ceil(len/2)) : arr.slice(Math.ceil(len/2))
		}

	},
	median: function(arr){
		var len = arr.length
		if (len % 2 === 0){
			return (arr[len/2] + arr[len/2 + 1])/ 2
		} else {
			return arr[Math.ceil(len/2)]
		}
	},
	quartile: function(arr, n){
		switch (n){
			case 0: return Math.min.apply(Math, arr);
			case 1: return Statistics.median(Statistics.half(arr))
			case 2: return Statistics.median(arr)
			case 3: return Statistics.median(Statistics.half(arr, 1))
			case 4: return Math.max.apply(Math, arr);
		}
	},
	percentage: function(arr, criterion){
		return (arr.filter(criterion).length/arr.length)*100
	},
	average: function(arr){
		return arr.reduce(function(a,b){
			return a+b
		})/arr.length
		},
	variance: function(arr){
		return arr.map(function(x){
								return Math.pow(x - Statistics.average(arr), 2)})
					 		.reduce(function(a,b){
						 		return a+b})/arr.length
		},
	standarddeviation: function(arr){
		return Math.sqrt(Statistics.variance(arr))
		}
}
