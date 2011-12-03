


window.onload = function () {
	
	Pseudo3D("main_canvas").addModel([[[1,1,1]]])
		.rotateXY(Math.PI/2,{x : 200, y : 100 , z : 200})
		.addModel([[[1,0,0]]]).draw();
			
};
