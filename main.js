
/*
 Made by Andrej Ocenas.
 Feel free to do what you want with this code, just do not expect it to do anything.
*/

(function (){
  
  if (!window.console) console = {};
  console.log = console.log || function(){};
  
  // Comment this line if you want console logs.
  console.log = function(){};
  
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
  
  
  
	
	window.onload = function(){
		var canvas = document.getElementById("main_canvas");
		var c3D = new Pseudo3D.Context3D(canvas);	
		var grid = new Pseudo3D.PointGrid(grid3D);	
		
		/*
		 * Function to start the rotation animation.
		 */
		(function rotating() {
			
			var angle = 0;
			
			var angleToRotateInOneStep = Math.PI/256;
			var timeFor180Degrees = 10 * 1000;
			var tomeForOneRotationStep = timeFor180Degrees / (Math.PI/(Math.PI/256));
			
			var rotate = function (){
				c3D.clear();
				c3D.drawPointGrid(grid,c3D.fill);
				grid.rotate(0,angleToRotateInOneStep,0,{x:Pseudo3D.X00,y:Pseudo3D.Y00,z:Pseudo3D.Z00});
				angle = angle + angleToRotateInOneStep;
				
				if(angle <= (Math.PI + angleToRotateInOneStep)){
					setTimeout(rotate,20);
				}
			};
			rotate();
			
		}());
		
	
  };

})();
