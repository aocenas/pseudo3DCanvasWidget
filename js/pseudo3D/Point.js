
var Pseudo3D = (function (module){
	
	module.Point = function (x,y,z,diameter, color){
		this.x = x;
		this.y = y;
		this.z = z;
		this.diameter = diameter;
		this.color = color;
	};
	module.Point.prototype = {
		rotate : function (xyAngle,xzAngle,yzAngle,centerPoint){
			
			var centerRelativeX = this.x - centerPoint.x;
			var centerRelativeY = this.y - centerPoint.y;
			var centerRelativeZ = this.z - centerPoint.z;
			
			var distanceFromCenterXZ = Math.round(
									  Math.sqrt(Math.pow(centerRelativeZ,2) +
												Math.pow(centerRelativeX,2)
												)
									  );
		
			//to correctly compute the angle we need to know into which quadrant are we going to fall
			var quadrant = centerRelativeX >= 0 ? (centerRelativeZ >= 0? 1 : 2) : (centerRelativeZ >= 0 ? 4 : 3);

			var angleFromCenter = distanceFromCenterXZ === 0 ? 0 : Math.asin(Math.abs(centerRelativeX)/distanceFromCenterXZ);

			switch(quadrant){
				case 1: break;
				case 2:	angleFromCenter = Math.PI - angleFromCenter;
						break;
				case 3:	angleFromCenter = Math.PI + angleFromCenter;
						break;
				case 4:	angleFromCenter = Math.PI*2 - angleFromCenter;
						break;
			}
			
			//adding angle to x,y,z (we are turning it only on the horizontal plane so only x and z)
			this.x = Math.round(Math.sin(xzAngle + angleFromCenter) * distanceFromCenterXZ);
			this.z = Math.round(Math.cos(xzAngle + angleFromCenter) * distanceFromCenterXZ);
			
			
		}
	};
	
	return module;
	
}(window.Pseudo3D || {}))