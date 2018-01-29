'use strict';

var _straight = require('./straight');

var _straight2 = _interopRequireDefault(_straight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bet1 = {
	'toWin': 100
};
var picks1 = [{ 'status': 'Won' }];
test('test straight result', function () {
	expect((0, _straight2.default)(bet1, picks1).status).toBe('Won');
	expect((0, _straight2.default)(bet1, picks1).resultAmount).toBe(100);
});

var bet2 = {
	'toWin': 100
};
var picks2 = [{ 'status': 'Won Half' }];
test('test straight result', function () {
	expect((0, _straight2.default)(bet2, picks2).status).toBe('Won');
	expect((0, _straight2.default)(bet2, picks2).resultAmount).toBe(50);
});

var bet3 = {
	'toWin': 100,
	'atRisk': 100
};
var picks3 = [{ 'status': 'Lost Half' }];
test('test straight result', function () {
	expect((0, _straight2.default)(bet3, picks3).status).toBe('Lost');
	expect((0, _straight2.default)(bet3, picks3).resultAmount).toBe(-50);
});

var bet4 = {
	'toWin': 100,
	'atRisk': 100
};
var picks4 = [{ 'status': 'Pending' }];
test('test straight result', function () {
	expect((0, _straight2.default)(bet4, picks4).status).toBe('Pending');
	expect((0, _straight2.default)(bet4, picks4).resultAmount).toBe(null);
});

var bet5 = {
	'toWin': 100,
	'atRisk': 100
};
var picks5 = [{ 'status': 'Review' }];
test('test straight result', function () {
	expect((0, _straight2.default)(bet5, picks5).status).toBe('Review');
	expect((0, _straight2.default)(bet5, picks5).resultAmount).toBe(null);
	expect((0, _straight2.default)(bet5, picks5).isClosed).toBe(false);
});

var bet6 = {
	'toWin': 100,
	'atRisk': 100
};
var picks6 = [{ 'status': 'Cancelled' }];
test('test straight result', function () {
	expect((0, _straight2.default)(bet6, picks6).status).toBe('Cancelled');
	expect((0, _straight2.default)(bet6, picks6).resultAmount).toBe(0);
	expect((0, _straight2.default)(bet6, picks6).isClosed).toBe(true);
});
//# sourceMappingURL=straight.test.js.map