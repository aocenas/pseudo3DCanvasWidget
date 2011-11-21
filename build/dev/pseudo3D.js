(function () {
/**
define("../lib/almond", function(){});



define('console',[],function (){
	
	if (!window.console) console = {};
	console.log = console.log || function(){};
	  
	// Comment this line if you want console logs.
	console.log = function(){};
	  
	return console;
});

/*
 * Point object do define some point in space with coordinates and diameter.
 */

define('Point',['console'],function (console){
	
	/*
	 * Constructor. Takes coordinates, diameter and color as parameters.
	 */
	var Point = function (x,y,z,diameter, color){
		this.x = x;
		this.y = y;
		this.z = z;
		this.diameter = diameter;
		this.color = color;
	};
	Point.prototype = {
		
		/*
		 * Function to rotate point(recalculate coordinates) around some other point in space.
		 * It takes 3 angles for each axis(or beter planes as they are marked acording of the plane we are rotating on) 
		 * and point to rotate around.
		 */
		rotate : function (xyAngle,xzAngle,yzAngle,centerPoint){
			
			
			console.log("rotating point x,y,z = " + this.x + "," + this.y + "," + this.z);
			console.log("angle xy,xz,yz " + xyAngle/Math.PI + "PI," + xzAngle/Math.PI + "PI," + yzAngle/Math.PI + "PI, around x,y,z = " 
							+ centerPoint.x + "," + centerPoint.y + "," + centerPoint.z);
			
			
			// Calculate coordinates relative to the point we are going rotate around.
			var centerRelativeX = this.x - centerPoint.x;
			var centerRelativeY = this.y - centerPoint.y;
			var centerRelativeZ = this.z - centerPoint.z;
			
			
			// Calculating distance from center but only on the XZ plane.
			var distanceFromCenterXZ = Math.round(
									  Math.sqrt(Math.pow(centerRelativeZ,2) +
												Math.pow(centerRelativeX,2)
												)
									  );
		
			// To correctly compute the angle we need to know into which quadrant are we going to fall.
			var quadrant = centerRelativeX >= 0 ? (centerRelativeZ >= 0? 1 : 2) : (centerRelativeZ >= 0 ? 4 : 3);

			var angleFromCenter = distanceFromCenterXZ === 0 ? 0 : Math.asin(Math.abs(centerRelativeX)/distanceFromCenterXZ);

			switch(quadrant){
				case 1: break;
				case 2:	angleFromCenter = Math.PI - angleFromCenter;
						break;
				case 3:	angleFromCenter = Math.PI + angleFromCenter;
						break;
				case 4:	angleFromCenter = Math.PI*2 - angleFromCenter;
						break;
			}
			
			console.log("angleFromCenter = " + angleFromCenter/Math.PI + "PI");
			
			// Adding angle to x,y,z (we are turning it only on the horizontal XZ plane 
			// so we need to compute only x and z coordinates)
			this.x = (Math.sin(xzAngle + angleFromCenter) * distanceFromCenterXZ) + centerPoint.x;
			this.z = (Math.cos(xzAngle + angleFromCenter) * distanceFromCenterXZ) + centerPoint.z;
			
			console.log("after rotation x,y,z = " + this.x + "," + this.y + "," + this.z);
			
		}
	};
	
	return Point;
	
});
/*
 * Color object. Just to wrap standard rgb(r,g,b) notation.
 */
define('Color',[],function(){
	return function (r,g,b){
		this.rgb = "rgb(" + r + "," + g + "," + b + ")";
	};
});
/*
 * Definition of variables global to pseudo3D module
 */
define('globals',[],function (){
	
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
});
/*
 * Wrapper object for canvas and some variables controling the look and feel of the display.
 * 
 */
define('Context3D',['console','globals'],function (console, globals){
	
	/*
	 * Initialization of the wrapper with the canvas element.
	 */
	var Context3D = function (canvas){
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
	};
 
	Context3D.prototype = {
		
		/*
		 * Drawing point on tha canvas. Actual position on the canvas and radius is computed with 
		 * consideration of the Z coordinate of the drawn point. 
		 */
		drawPoint : function(point){
			console.log("Drawing point x = " + point.x + ", y = " + point.y + ", z = " + point.z + ", radius = " + point.diameter);
			
			// Pading of the layer. This means the diference between dimensions of the canvas and 
			// dimensions of the suposed canvas with given depth (z coordinate), so that we can 
			// move the point to the center, even after position recalculation.
			var paddingX = (globals.CONTEXT_WIDTH - ((globals.CONTEXT_WIDTH/point.z) * globals.CONTEXT_DISTANCE))/2;
			var paddingY = (globals.CONTEXT_HEIGHT - ((globals.CONTEXT_HEIGHT/point.z) * globals.CONTEXT_DISTANCE))/2;
			
			// Calculating actual position of the point on the canvas according to its depth.
			var posX = ((point.x/point.z) * globals.CONTEXT_DISTANCE) + paddingX;
			var posY = ((point.y/point.z) * globals.CONTEXT_DISTANCE) + paddingY;
			var radius = (point.diameter/point.z) * globals.CONTEXT_DISTANCE;
			
			console.log("Drawing to posX = " + posX + ", posY = " + posY + ", radius = " + radius);
			
			// Draw the point only if the point does not cross borders of the canvas. 
			if(radius > 0 && posX-radius > 0 && posX+radius < globals.CONTEXT_WIDTH && posY-radius > 0 && posY+radius < globals.CONTEXT_HEIGHT ){
				this.context.fillStyle = point.rgb;
				this.context.moveTo(posX + radius,posY);
				this.context.arc(posX,posY,radius,0,Math.PI*2,false);
			}
		},
	fill : function(){
	  this.context.fill();
	},
	stroke : function(){
	  this.context.stroke();
	},
	beginPath : function(){
	  this.context.beginPath();
	},
	/*
	 * Drawing each point of the grid separately. It takes grid of points and function which 
	 * will be caled after the drawing(that means fill or stroke method)
	 */
	drawPointGrid : function (pointGrid,func){
		this.beginPath();
		pointGrid.points.forEach(function(point){this.drawPoint(point)},this);
		try{
			func.apply(this);
		}catch( e){
			// Fail over.
			this.stroke();
		}
	},
	clear : function (){
		this.canvas.width = this.canvas.width;
	}
  };
  
  return Context3D;
	
});
/*
 * 
 * Definition of grif of points that are going to be displayed on the canvas. Points are stored as points in space (not as points on canvas).
 * Initializing of grid is done from 3 dimensional array of 0 and 1 (1 means there is a point 0 means there isnt).
 * 
 */


define('PointGrid',['console', 'Point', 'globals','Color'],function (console, Point, globals,Color){

	/*
	 * Constructor method which takes a 3 dimensional array.
	 */
	PointGrid = function (mapGrid){
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
				  
				var x = (relativeXGrid * globals.GRID_SPACING) + globals.X00;
				var y = (relativeYGrid * globals.GRID_SPACING) + globals.Y00;
				var z = (relativeZGrid * globals.GRID_SPACING) + globals.Z00;
				
				this.points[this.points.length] = new Point(x,y,z,globals.POINT_RADIUS,new Color(0,0,0));
				
			  }
			  
			}
		  }
		}
	};
	
	// Rotating of the whole grid/object. Actual position calculation is delegated to the Point object
	PointGrid.prototype = {
		rotate : function(xyAngle,xzAngle,yzAngle,centerPoint){
			
			this.points.forEach(function(point){
					point.rotate(xyAngle,xzAngle,yzAngle,centerPoint)
				});
			
			
		}
	};
	
	return PointGrid;
	
});
define('Pseudo3D',['Context3D','PointGrid','globals'],function(Context3D,PointGrid,globals){

	return {
		start : function(options,data){
			
			var canvas = document.getElementById(options.canvasId);
			var c3D = new Context3D(canvas);
			var grid = new PointGrid(data);
			var angle = 0;

			var rotate = function (){
				c3D.clear();
				c3D.drawPointGrid(grid,c3D.fill);
				grid.rotate(0,options.oneStepAngle,0,{x:globals.X00 + options.centerXOffset,
													  y:globals.Y00,
													  z:globals.Z00 + options.centerZOffset});
				angle = angle + options.oneStepAngle;
					
				if(angle <= (2*Math.PI + options.oneStepAngle)){
					setTimeout(rotate,options.oneStepTime);
				}
			};
			rotate();
		}
	}

});
if(window.Pseudo3D){
	alert('Pseudo3D already defined');
}else{
	require(['Pseudo3D'],function(Pseudo3D){
		window.Pseudo3D = Pseudo3D;
	},null,true);
};
define("main", function(){});
}());