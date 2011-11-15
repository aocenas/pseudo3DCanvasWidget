/*
 * Color object. Just to wrap standard rgb(r,g,b) notation.
 */
define(function(){
	return function (r,g,b){
		this.rgb = "rgb(" + r + "," + g + "," + b + ")";
	};
});