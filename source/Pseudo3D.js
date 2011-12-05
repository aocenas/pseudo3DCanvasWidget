/*
 * Definition of public API
 */
define(['Context3D','PointGrid','globals'],function(Context3D,PointGrid,globals){

	window.Pseudo3D = window.Pseudo3D || function (canvas){
		if(!canvas){
			return null;
		}
		if(typeof canvas === 'string'){
			canvas = document.getElementById(canvas);
		}
		var c3d = new Context3D(canvas);
		
		// Return only public API
		return {
			draw : function(){
				c3d.draw();
				return this;
			},
			clear : function(){
				c3d.clear();
				return this;
			},
			rotate : function(options, rotateOnly){
				c3d.rotate(options, rotateOnly);
				return this;
			},
			//Specific rotate functions
			rotateXY : function(angle, center){
				c3d.rotate({xy : angle, xz : 0, yz : 0, center : center}, false);
				return this;
			},
			rotateXZ : function(angle, center){
				c3d.rotate({xy : 0, xz : angle, yz : 0, center : center}, false);
				return this;
			},
			rotateYZ : function(angle, center){
				c3d.rotate({xy : 0, xz : 0, yz : angle, center : center}, false);
				return this;
			},
			clearModel : function(){
				c3d.clearModel();
				return this;
			},
			addModel : function(model){
				c3d.addModel(model);
				return this;
			},
			animate : function(func,cycles,interval){
				c3d.animate(func,cycles,interval,this);
			}
		};
		
	};
	return window.Pseudo3D;

});