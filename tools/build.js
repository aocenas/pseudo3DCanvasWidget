var fs = require('fs');
var util = require('util');

console.log(process.cwd());
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

var projectDir = process.argv[2];
var sourceDir = projectDir + '/source';
var buildDir = projectDir + '/build/dev';

try{
	console.log(sourceDir + '/pseudo3D.json');
	var moduleJson = fs.readFileSync(sourceDir + '/pseudo3D.json');
}catch(e){
	console.log(e);
}

console.log(moduleJson.toString('UTF-8'));
try{
	var module = JSON.parse(moduleJson.toString('UTF-8'));
}catch(er){
	console.log(er);
}
console.log(util.inspect(module));
