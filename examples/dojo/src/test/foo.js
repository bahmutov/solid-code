define(['src/foo'], function (foo) {
	gt.module('testing module foo');

	gt.test('basics', function () {
		gt.func(foo, 'foo is a function');
		gt.arity(foo, 0, 'foo does not need arguments');
		gt.equal(foo(), 'foo', 'return value');
	});
});