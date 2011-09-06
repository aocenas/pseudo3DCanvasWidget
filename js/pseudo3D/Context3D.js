
var Pseudo3D = (function (module){
	
	//some variables to set the dimensions of points and grid
	module.POINT_RADIUS = 5;
	module.GRID_SPACING = 15;

	module.CONTEXT_WIDTH = 400;
	module.CONTEXT_HEIGHT = 200;
	
	module.CONTEXT_DISTANCE = 200;
	
	//position of the center relative to actual canvas 
	module.Z00 = 200;  
	module.X00 = 200;
	module.Y00 = 100;
	
	
	module.Context3D = function (canvas){
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
	};
  
	module.Context3D.prototype = {
		drawPoint : function(point){
			console.log("Drawing point x = " + point.x + ", y = " + point.y + ", z = " + point.z + ", radius = " + point.diameter);
			
			var paddingX = (module.CONTEXT_WIDTH - ((module.CONTEXT_WIDTH/point.z) * module.CONTEXT_DISTANCE))/2;
			var paddingY = (module.CONTEXT_HEIGHT - ((module.CONTEXT_HEIGHT/point.z) * module.CONTEXT_DISTANCE))/2;
			
			var posX = ((point.x/point.z) * module.CONTEXT_DISTANCE) + paddingX;
			var posY = ((point.y/point.z) * module.CONTEXT_DISTANCE) + paddingY;
			var radius = (point.diameter/point.z) * module.CONTEXT_DISTANCE;
			
			console.log("Drawing to posX = " + posX + ", posY = " + posY + ", radius = " + radius);
			
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
	drawPointGrid : function (pointGrid,func){
		this.beginPath();
		pointGrid.points.forEach(function(point){this.drawPoint(point)},this);
		func.apply(this);
	},
	clear : function (){
		this.canvas.width = this.canvas.width;
	}
  };
  
  return module;
	
}(window.Pseudo3D || {}))