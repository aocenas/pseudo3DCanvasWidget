
require(["pseudo3D","data"],function (pseudo3D,data){
  
  // Array grid which is translated to into starting 
  // positions of the points and thus to some object.
	
	window.onload = function () {
			
			var canvas = document.getElementById("main_canvas");
			var c3D = new pseudo3D.Context3D(canvas);	
			var grid = new pseudo3D.PointGrid(data);	

			var angle = 0;
			
			var angleToRotateInOneStep = Math.PI/256;
			var timeFor180Degrees = 2 * 1000;
			var timeForOneRotationStep = timeFor180Degrees / (Math.PI/(Math.PI/256));
			
			var rotate = function (){
				c3D.clear();
				c3D.drawPointGrid(grid,c3D.fill);
				grid.rotate(0,angleToRotateInOneStep,0,{x:pseudo3D.X00 + 50,y:pseudo3D.Y00,z:pseudo3D.Z00 - 50});
				angle = angle + angleToRotateInOneStep;
				
				if(angle <= (2*Math.PI + angleToRotateInOneStep)){
					setTimeout(rotate,timeForOneRotationStep);
				}
			};
			rotate();
			
		};

});
