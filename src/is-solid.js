var path = require('path');
var fs = require('fs');

function discoverSourceFiles(files) {
	log.debug('discovering from files', files);
	console.assert(Array.isArray(files), 'expect list of filenames');	
	var glob = require("glob");

	var filenames = [];
	files.forEach(function (shortName) {
		if (fs.existsSync(shortName)) {
			var stat = fs.lstatSync(shortName);
			if (stat.isDirectory()) {
				log.debug(shortName, 'is a folder');
				shortName = path.join(shortName, '*.js');
			}
		}
		var foundMatches = glob.sync(shortName);

		var discovered = [];
		foundMatches.forEach(function (match) {
			if (!fs.lstatSync(match).isDirectory(match)) {
				discovered.push(match);
			}
		});
		filenames = filenames.concat(discovered);
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
		log.info('checking files', files);

		preload.run(files);
		var sourceAndTestFiles = testing.run(files);
		console.assert(Array.isArray(sourceAndTestFiles), 'expected to get back list of filenames');
		complexity.run(sourceAndTestFiles);
		return sourceAndTestFiles;
	}

	var sourceAndTestFiles = solidFiles(filenames);
	console.assert(Array.isArray(sourceAndTestFiles), 'expected to get back list of filenames');

	if (args.watch && sourceAndTestFiles.length) {
		console.log('watching', sourceAndTestFiles.length, 'files...');
		var watch = require('nodewatch');
		sourceAndTestFiles.forEach(function (filename) {
			watch.add(filename);
		});
		watch.onChange(function (file, prev, curr, action){
			log.warn('file', file, action);
			solidFiles(filenames);
		});
	}
}

module.exports.run = run;