window.onload = function () {
	
	var canvas = Pseudo3D("main_canvas");
	canvas.addModel([[[1,1,1]]])
		.rotateXY(Math.PI/2,{x : 200, y : 100 , z : 200})
		.addModel([[[1,0,0,0,0]]]).draw();
	 
	var count = 0;
	(function rotate(){
		canvas.rotateXZ(Math.PI/258,{x : 200, y : 100 , z : 200});
		if(count < 512){
			setTimeout(rotate,1);
		}
		count = count + 1;
	})();

	
};
