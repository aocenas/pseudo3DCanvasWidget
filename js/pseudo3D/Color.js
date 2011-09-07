/*
 * Color object. Just to wrap standard rgb(r,g,b) notation.
 */
var Pseudo3D = (function (module){
	
	module.Color = function (r,g,b){
		this.rgb = "rgb(" + r + "," + g + "," + b + ")";
	}
	
	return module;
	
}(window.Pseudo3D || {}))