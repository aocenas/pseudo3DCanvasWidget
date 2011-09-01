
/*
 Made by Andrej Ocenas.
 Feel free to do what you want with this code, just do not expect it to do anything.
*/

(function (){
  
  if (!window.console) console = {};
  console.log = console.log || function(){};
  
  window.Pseudo3D = window.Pseudo3D || {};
  var p3D = window.Pseudo3D;
  
  //some variables to set the dimensions of points and grid
  p3D.POINT_RADIUS = 5;
  p3D.GRID_PADDING = 20;
  
  p3D.CONTEXT_WIDTH = 400;
  p3D.CONTEXT_HEIGHT = 200;
  
  //depth is the same as grid_padding TODO: change the name of grid_padding
  //p3D.NEXT_LAYER_DEPTH = 20;
  
  
  //position of the center relative to actual canvas 
  p3D.Z00 = 200;  
  p3D.X00 = 200;
  p3D.Y00 = 100;
  
  //point object START
  p3D.Point = function (x,y,diameter, color){
	this.x = x;
	this.y = y;
	this.diameter = diameter;
	this.color = color;
  };
  //point object END
  
  //pointGrid ocject START
  p3D.PointGrid = function (mapGrid){
	this.mapGrid = mapGrid;
	this.points = [];
	
	for(var i = 0,lengthi = grid.length; i < lengthi; i++){ //for Z layers
	  for(var j = 0,lengthj = grid[i].length; j < lengthj; j++){ //for Y lines
		for(var k = 0, lengthk = grid[i][j].length; k < lengthk; k++){ //for X columns
		  
		  if(grid[i][j][k] == 1){
			
			
			
		  }
		  
		}
	  }
	}
	
	
  };
  //pointGrid object END
  
  //color object START
  p3D.Color = function (r,g,b){
	this.rgb = "rgb(" + r + "," + g + "," + b + ")";
  }
  //color object END
  
  
  //context object START
  p3D.Context3D = function (context){
	this.context = context;
  };
  
  p3D.Context3D.prototype = {
	drawPoint : function(point){
	  console.log("Drawing point x = " + point.x + ", y = " + point.y + ", radius = " + point.diameter);
	  this.context.fillStyle = point.rgb;
	  this.context.moveTo(point.x + point.diameter,point.y);
	  this.context.arc(point.x,point.y,point.diameter,0,Math.PI*2,false);
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
	drawGrid : function(grid, xzAngle, yzAngle){
	  this.beginPath();
	  for(var i = 0,lengthi = grid.length; i < lengthi; i++){ //for Z layers
		for(var j = 0,lengthj = grid[i].length; j < lengthj; j++){ //for Y lines
		  for(var k = 0, lengthk = grid[i][j].length; k < lengthk; k++){ //for X columns
			
			console.log("Processing grid i = " + i + ", j = " + j + ", k = " + k + ", value = " + grid[i][j]);
			
			if(grid[i][j][k] == 1){
			  
			  var relativeXGrid = k - Math.floor(lengthk/2);
			  var relativeYGrid = j - Math.floor(lengthj/2);
			  var relativeZGrid = i - Math.floor(lengthi/2);
			  
			  /*var fromCenter = Math.sqrt((Math.pow(relativeZGrid * p3D.NEXT_LAYER_DEPTH,2) +
								Math.pow(relativeXGrid * p3D.GRID_PADDING,2)) +
								Math.pow(relativeYGrid * p3D.GRID_PADDING,2));*/
			  
			  var x = relativeXGrid * p3D.GRID_PADDING;
			  var y = relativeYGrid * p3D.GRID_PADDING;
			  var z = relativeZGrid * p3D.GRID_PADDING;
			  
			  console.log("Point x = " + x + ", y = " + y + ", z = " + z);
			  
			  var fromCenter = Math.round(
										  Math.sqrt(Math.pow(z,2) +
													Math.pow(x,2)
													)
										  );
			  
			  
			  var quadrant = x >= 0 ? (z >= 0? 1 : 2) : (z >= 0 ? 4 : 3);
			  //var angleQuadrant = (Math.PI/2)* (qadrant - 1);
			  
			  var angleFromCenter = fromCenter == 0 ? 0 : Math.asin(Math.abs(x)/fromCenter);
			  
			  switch(quadrant){
				case 1: break;
				case 2:	angleFromCenter = Math.PI - angleFromCenter;
						break;
				case 3:	angleFromCenter = Math.PI + angleFromCenter;
						break;
				case 4:	angleFromCenter = Math.PI*2 - angleFromCenter;
						break;
			  }
			  
			  console.log("angleFromCenter = " + angleFromCenter/Math.PI);
			  
			  
			  //adding angle to x,y,z
			  x = Math.round(Math.sin(xzAngle + angleFromCenter) * fromCenter);
			  z = Math.round(Math.cos(xzAngle + angleFromCenter) * fromCenter);
			  
			  
			  console.log("Point after angle  x = " + x + ", y = " + y + ", z = " + z);
			  
			  var realDepth = p3D.Z00 - z;
			  var radius = (p3D.POINT_RADIUS/realDepth) * p3D.Z00;
			  console.log(radius + " = (" + p3D.POINT_RADIUS + ")/" + realDepth + "*" + p3D.Z00);
			  
			  var relativeX = Math.round((x/realDepth) * p3D.Z00);
			  var relativeY = Math.round((y/realDepth) * p3D.Z00);
			  
			  this.drawPoint(new p3D.Point(
											relativeX + p3D.X00,
											relativeY + p3D.Y00,
											radius,
											new p3D.Color(0,0,0)
										  )
							)
			}
		  }
		}
	  }
	  this.stroke();
	},
	createPointGrid : function (mappingGrid){
	  
	}
  };
  //context object END
  
  //array grid which is translated to into starting positions of the points.
  p3D.grid3D =
	[
	  [ //Zlayer -2
	  [0,1,0,0,0,1,0],
	  [1,1,1,0,1,1,1],
	  [1,1,1,1,1,1,1],
	  [0,1,1,1,1,1,0],
	  [0,0,1,1,1,0,0],
	  [0,0,0,1,0,0,0],
	  [0,0,0,0,0,0,0]
	  ],
	  [//Zlayer -1
	  [0,1,0,0,0,1,0],
	  [1,1,1,0,1,1,1],
	  [1,1,1,1,1,1,1],
	  [0,1,1,1,1,1,0],
	  [0,0,1,1,1,0,0],
	  [0,0,0,1,0,0,0],
	  [0,0,0,0,0,0,0]
	  ],
	  [//Zlayer 0
	  [0,1,0,0,0,1,0],
	  [1,1,1,0,1,1,1],
	  [1,1,1,1,1,1,1],
	  [0,1,1,1,1,1,0],
	  [0,0,1,1,1,0,0],
	  [0,0,0,1,0,0,0],
	  [0,0,0,0,0,0,0]
	  ],
	  [//Zlayer 1
	  [0,1,0,0,0,1,0],
	  [1,1,1,0,1,1,1],
	  [1,1,1,1,1,1,1],
	  [0,1,1,1,1,1,0],
	  [0,0,1,1,1,0,0],
	  [0,0,0,1,0,0,0],
	  [0,0,0,0,0,0,0]
	  ],
	  [//Zlayer 2
	  [0,1,0,0,0,1,0],
	  [1,1,1,0,1,1,1],
	  [1,1,1,1,1,1,1],
	  [0,1,1,1,1,1,0],
	  [0,0,1,1,1,0,0],
	  [0,0,0,1,0,0,0],
	  [0,0,0,0,0,0,0]
	  ]
	]
  
  
  
  
  window.onload = function(){
	var canvas = document.getElementById("main_canvas");
	var context = canvas.getContext("2d");
	var c3D = new p3D.Context3D(context);
	/*
	c3D.drawPoint(new p3D.Point(
								  10,
								  10,
								  p3D.POINT_RADIUS,
								  new p3D.Color(0,0,0)
								)
				 );
	
	c3D.drawPoint(new p3D.Point(
								  20,
								  10,
								  p3D.POINT_RADIUS,
								  new p3D.Color(0,0,0)
								)
				 );
	*/
	
	c3D.drawGrid(p3D.grid3D,(Math.PI/2), 0)
	
	/*
	//this code would make some rotation animation
	
	var ang = 0;
	
	window.redraw = function redraw(){
	  canvas.width = canvas.width;
	  c3D.drawGrid(p3D.grid3D,ang , 0);
	  if(ang < Math.PI*2){
		ang = ang + Math.PI/64;
		setTimeout('redraw()', 500);
	  }
	  
	};
	redraw();*/
	
  };

})();
