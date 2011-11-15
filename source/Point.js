
/*
 * Point object do define some point in space with coordinates and diameter.
 */

define(['console'],function (console){
	
	/*
	 * Constructor. Takes coordinates, diameter and color as parameters.
	 */
	var Point = function (x,y,z,diameter, color){
		this.x = x;
		this.y = y;
		this.z = z;
		this.diameter = diameter;
		this.color = color;
	};
	Point.prototype = {
		
		/*
		 * Function to rotate point(recalculate coordinates) around some other point in space.
		 * It takes 3 angles for each axis(or beter planes as they are marked acording of the plane we are rotating on) 
		 * and point to rotate around.
		 */
		rotate : function (xyAngle,xzAngle,yzAngle,centerPoint){
			
			
			console.log("rotating point x,y,z = " + this.x + "," + this.y + "," + this.z);
			console.log("angle xy,xz,yz " + xyAngle/Math.PI + "PI," + xzAngle/Math.PI + "PI," + yzAngle/Math.PI + "PI, around x,y,z = " 
							+ centerPoint.x + "," + centerPoint.y + "," + centerPoint.z);
			
			
			// Calculate coordinates relative to the point we are going rotate around.
			var centerRelativeX = this.x - centerPoint.x;
			var centerRelativeY = this.y - centerPoint.y;
			var centerRelativeZ = this.z - centerPoint.z;
			
			
			// Calculating distance from center but only on the XZ plane.
			var distanceFromCenterXZ = Math.round(
									  Math.sqrt(Math.pow(centerRelativeZ,2) +
												Math.pow(centerRelativeX,2)
												)
									  );
		
			// To correctly compute the angle we need to know into which quadrant are we going to fall.
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
			
			console.log("angleFromCenter = " + angleFromCenter/Math.PI + "PI");
			
			// Adding angle to x,y,z (we are turning it only on the horizontal XZ plane 
			// so we need to compute only x and z coordinates)
			this.x = (Math.sin(xzAngle + angleFromCenter) * distanceFromCenterXZ) + centerPoint.x;
			this.z = (Math.cos(xzAngle + angleFromCenter) * distanceFromCenterXZ) + centerPoint.z;
			
			console.log("after rotation x,y,z = " + this.x + "," + this.y + "," + this.z);
			
		}
	};
	
	return Point;
	
});