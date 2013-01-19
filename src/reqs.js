var reqs = require('req-count');
var check = require('check-types');

function run(filenames) {
	console.assert(Array.isArray(filenames), 'expected list of filenames');

	log.info('requirements for', filenames);
}

exports.run = run;
