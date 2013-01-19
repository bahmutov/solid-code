var reqs = require('req-count');
var check = require('check-types');

function run(filenames, options) {
	console.assert(Array.isArray(filenames), 'expected list of filenames');
	options = options || {};

	reqs.run({
		input: filenames,
		colors: options.colors,
		minimal: true
	});
}

exports.run = run;
