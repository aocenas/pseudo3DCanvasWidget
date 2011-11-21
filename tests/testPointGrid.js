$(document).ready(function(){
  
  require({baseUrl:'../source/'},['PointGrid', 'Point', 'Color', 'globals'],function (PointGrid, Point, Color, globals){
  
    module('Tests for PointGrid module')
    test("Test PointGrid prerequisites", function() {
    
      ok(PointGrid, "PointGrid exists");
      var grid = [[[1,1,1]]];
      var pointGrid = new PointGrid(grid);
      var expectedPoints = [new Point(globals.X00 - globals.GRID_SPACING,
                                      globals.Y00,
                                      globals.Z00,
                                      globals.POINT_RADIUS,
                                      new Color(0,0,0)),
                            new Point(globals.X00,
                                      globals.Y00,
                                      globals.Z00,
                                      globals.POINT_RADIUS,
                                      new Color(0,0,0)),
                            new Point(globals.X00 + globals.GRID_SPACING,
                                      globals.Y00,
                                      globals.Z00,
                                      globals.POINT_RADIUS,
                                      new Color(0,0,0))];
      deepEqual(pointGrid.points,expectedPoints,"Initialization is OK");
    });
    
    test("Test PointGrid rotation", function() {
      var grid = [[[1,1,1]]];
      var center = {x : globals.X00, y : globals.Y00, z : globals.Z00};
      var pointGrid = new PointGrid(grid);
      pointGrid.rotate(0,Math.PI/2,0,center);
      
      var expectedPoints = [new Point(globals.X00,
                                      globals.Y00,
                                      globals.Z00 + globals.GRID_SPACING,
                                      globals.POINT_RADIUS,
                                      new Color(0,0,0)),
                            new Point(globals.X00,
                                      globals.Y00,
                                      globals.Z00,
                                      globals.POINT_RADIUS,
                                      new Color(0,0,0)),
                            new Point(globals.X00,
                                      globals.Y00,
                                      globals.Z00 - globals.GRID_SPACING,
                                      globals.POINT_RADIUS,
                                      new Color(0,0,0))];
      deepEqual(pointGrid.points,expectedPoints,"XZ rotation OK");
      
      pointGrid.rotate(0,0,Math.PI/2,center);
      expectedPoints[0] = new Point(globals.X00,
                                      globals.Y00 + globals.GRID_SPACING,
                                      globals.Z00,
                                      globals.POINT_RADIUS,
                                      new Color(0,0,0));
      expectedPoints[2] = new Point(globals.X00,
                                      globals.Y00 - globals.GRID_SPACING,
                                      globals.Z00,
                                      globals.POINT_RADIUS,
                                      new Color(0,0,0));
      deepEqual(pointGrid.points,expectedPoints,"YZ rotation OK");
      
      pointGrid.rotate(Math.PI/2,0,0,center);
      expectedPoints[0] = new Point(globals.X00 + globals.GRID_SPACING,
                                      globals.Y00,
                                      globals.Z00,
                                      globals.POINT_RADIUS,
                                      new Color(0,0,0));
      expectedPoints[2] = new Point(globals.X00 - globals.GRID_SPACING,
                                      globals.Y00,
                                      globals.Z00,
                                      globals.POINT_RADIUS,
                                      new Color(0,0,0));
      deepEqual(pointGrid.points,expectedPoints,"XY rotation OK");
    });
  });
});