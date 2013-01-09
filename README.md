solid-code
==========

JavaScript code quality front end:

+ unit testing using https://github.com/bahmutov/gt
	+ with code coverage using https://github.com/gotwarlost/istanbul
+ js complexity using https://github.com/bahmutov/js-complexity-viz
+ AMD/node requirements using https://github.com/bahmutov/req-count (coming)
* jshint style (coming)
* Dojo loader support (in progress)

installation
------------

	npm install -g solid-code

examples
--------

	solid foo.js

1. Looks for foo.js | fooTest.js in subfolders
2. Runs GT unit tests, outputs results and code coverage
3. Computes code complexity
4. (in progress) Computes dependency weights

You can specify multiple source files, they are tested sequentially.

	solid foo.js bar.js

The tool tries to be as silent as possible if the code is solid.
Otherwise it will print detailed description of the failure: 
	failed unit test results, insufficient code coverage, code is too complex.