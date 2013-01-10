var path = require('path');
var fs = require('fs');
var getCaller = require('./caller').caller;

global.define = function(reqs, code) {
	console.assert(Array.isArray(reqs), 'reqs should be an array');
	console.assert(typeof code === 'function', 'code should be a function');

	var caller = getCaller();
	// console.log('caller', caller);
	var callerFolder = path.dirname(caller);
	// console.log('caller folder', callerFolder);

	var loaded = [];
	reqs.forEach(function (req) {
		if (!/\.js$/.test(req)) {
			req += '.js';
		}

		var reqPath = path.join(callerFolder, req);
		var reqSrc = fs.readFileSync(reqPath, 'utf8');
		var reqResult = eval(reqSrc);
		loaded.push(reqResult);
	});

	var result = code.apply(null, loaded);
	return result;
};
console.log('global define has been loaded');