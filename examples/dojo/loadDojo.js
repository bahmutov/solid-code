var path = require('path');
var dojoAt = path.join(__dirname, "1.8.1/dojo");

dojoConfig = {
  async: false,
	cacheBust: true,
  baseUrl: ".",
  packages: [
		{
			name: "dojo",
			location: dojoAt
		},
		{
			name: "src",
			location: "./src"
		},
	]
};

var dojojs = path.join(dojoAt, 'dojo.js');
console.log('loading dojo.js', dojojs);
require(dojojs);
console.assert(global.require, "dojo's global.require not found");
console.assert(global.define, "dojo's global.define not found");