window.onload = function () {
	
	var canvas = Pseudo3D("main_canvas");
	canvas.addModel([[[1,1,1]]])
		.rotateXY(Math.PI/2,{x : 200, y : 100 , z : 200})
		.addModel([[[1,0,0,0,0]]]).draw();
	
	canvas.animate(function(){
		this.rotateXZ(Math.PI/64,{x : 200, y : 100 , z : 200});
		this.rotateXZ(Math.PI/64,{x : 200, y : 100 , z : 100});
	},64,0.1);
};
