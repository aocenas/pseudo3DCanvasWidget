$(document).ready(function(){
  
  require({baseUrl:'../source/'},['Color'],function (Color){
  
    module('Tests for Color module')
    test("Test Color", function() {
      ok(Color, "Color exists");
      var color = new Color(155,154,153);
      equal(color.rgb, "rgb(155,154,153)", "Color is ok");
    });
    
  });
  
});