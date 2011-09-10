/*
 * Pseudo3D package definition to alow defining require(["pseudo3D"])
 */
define(
["pseudo3D/Color","pseudo3D/Point","pseudo3D/PointGrid","pseudo3D/Context3D","pseudo3D/globals"],
		function (Color,Point,PointGrid,Context3D,globals){
			
			var pseudo3D = globals;
			pseudo3D.Color = Color;
			pseudo3D.Poit = Point;
			pseudo3D.PointGrid = PointGrid;
			pseudo3D.Context3D = Context3D;
			
			
			return pseudo3D;
			
		}
);