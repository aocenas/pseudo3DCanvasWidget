/*
 * 
 * Definition of grif of points that are going to be displayed on the canvas. Points are stored as points in space (not as points on canvas).
 * Initializing of grid is done from 3 dimensional array of 0 and 1 (1 means there is a point 0 means there isnt).
 * 
 */


var Pseudo3D = (function (module){
	
	
	/*
	 * Constructor method which takes a 3 dimensional array.
	 */
	module.PointGrid = function (mapGrid){
		this.mapGrid = mapGrid;
		this.points = [];
		
		for(var i = 0,lengthi = mapGrid.length; i < lengthi; i++){ //for Z layers or depth
		  for(var j = 0,lengthj = mapGrid[i].length; j < lengthj; j++){ //for Y lines or height
			for(var k = 0, lengthk = mapGrid[i][j].length; k < lengthk; k++){ //for X columns or width
			  
			  if(mapGrid[i][j][k] == 1){
				
				
				// Object defined by the mapGrid array should be in the center of the canvas
				// so some we need to calculate right coordinates
				
				var relativeXGrid = k - Math.floor(lengthk/2);
				var relativeYGrid = j - Math.floor(lengthj/2);
				var relativeZGrid = i - Math.floor(lengthi/2);
				  
				var x = (relativeXGrid * module.GRID_SPACING) + module.X00;
				var y = (relativeYGrid * module.GRID_SPACING) + module.Y00;
				var z = (relativeZGrid * module.GRID_SPACING) + module.Z00;
				
				this.points[this.points.length] = new module.Point(x,y,z,module.POINT_RADIUS,new module.Color(0,0,0));
				
			  }
			  
			}
		  }
		}
	};
	
	// Rotating of the whole grid/object. Actual position calculation is delegated to the Point object
	module.PointGrid.prototype = {
		rotate : function(xyAngle,xzAngle,yzAngle,centerPoint){
			
			this.points.forEach(function(point){
					point.rotate(xyAngle,xzAngle,yzAngle,centerPoint)
				});
			
			
		}
	};
	
	return module;
	
}(window.Pseudo3D || {}))