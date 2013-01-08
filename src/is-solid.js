var path = require('path');
var fs = require('fs');

function discoverSourceFiles(files) {
	console.assert(Array.isArray(files), 'expect list of filenames');	
	var glob = require("glob");

	var filenames = [];
	files.forEach(function (shortName) {
		var files = glob.sync(shortName);
		filenames = filenames.concat(files);
	});

	filenames = filenames.map(function (shortName) {
		return path.resolve(shortName);
	});
	return filenames;
}

function run(files) {
	console.assert(Array.isArray(files), 'expect list of files');

	// todo: need to watch test files as well!
	var filenames = discoverSourceFiles(files);
	console.assert(Array.isArray(filenames), 'could not discover source files');

	var testing = require('./testing');
	var preload = require('./preload');
	var complexity = require('./complexity');

	function solidFiles(files) {
		console.assert(Array.isArray(files), 'expect list of filenames');	
		preload.run(files);
		testing.run(files);
		complexity.run(files);
	}

	solidFiles(filenames);
	if (args.watch && filenames.length) {
		console.log('watching', filenames.length, 'files...');
		var watch = require('nodewatch');
		filenames.forEach(function (filename) {
			watch.add(filename);
		});
		watch.onChange(function (file, prev, curr, action){
			log.warn('file', file, action);
			solidFiles([file]);
		});
	}
}

module.exports.run = run;