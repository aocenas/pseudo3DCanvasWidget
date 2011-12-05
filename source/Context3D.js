/*
 * Wrapper object for canvas and some variables controling the look and feel of the display.
 */
define(['console','globals','Point', 'PointGrid'],function (console, globals, Point, PointGrid){
	
	/*
	 * Initialization of the wrapper with the canvas element.
	 */
	var Context3D = function (canvas){
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		
		// This array will hold all objects(only points or pointGrids for now).
		// As pointGrid and point has the same rotate method we will be able to
		// rotate all objects in this array.
		this.model = [];
	};
 
	Context3D.prototype = {
		
		/*
		 * Drawing point on tha canvas. Actual position on the canvas and radius is computed with 
		 * consideration of the Z coordinate of the drawn point. 
		 */
		drawPoint : function(point){
			if(point){
				console.log("Drawing point x = " + point.x + ", y = " + point.y + 
										", z = " + point.z + ", radius = " + point.diameter);
				
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
				if(radius > 0 && posX-radius > 0 && posX+radius < globals.CONTEXT_WIDTH && 
					posY-radius > 0 && posY+radius < globals.CONTEXT_HEIGHT ){
					
					this.context.fillStyle = point.rgb;
					this.context.moveTo(posX + radius,posY);
					this.context.arc(posX,posY,radius,0,Math.PI*2,false);
				}
			}
		},
    fill : function(){
      this.context.fill();
    },
    beginPath : function(){
      this.context.beginPath();
    },
    
    /*
     * Drawing each point of the grid separately. It takes grid of points and function which 
     * will be caled after the drawing(that means fill or stroke method)
     */
    drawPointGrid : function (pointGrid){
    	if(pointGrid){
	      pointGrid.points.forEach(function(point){this.drawPoint(point)},this);	
    	}
    },
    clear : function (){
      this.canvas.width = this.canvas.width;
    },
    clearModel : function (){
    	this.clear();
    	this.model = {};
    },
    
    /*
     * Part of the API, draws everything that is in the model to canvas
     */ 
    draw : function(){
    	this.clear();
    	if(this.model.length > 0){
	    	this.beginPath();
	    	// We draw each item to canvas;
	    	this.model.forEach(function (item){
	    		if(item instanceof Point){
	    			this.drawPoint(item);
	    		}else{
	    			this.drawPointGrid(item);
	    		}
	    	}, this);
	    	this.fill();
	    }
    },
    
    /*
     * Add new item to model (only Point or PointGrid)
     */
    addModel : function (item){
    	if(item){
    		// TODO change this or make PointGrid and Point visible outside
    		if(item instanceof Point){
    			this.model.push(item);
    		}else{
    			this.model.push(new PointGrid(item));
    		}
    	}
    },
    
    /*
     * Rotate all objects in the model, and option not to draw them automaticaly.
     */
    rotate : function (options, rotateOnly){
    	this.model.forEach(function (item){
    		item.rotate(options.xy, options.xz, options.yz, options.center);
    	});
    	if(!rotateOnly){
    		this.draw();
    	}
    },
    
    animate : function (func, cycles, interval,apiObject){

    	var count = 0;
			(function rotate(){
				func.apply(apiObject);
				if(count < cycles){
					setTimeout(rotate,interval);
				}
				count = count + 1;
			})();
			
    }
    
  };
  
  return Context3D;
	
});