var Pseudo3D = {};
require(['Context3D','PointGrid','globals'],function(Context3D,PointGrid,globals){

	Pseudo3D = {
		start : function(options,data){
			
			var canvas = document.getElementById(options.canvasId);
			var c3D = new Context3D(canvas);
			var grid = new PointGrid(data);
			var angle = 0;

			var rotate = function (){
				c3D.clear();
				c3D.drawPointGrid(grid,c3D.fill);
				grid.rotate(0,options.oneStepAngle,0,{x:globals.X00 + options.centerXOffset,
													  y:globals.Y00,
													  z:globals.Z00 + options.centerZOffset});
				angle = angle + options.oneStepAngle;
					
				if(angle <= (2*Math.PI + options.oneStepAngle)){
					setTimeout(rotate,options.oneStepTime);
				}
			};
			rotate();
		}
	}

});