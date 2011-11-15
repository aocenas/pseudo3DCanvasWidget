var fs = require('fs');
var util = require('util');
var requirejs = require('requirejs');


var SOURCE_DIR = './source/';
var DEV_BUILD_DIR = './build/';
var FILE_NAME = 'Pseudo3D';
var config = {
    baseUrl: SOURCE_DIR,
    name: FILE_NAME,
	//optimize : 'none',
    out: DEV_BUILD_DIR + FILE_NAME + '.js'
};

desc('clean task, removes all files in ' + DEV_BUILD_DIR + ' directory');
task('clean', function (params) {
	(fs.readdirSync(DEV_BUILD_DIR)).forEach(function(filename){	
		fs.unlinkSync(DEV_BUILD_DIR + filename);
	});
});

desc('build task');
task('build',['clean'], function (params) {
	/*var result = "";
	
	(fs.readdirSync(SOURCE_DIR)).forEach(function(filename){	
		result += fs.readFileSync(SOURCE_DIR + filename,"UTF-8");
	});
	
	fs.writeFileSync(DEV_BUILD_DIR + FILE_NAME,result);
	console.log('created file: ' + DEV_BUILD_DIR + FILE_NAME);
	*/
	requirejs.optimize(config, function (buildResponse) {
		console.log('created file: ' + DEV_BUILD_DIR + FILE_NAME + '.js');
	});

	
});