/*
 * Definition of variables global to pseudo3D module
 */
pseudo3D.globals = (function (){
	
	var pointRadius = 5;
	var gridSpacing = 15;
	var contextWidth = 400;
	var contextHeight = 200;
	var contextDistance = 200;
	var z00 = 200;
	var x00 = contextWidth/2;
	var y00 = contextHeight/2;
	
	return{
		// How big will the point appear.
		POINT_RADIUS : pointRadius,
		// Spacing between points on the grid.
		GRID_SPACING : gridSpacing,
		
		// Dimensions of the actual HTML canvas.
		CONTEXT_WIDTH : contextWidth,
		CONTEXT_HEIGHT : contextHeight,
		
		// Should be distance of the canvas for same calculations but 
		// does not work as intended(bigger the number, closer/bigger the object seems to be) 
		CONTEXT_DISTANCE : contextDistance,
		
		// Center of the canvas.
		Z00 : z00,  
		X00 : x00,
		Y00 : y00
	}
})();