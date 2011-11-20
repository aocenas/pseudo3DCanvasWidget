$(document).ready(function(){
  
  require({baseUrl:'../source/'},['Point', 'Color'],function (Point, Color){
  
    module('Tests for Point module')
    test("Test Point prerequisites", function() {
      ok(Point, "Point exists");
      var point = new Point(11, 12, 13, 10, new Color(255,254,253));
      equal(point.x, 11, "X coordinate is ok");
      equal(point.y, 12, "Y coordinate is ok");
      equal(point.z, 13, "Z coordinate is ok");
      equal(point.diameter, 10, "Diameter is ok");
      equal(point.color.rgb, "rgb(255,254,253)", "Color is ok");
    });
    
    test("Test Point rotation", function() {
      
      var point = new Point(0, 0, 0, 10, new Color(255,255,255));
      var pi = Math.PI;
      point.rotate(pi/2, 0, 0, {x : 0, y : 0, z : 0});
      equal(point.x + " " + point.y + " " + point.z,"0 0 0", "Rotation 1 ok");
      
      point = new Point(0, 0, 0, 10, new Color(255,255,255));
      point.rotate(0, pi, 0, {x : 10, y : 0, z : 0});
      equal(point.x + " " + point.y + " " + point.z,"20 0 0", "Rotation 2 ok");
      
      point = new Point(0, 0, 0, 10, new Color(255,255,255));
      point.rotate(0, 0, pi, {x : 0, y : 0, z : 10});
      equal(point.x + " " + point.y + " " + point.z,"0 0 20", "Rotation 3 ok");
      
      point = new Point(0, 0, 0, 10, new Color(255,255,255));
      point.rotate(pi, 0, 0, {x : 0, y : 10, z : 0});
      equal(point.x + " " + point.y + " " + point.z,"0 20 0", "Rotation 4 ok");
      
    });   
  });
});