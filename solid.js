#!/usr/bin/env node

(function() {
	// grab command line arguments
	var optimist = require("optimist");
	args = optimist.usage('JS quality metrics.\n' + 
		'\tauthor: Gleb Bahmutov gleb.bahmutov@gmail.com\n' +
		'\tusage: $0 <filename.js | folder with js files>')
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
}());

var testing = require('./src/testing');
testing.init(args._);
testing.run();
