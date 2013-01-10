var foo = require('../foo');

gt.module('testing foo');

gt.test('sanity', function () {
	gt.equal(typeof foo.foo, 'function', 'foo is a function');
});

gt.test('return value', function () {
	gt.equal(foo.foo(), 'foo', 'foo returns correct value');
});