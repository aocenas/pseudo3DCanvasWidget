var Pseudo3D = {
	start : function(options,data){
		
		var canvas = document.getElementById(options.canvasId);
		var c3D = new pseudo3D.Context3D(canvas);
		var grid = new pseudo3D.PointGrid(data);
		var angle = 0;

		var rotate = function (){
			c3D.clear();
			c3D.drawPointGrid(grid,c3D.fill);
			grid.rotate(0,options.oneStepAngle,0,{x:this.globals.X00 + options.centerXOffset,
												  y:this.globals.pseudo3D.Y00,
												  z:this.globals.Z00 + options.centerZOffset});
			angle = angle + options.oneStepAngle;
				
			if(angle <= (2*Math.PI + options.oneStepAngle)){
				setTimeout(rotate,options.oneStepTime);
			}
		};
		rotate();
	}
}