var path = require('path');
var fs = require('fs');

function run(filenames) {
	console.assert(Array.isArray(filenames), 'expect list of filenames');
	if (!filenames.length) {
		return;
	}

	var CONFIG_JSON_FILENAME = 'solid.json';
	var solidJsonFilenames = {};
	filenames.forEach(function (file) {
		var solidJson = findFile(file, CONFIG_JSON_FILENAME);
		if (solidJson) {
			solidJsonFilenames[solidJson] = solidJson;
		}
	});

	var uniqueSolidJsonFilenames = Object.keys(solidJsonFilenames);
	// console.log('loading solid json filenames', uniqueSolidJsonFilenames);

	uniqueSolidJsonFilenames.forEach(function (filename) {
		var solidConfig = require(filename);
		if (solidConfig.preload) {
			var full = path.join(path.dirname(filename), solidConfig.preload);
			// console.log('preloading', full);
			require(full);
		}
	});
}

function findFile(filename, target) {
	var dir = path.dirname(filename);
	var parts = dir.split('\\');

	while (parts.length > 0) {

		var full = path.join(parts.join('\\'), target);
		// console.log('checking if', full, 'exists');
		if (fs.existsSync(full)) {
			return full;
		}
		parts = parts.splice(0, parts.length - 1);
	}

	return null;
}

module.exports.run = run;