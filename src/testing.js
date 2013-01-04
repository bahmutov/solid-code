var testFiles = [];
var fs = require('fs');
var path = require('path');

function init(filenames) {
	console.assert(Array.isArray(filenames), 'expect list of filenames');

	filenames.forEach(function (filename) {
		console.log('is', filename, 'solid?');
		var fullName = path.resolve(filename);
		console.assert(fs.existsSync(fullName), 'cannot find', fullName);
		var folder = path.dirname(fullName);
		var extension = path.extname(fullName);
		console.assert(extension === '.js', fullName, 'does not end with .js');
		var basename = path.basename(fullName, extension);
		console.log('base name', basename, 'in', folder);

		var testName = path.join(folder, 'test', basename + 'Test.js');
		if (fs.existsSync(testName)) {
			testFiles.push(testName);
			return;
		}

		testName = path.join(folder, 'test', basename + '.js');
		if (fs.existsSync(testName)) {
			testFiles.push(testName);
			return;
		}

		testName = path.join(folder, 'tests', basename + 'Test.js');
		if (fs.existsSync(testName)) {
			testFiles.push(testName);
			return;
		}

		testName = path.join(folder, 'tests', basename + '.js');
		if (fs.existsSync(testName)) {
			testFiles.push(testName);
			return;
		}

		throw 'cannot find test file ' + fullName;
	});
}

function findFile(filename, target) {
	var dir = path.dirname(filename);
	var parts = dir.split('\\');

	while (parts.length > 0) {

		var full = path.join(parts.join('\\'), target);
		console.log('checking if', full, 'exists');
		if (fs.existsSync(full)) {
			return full;
		}
		parts = parts.splice(0, parts.length - 1);
	}

	return null;
}

function preload() {
	var solidJsonFilenames = {};
	testFiles.forEach(function (testFile) {
		var solidJson = findFile(testFile, 'solid.json');
		if (solidJson) {
			solidJsonFilenames[solidJson] = solidJson;
		}
	});

	var uniqueSolidJsonFilenames = Object.keys(solidJsonFilenames);
	console.log('loading solid json filenames', uniqueSolidJsonFilenames);

	uniqueSolidJsonFilenames.forEach(function (filename) {
		var solidConfig = require(filename);
		if (solidConfig.preload) {
			var full = path.join(path.dirname(filename), solidConfig.preload);
			console.log('preloading', full);
			require(full);
		}
	});
}

function run() {
	if (testFiles.length < 1) {
		console.log('no unit tests found');
	} else {
		preload();

		var tester = require('gt/covered');
		console.assert(typeof tester === "object", 'loaded tester module');

		tester.init({
			files: testFiles,
			cover: 'solid-code-coverage'
		});
		var failed = tester.run();
		if (failed > 0) {
			process.exit(failed);
		}
	}
}

module.exports = {
	init: init,
	run: run
};