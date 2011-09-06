
var Pseudo3D = (function (module){
	
	module.PointGrid = function (mapGrid){
		this.mapGrid = mapGrid;
		this.points = [];
		
		for(var i = 0,lengthi = mapGrid.length; i < lengthi; i++){ //for Z layers
		  for(var j = 0,lengthj = mapGrid[i].length; j < lengthj; j++){ //for Y lines
			for(var k = 0, lengthk = mapGrid[i][j].length; k < lengthk; k++){ //for X columns
			  
			  if(mapGrid[i][j][k] == 1){
				
				
				// some calculation to make the object defined by the former grid centered
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
	
	module.PointGrid.prototype = {
		rotate : function(xyAngle,xzAngle,yzAngle,centerPoint){
			
			this.points.forEach(function(point){
					point.rotate(xyAngle,xzAngle,yzAngle,centerPoint)
				});
			
			
		}
	};
	
	return module;
	
}(window.Pseudo3D || {}))