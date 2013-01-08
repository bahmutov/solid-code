var complexity = require('./node_modules/js-complexity-viz/js-complexity-viz');
// var complexity = require('../../js-complexity/js-complexity-viz');
var check = require('check-types');

function run(filenames) {
	console.assert(Array.isArray(filenames), 'expected list of filenames');

	complexity.run({
		path: filenames,
		colors: true,
		minimal: true
	});
}

module.exports = {
	run: run
};