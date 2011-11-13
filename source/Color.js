/*
 * Color object. Just to wrap standard rgb(r,g,b) notation.
 */
pseudo3D.Color = (function (){

	var Color = function (r,g,b){
		this.rgb = "rgb(" + r + "," + g + "," + b + ")";
	}
	
	return Color;
	
})();