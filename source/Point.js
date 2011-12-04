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
		 * Function to rotate point(recalculate coordinates) around some other 
		 * point in space. It takes 3 angles for each axis(or beter planes as they
		 * are marked acording of the plane we are rotating on) and point to rotate
		 * around.
		 */
		rotate : function (xyAngle,xzAngle,yzAngle,centerPoint){
			if(!this.isSamePosition(centerPoint)){
				console.log("rotating point x,y,z = " + this.x + "," + this.y + "," + this.z);
				console.log("angle xy,xz,yz " + xyAngle/Math.PI + "PI," + 
										xzAngle/Math.PI + "PI," + yzAngle/Math.PI + 
										"PI, around x,y,z = " + centerPoint.x + "," +
										 centerPoint.y + "," + centerPoint.z);
				
				
				
				// 'this' needs to be maped, as it`s meaning changes in the folowing loop,
				// and adding it to the end of forEach function would not be very obvious
				var self = this;
				
				// we loop for each angle so we can rotate in 3 directions in one loop
				[[xyAngle,'x','y'],[xzAngle,'x','z'],[yzAngle,'y','z']]
					.filter(function (item){return item[0] !== 0;})
					.forEach(function(angle){
					
					console.log("rotating in plane " + angle[1] + angle[2] + " by " + angle[0]);
					
					// Calculate coordinates relative to the point, we are going rotate around.
					var relative = {x : self.x - centerPoint.x,
													y : self.y - centerPoint.y,
													z : self.z - centerPoint.z};
						
					// Calculating distance from center.
					var distanceFromCenter = Math.round(
						Math.sqrt(Math.pow(relative[angle[2]],2) +
							Math.pow(relative[angle[1]],2)
						)
					);
					
					// To correctly compute the angle we need to know into which quadrant
					// are we going to fall.
					var quadrant = relative[angle[1]] >= 0 ? 
						(relative[angle[2]] >= 0? 1 : 2) :
						(relative[angle[2]] >= 0 ? 4 : 3);

					var angleFromCenter = distanceFromCenter === 0 ? 0 : Math.asin(Math.abs(relative[angle[1]])/distanceFromCenter);

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
					
					// Adding angle to x,y,z
					self[angle[1]] = Math.round(((Math.sin(angle[0] + angleFromCenter) * distanceFromCenter) + centerPoint[angle[1]])*1000)/1000;
					self[angle[2]] = Math.round(((Math.cos(angle[0] + angleFromCenter) * distanceFromCenter) + centerPoint[angle[2]])*1000)/1000;
					
					console.log("after rotation x,y,z = " + self.x + "," + self.y + "," + self.z);
					
				});
			}
		},
		toString : function(){
			return 'x' + this.x + 'y' + this.y + 'z' + this.z; 
		},
		// Returns true if all coordinates are equal.
		isSamePosition : function(otherPoint){
			return this.x === otherPoint.x && this.y === otherPoint.y && this.z === otherPoint.z;
		}
	};
	
	return Point;
	
});