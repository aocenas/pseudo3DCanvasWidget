/*
 * Color object. Just to wrap standard rgb(r,g,b) notation.
 */
define(function (){
	
	var module = {};
	
	module.Color = function (r,g,b){
		this.rgb = "rgb(" + r + "," + g + "," + b + ")";
	}
	
	return module.Color;
	
});