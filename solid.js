#!/usr/bin/env node

(function() {
	// grab command line arguments
	var optimist = require("optimist");
	args = optimist.usage('JS quality metrics.\n' + 
		'\tauthor: Gleb Bahmutov gleb.bahmutov@gmail.com\n' +
		'\tusage:\n\t\t$0 <filename.js | folder with js files>\n' + 
		'\tor install and run globally\n\t\tnpm i -g solid-code\n' + 
		'\t\tsolid foo.js bar.js ...')
			.default({
				help: false
			})
			.alias('h', 'help')
			.boolean('help')
			.argv;

	function showUsageAndExit() {
		optimist.showHelp();
		console.log('current arguments\n', args);
		process.exit(0);
	}

	if (!module.parent) {
		if (args.h || args.help) {
			showUsageAndExit();
		}
	}

	if (args._.length === 0) {
		console.log('missing input file|files|folder');
		showUsageAndExit();
	}

	var logger = require('optional-color-logger');
	logger.init(args);
}());

var files = args._;
if (!files.length) {
	console.log('nothing to do, exitting...');
	process.exit(0);
}

var preload = require('./src/preload');
preload.run(files);

var testing = require('./src/testing');

testing.init(files);
testing.run();

var complexity = require('./src/complexity');
complexity.run(args._);

// process.exit(0);
