

define(function (){
	
	if (!window.console) console = {};
	console.log = console.log || function(){};
	  
	// Comment this line if you want console logs.
	console.log = function(){};
	  
	return console;
});