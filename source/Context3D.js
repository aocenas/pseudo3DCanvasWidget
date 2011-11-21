/*
 * Wrapper object for canvas and some variables controling the look and feel of the display.
 * 
 */
define(['console','globals'],function (console, globals){
	
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