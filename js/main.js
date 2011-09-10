
require(["pseudo3D"],function (pseudo3D){
  
  // Array grid which is translated to into starting 
  // positions of the points and thus to some object.
  var grid3D =
	[
	  [ //Zlayer -2
	  [1,0,0,0,0,0,1],
	  [0,1,0,0,0,1,0],
	  [0,0,0,0,0,0,0],
	  [0,0,0,0,0,0,0],
	  [0,0,0,0,0,0,0],
	  [0,1,0,0,0,1,0],
	  [1,0,0,0,0,0,1]
	  ],
	  [//Zlayer -1
	  [0,0,0,0,0,0,0],
	  [0,1,0,0,0,1,0],
	  [0,0,1,1,1,0,0],
	  [0,0,1,0,1,0,0],
	  [0,0,1,1,1,0,0],
	  [0,1,0,0,0,1,0],
	  [0,0,0,0,0,0,0]
	  ],
	  [//Zlayer 0
	  [0,0,0,0,0,0,0],
	  [0,0,0,0,0,0,0],
	  [0,0,1,1,1,0,0],
	  [0,0,1,1,1,0,0],
	  [0,0,1,1,1,0,0],
	  [0,0,0,0,0,0,0],
	  [0,0,0,0,0,0,0]
	  ],
	  [//Zlayer 1
	  [0,0,0,0,0,0,0],
	  [0,1,0,0,0,1,0],
	  [0,0,1,1,1,0,0],
	  [0,0,1,0,1,0,0],
	  [0,0,1,1,1,0,0],
	  [0,1,0,0,0,1,0],
	  [0,0,0,0,0,0,0]
	  ],
	  [//Zlayer 2
	  [1,0,0,0,0,0,1],
	  [0,1,0,0,0,1,0],
	  [0,0,0,0,0,0,0],
	  [0,0,0,0,0,0,0],
	  [0,0,0,0,0,0,0],
	  [0,1,0,0,0,1,0],
	  [1,0,0,0,0,0,1]
	  ]
	]
  
  
  
	
	window.onload = function () {
			
			var canvas = document.getElementById("main_canvas");
			var c3D = new pseudo3D.Context3D(canvas);	
			var grid = new pseudo3D.PointGrid(grid3D);	
			
			var angle = 0;
			
			var angleToRotateInOneStep = Math.PI/256;
			var timeFor180Degrees = 10 * 1000;
			var tomeForOneRotationStep = timeFor180Degrees / (Math.PI/(Math.PI/256));
			
			var rotate = function (){
				c3D.clear();
				c3D.drawPointGrid(grid,c3D.fill);
				grid.rotate(0,angleToRotateInOneStep,0,{x:pseudo3D.X00 + 50,y:pseudo3D.Y00,z:pseudo3D.Z00 - 50});
				angle = angle + angleToRotateInOneStep;
				
				if(angle <= (Math.PI + angleToRotateInOneStep)){
					setTimeout(rotate,20);
				}
			};
			rotate();
			
		};

});
