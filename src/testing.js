var fs = require('fs');
var path = require('path');
		var tester = require('gt/covered');
		// var tester = require('C:/git/gt/covered');
		console.assert(typeof tester === "object", 'loaded tester module');

function init(filenames) {
	console.assert(Array.isArray(filenames), 'expect list of filenames');

	var testFiles = [];
	filenames.forEach(function (filename) {
		// console.log('is', filename, 'solid?');
		var fullName = path.resolve(filename);
		console.assert(fs.existsSync(fullName), 'cannot find', fullName);
		var folder = path.dirname(fullName);
		var extension = path.extname(fullName);
		console.assert(extension === '.js', fullName, 'does not end with .js');
		var basename = path.basename(fullName, extension);
		// console.log('base name', basename, 'in', folder);

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

	return testFiles;
}

function run(sourceFiles) {
	console.assert(Array.isArray(sourceFiles), 'expected a list of names');
	var testFiles = init(sourceFiles);
	//console.log('source files', sourceFiles);

	if (testFiles.length < 1) {
		console.log('no unit tests found');
	} else {
		tester.init({
			log: 0,
			files: testFiles
			// cover: 'solid-code-coverage'
		});
		
		var failed = tester.run();
		if (failed > 0) {
			process.exit(failed);
		}
	}
}

module.exports.run = run;
