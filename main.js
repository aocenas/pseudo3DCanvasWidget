
/*
 Made by Andrej Ocenas.
 Feel free to do what you want with this code, just do not expect it to do anything.
*/

(function (){
  
  if (!window.console) console = {};
  console.log = console.log || function(){};
  
  //array grid which is translated to into starting positions of the points.
  var grid3D =
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
		var c3D = new Pseudo3D.Context3D(canvas);	
		var grid = new Pseudo3D.PointGrid(grid3D);	
		
		console.log(grid);
		//c3D.drawPointGrid(grid,c3D.stroke);
		
		var angle = 0;
		
		(function rotating() {
			
			c3D.clear();
			c3D.drawPointGrid(grid,c3D.stroke);
			angle = angle + Math.PI/64;
			grid.rotate(0,angle,0,{x:Pseudo3D.X00,y:Pseudo3D.Y00,z:Pseudo3D.Z00});
			if(angle < Math.PI){
				setTimeout(rotating,100);
			}
			
		}());
		
		
	
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
