'use strict';

var _teaser = require('./teaser');

var _teaser2 = _interopRequireDefault(_teaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bet1 = {
	type: 'wager',
	'toWin': 100,
	'toRisk': 100,
	'amount': 100,
	'action': 'basicTeaser'
};
var picks1 = [{ 'status': 'Won' }, { 'status': 'Won' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet1, picks1).status).toBe('Won');
	expect((0, _teaser2.default)(bet1, picks1).resultAmount).toBe(100);
});

var bet2 = {
	'type': 'wager',
	'amount': 100,
	'action': 'basicTeaser'
};
var picks2 = [{ 'status': 'Won' }, { 'status': 'Won' }, { 'status': 'Push' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet2, picks2).status).toBe('Won');
	expect((0, _teaser2.default)(bet2, picks2).resultAmount).toBe(100);
});

var bet3 = {
	'type': 'wager',
	'amount': 100,
	'action': 'basicTeaser'
};
var picks3 = [{ 'status': 'Won' }, { 'status': 'Won' }, { 'status': 'Push' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet3, picks3).status).toBe('Won');
	expect((0, _teaser2.default)(bet3, picks3).resultAmount).toBe(100);
});

var bet4 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 110,
	'action': 'basicTeaser'
};
var picks4 = [{ 'status': 'Lost' }, { 'status': 'Won' }, { 'status': 'Push' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet4, picks4).status).toBe('Lost');
	expect((0, _teaser2.default)(bet4, picks4).resultAmount).toBe(-110);
});

var bet5 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 110,
	'action': 'bigTeaser'
};
var picks5 = [{ 'status': 'Lost' }, { 'status': 'Won' }, { 'status': 'Push' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet5, picks5).status).toBe('Lost');
	expect((0, _teaser2.default)(bet5, picks5).resultAmount).toBe(-110);
});

var bet6 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 110,
	'action': 'bigTeaser'
};
var picks6 = [{ 'status': 'Won' }, { 'status': 'Won' }, { 'status': 'Review' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet6, picks6).status).toBe('Review');
	expect((0, _teaser2.default)(bet6, picks6).resultAmount).toBe(null);
});

var bet7 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 110,
	'action': 'bigTeaser'
};
var picks7 = [{ 'status': 'Won' }, { 'status': 'Cancelled' }, { 'status': 'Push' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet7, picks7).status).toBe('Push');
	expect((0, _teaser2.default)(bet7, picks7).resultAmount).toBe(0);
});

var bet8 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 110,
	'action': 'bigTeaser'
};
var picks8 = [{ 'status': 'Won' }, { 'status': 'Cancelled' }, { 'status': 'Push' }, { 'status': 'Postponed' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet8, picks8).status).toBe('Push');
	expect((0, _teaser2.default)(bet8, picks8).resultAmount).toBe(0);
});

var bet9 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 110,
	'action': 'bigTeaser'
};
var picks9 = [{ 'status': 'Postponed' }, { 'status': 'Cancelled' }, { 'status': 'Push' }, { 'status': 'Postponed' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet9, picks9).status).toBe('Push');
	expect((0, _teaser2.default)(bet9, picks9).resultAmount).toBe(0);
});

var bet10 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 110,
	'action': 'bigTeaser'
};
var picks10 = [{ 'status': 'Pending' }, { 'status': 'Cancelled' }, { 'status': 'Push' }, { 'status': 'Postponed' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet10, picks10).status).toBe('Pending');
	expect((0, _teaser2.default)(bet10, picks10).resultAmount).toBe(null);
});

var bet11 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 110,
	'action': 'bigTeaser'
};
var picks11 = [{ 'status': 'Review' }, { 'status': 'Cancelled' }, { 'status': 'Push' }, { 'status': 'Postponed' }, { 'status': 'Postponed' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet11, picks11).status).toBe('Review');
	expect((0, _teaser2.default)(bet11, picks11).resultAmount).toBe(null);
});

var bet12 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 110,
	'action': 'bigTeaser'
};
var picks12 = [{ 'status': 'Review' }, { 'status': 'Cancelled' }, { 'status': 'Won' }, { 'status': 'Postponed' }, { 'status': 'Postponed' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet12, picks12).status).toBe('Review');
	expect((0, _teaser2.default)(bet12, picks12).resultAmount).toBe(null);
});

var bet13 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 110,
	'action': 'bigTeaser'
};
var picks13 = [{ 'status': 'Won' }, { 'status': 'Cancelled' }, { 'status': 'Won' }, { 'status': 'Postponed' }, { 'status': 'Postponed' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet13, picks13).status).toBe('Won');
	expect((0, _teaser2.default)(bet13, picks13).resultAmount).toBe(100);
});

var bet14 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 110,
	'action': 'bigTeaser'
};
var picks14 = [{ 'status': 'Lost' }, { 'status': 'Cancelled' }, { 'status': 'Won' }, { 'status': 'Postponed' }, { 'status': 'Postponed' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet14, picks14).status).toBe('Lost');
	expect((0, _teaser2.default)(bet14, picks14).resultAmount).toBe(-110);
});

var bet15 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 110,
	'action': 'superTeaser'
};
var picks15 = [{ 'status': 'Lost' }, { 'status': 'Cancelled' }, { 'status': 'Won' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet15, picks15).status).toBe('Lost');
	expect((0, _teaser2.default)(bet15, picks15).resultAmount).toBe(-110);
});

var bet16 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 110,
	'action': 'superTeaser'
};
var picks16 = [{ 'status': 'Won' }, { 'status': 'Review' }, { 'status': 'Won' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet16, picks16).status).toBe('Review');
	expect((0, _teaser2.default)(bet16, picks16).resultAmount).toBe(null);
});

var bet17 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 110,
	'action': 'superTeaser'
};
var picks17 = [{ 'status': 'Won' }, { 'status': 'Cancelled' }, { 'status': 'Won' }];
test('test teaser result', function () {
	expect((0, _teaser2.default)(bet17, picks17).status).toBe('Cancelled');
	expect((0, _teaser2.default)(bet17, picks17).resultAmount).toBe(0);
});
//# sourceMappingURL=teaser.test.js.map