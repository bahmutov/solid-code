define(['../z'], function (z) {
	gt.module('testing z');
	gt.test('z', function () {
		gt.string(z, 'z is a string');
		gt.equal(z, 'z', 'z is z');
	})
});