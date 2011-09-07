/*
 * Wrapper object for canvas and some variables controling the look and feel of the display.
 * 
 */

var Pseudo3D = (function (module){
	
	// How big will the point appear.
	module.POINT_RADIUS = 5;
	// Spacing between points on the grid.
	module.GRID_SPACING = 15;
	
	// Dimensions of the actual HTML canvas.
	module.CONTEXT_WIDTH = 400;
	module.CONTEXT_HEIGHT = 200;
	
	// Should be suposed distance of the canvas for same calculations but 
	// does not work as intended(bigger the number, closer/bigger the object seems to be) 
	module.CONTEXT_DISTANCE = 200;
	
	// Center of the canvas.
	module.Z00 = 200;  
	module.X00 = module.CONTEXT_WIDTH/2;
	module.Y00 = module.CONTEXT_HEIGHT/2;
	
	/*
	 * Initialization of the wrapper with the canvas element.
	 */
	module.Context3D = function (canvas){
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
	};
 
	module.Context3D.prototype = {
		
		/*
		 * Drawing point on tha canvas. Actual position on the canvas and radius is computed with 
		 * consideration of the Z coordinate of the drawn point. 
		 */
		drawPoint : function(point){
			console.log("Drawing point x = " + point.x + ", y = " + point.y + ", z = " + point.z + ", radius = " + point.diameter);
			
			// Pading of the layer. This means the diference between dimensions of the canvas and 
			// dimensions of the suposed canvas with given depth (z coordinate), so that we can 
			// move the point to the center, even after position recalculation.
			var paddingX = (module.CONTEXT_WIDTH - ((module.CONTEXT_WIDTH/point.z) * module.CONTEXT_DISTANCE))/2;
			var paddingY = (module.CONTEXT_HEIGHT - ((module.CONTEXT_HEIGHT/point.z) * module.CONTEXT_DISTANCE))/2;
			
			// Calculating actual position of the point on the canvas according to its depth.
			var posX = ((point.x/point.z) * module.CONTEXT_DISTANCE) + paddingX;
			var posY = ((point.y/point.z) * module.CONTEXT_DISTANCE) + paddingY;
			var radius = (point.diameter/point.z) * module.CONTEXT_DISTANCE;
			
			console.log("Drawing to posX = " + posX + ", posY = " + posY + ", radius = " + radius);
			
			// Draw the point only if the point does not cross borders of the canvas. 
			if(radius > 0 && posX-radius > 0 && posX+radius < module.CONTEXT_WIDTH && posY-radius > 0 && posY+radius < module.CONTEXT_HEIGHT ){
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
  
  return module;
	
}(window.Pseudo3D || {}))