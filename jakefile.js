var fs = require('fs');
var util = require('util');
var requirejs = require('requirejs');

/* Constants used for build. */
var SOURCE_DIR = './source/';
var DEV_BUILD_DIR = './build/dev/';
var PROD_BUILD_DIR = './build/prod/';
var MAIN_MODULE = 'main';
var ALMOND = 'almond';
var ALMOND_PATH = '../lib/' + ALMOND;
var FILE_NAME = 'pseudo3D.js';
/* Config object for RequireJS optimization. */
var REQUIREJS_CONFIG = {
	baseUrl : SOURCE_DIR,
    name : ALMOND_PATH,
	include : MAIN_MODULE,
	wrap : true,
	//optimize : 'none',
    out : DEV_BUILD_DIR + FILE_NAME
};

desc('Clean task, removes all files in ' + DEV_BUILD_DIR + ' and ' + PROD_BUILD_DIR + ' directory');
task('clean', function (params) {
	try{
		fs.readdirSync(DEV_BUILD_DIR).forEach(function(filename){	
			fs.unlinkSync(DEV_BUILD_DIR + filename);
		});
	}catch(e){
		if(e.code === 'ENOENT'){
			console.log('Path ' + DEV_BUILD_DIR + ' does not exist. Nothing to clean.');
		}
	}
});


desc('Build task, creates two files. One without optimization and second optimized');
task('build',['clean'], function (params) {
	
	REQUIREJS_CONFIG.optimize = 'none';
	REQUIREJS_CONFIG.out = DEV_BUILD_DIR + FILE_NAME;
	requirejs.optimize(REQUIREJS_CONFIG, function (buildResponse) {
		console.log('created file: ' + DEV_BUILD_DIR + FILE_NAME);
	});
	
	REQUIREJS_CONFIG.optimize = 'uglify';
	REQUIREJS_CONFIG.out = PROD_BUILD_DIR + FILE_NAME;
	requirejs.optimize(REQUIREJS_CONFIG, function (buildResponse) {
		console.log('created file: ' + PROD_BUILD_DIR + FILE_NAME);
	});
	
});