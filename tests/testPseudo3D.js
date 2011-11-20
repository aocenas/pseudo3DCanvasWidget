$(document).ready(function(){
  
  module('main assertions')
  test("pseudo3D exist as global object", function() {
    ok(Pseudo3D, "pseudo3D exists" );
    ok(Pseudo3D.start, "pseudo3D.start exists")
  });

  module("Module A");
  test("first test within module", function() {
    ok( true, "all pass" );
  });

  test("second test within module", function() {
    ok( true, "all pass" );
  });

  module("Module B");

  test("some other test", function() {
    expect(2);
    equal( true, false, "failing test" );
    equal( true, true, "passing test" );
  });

});