'use strict';

var _reverse = require('./reverse');

var _reverse2 = _interopRequireDefault(_reverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bet = {
	'action': 'winReverse',
	'type': 'wager',
	'amount': 100,
	'toWin': 364,
	'atRisk': 200
};
var picks1 = [{ 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }];
test('test reverse result', function () {
	expect((0, _reverse2.default)(bet, picks1).status).toBe('Won');
	expect((0, _reverse2.default)(bet, picks1).resultAmount).toBe(364);
});

var bet2 = {
	'action': 'winReverse',
	'type': 'risk',
	'amount': 200,
	'toWin': 364,
	'atRisk': 200
};
var picks2 = [{ 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }];
test('test reverse result', function () {
	expect((0, _reverse2.default)(bet2, picks2).status).toBe('Won');
	expect((0, _reverse2.default)(bet2, picks2).resultAmount).toBe(364);
});

var bet3 = {
	'action': 'winReverse',
	'type': 'wager',
	'amount': 100,
	'toWin': 364,
	'atRisk': 200
};
var picks3 = [{ 'status': 'Lost',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }];
test('test reverse result', function () {
	expect((0, _reverse2.default)(bet3, picks3).status).toBe('Lost');
	expect((0, _reverse2.default)(bet3, picks3).resultAmount).toBe(-109);
});

var bet4 = {
	'action': 'winReverse',
	'type': 'risk',
	'amount': 200,
	'toWin': 364,
	'atRisk': 200
};
var picks4 = [{ 'status': 'Lost',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }];
test('test reverse result', function () {
	expect((0, _reverse2.default)(bet4, picks4).status).toBe('Lost');
	expect((0, _reverse2.default)(bet4, picks4).resultAmount).toBe(-109);
});

var bet5 = {
	'action': 'winReverse',
	'type': 'wager',
	'amount': 100,
	'toWin': 2182,
	'atRisk': 1200
};
var picks5 = [{ 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }];
test('test reverse result', function () {
	expect((0, _reverse2.default)(bet5, picks5).status).toBe('Won');
	expect((0, _reverse2.default)(bet5, picks5).resultAmount).toBe(2182);
});

var bet6 = {
	'action': 'winReverse',
	'type': 'risk',
	'amount': 1200,
	'toWin': 2182,
	'atRisk': 1200
};
var picks6 = [{ 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }];
test('test reverse result', function () {
	expect((0, _reverse2.default)(bet5, picks5).status).toBe('Won');
	expect((0, _reverse2.default)(bet5, picks5).resultAmount).toBe(2182);
});

var bet7 = {
	'action': 'winReverse',
	'type': 'wager',
	'amount': 100,
	'toWin': 2182,
	'atRisk': 1200
};
var picks7 = [{ 'status': 'Lost',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Push',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }];
test('test reverse result', function () {
	expect((0, _reverse2.default)(bet7, picks7).status).toBe('Won');
	expect((0, _reverse2.default)(bet7, picks7).resultAmount).toBe(227);
});

var bet8 = {
	'action': 'winReverse',
	'type': 'wager',
	'amount': 100,
	'toWin': 2182,
	'atRisk': 1200
};
var picks8 = [{ 'status': 'Lost',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Push',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Lost',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }];
test('test reverse result', function () {
	expect((0, _reverse2.default)(bet8, picks8).status).toBe('Lost');
	expect((0, _reverse2.default)(bet8, picks8).resultAmount).toBe(-527);
});

var bet9 = {
	'action': 'actionReverse',
	'type': 'wager',
	'amount': 100,
	'toWin': 2182,
	'atRisk': 1200
};
var picks9 = [{ 'status': 'Lost',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Push',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Lost',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }];
test('test reverse result', function () {
	expect((0, _reverse2.default)(bet9, picks9).status).toBe('Lost');
	expect((0, _reverse2.default)(bet9, picks9).resultAmount).toBe(-636);
});

var bet10 = {
	'action': 'actionReverse',
	'type': 'wager',
	'amount': 100,
	'toWin': 2182,
	'atRisk': 1200
};
var picks10 = [{ 'status': 'Lost',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Push',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }];
test('test reverse result', function () {
	expect((0, _reverse2.default)(bet10, picks10).status).toBe('Won');
	expect((0, _reverse2.default)(bet10, picks10).resultAmount).toBe(309);
});

var bet11 = {
	'action': 'actionReverse',
	'type': 'risk',
	'amount': 1200,
	'toWin': 2182,
	'atRisk': 1200
};
var picks11 = [{ 'status': 'Lost',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Push',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }];
test('test reverse result', function () {
	expect((0, _reverse2.default)(bet11, picks11).status).toBe('Won');
	expect((0, _reverse2.default)(bet11, picks11).resultAmount).toBe(309);
});

var bet12 = {
	'action': 'actionReverse',
	'type': 'risk',
	'amount': 1200,
	'toWin': 2182,
	'atRisk': 1200
};
var picks12 = [{ 'status': 'Lost',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Push',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Review',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }];
test('test reverse result', function () {
	expect((0, _reverse2.default)(bet12, picks12).status).toBe('Review');
	expect((0, _reverse2.default)(bet12, picks12).resultAmount).toBe(null);
});

var bet13 = {
	'action': 'actionReverse',
	'type': 'risk',
	'amount': 1200,
	'toWin': 2182,
	'atRisk': 1200
};
var picks13 = [{ 'status': 'Push',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Push',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Push',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Push',
	'marked': {
		'oddLine': -110
	} }];
test('test reverse result', function () {
	expect((0, _reverse2.default)(bet13, picks13).status).toBe('Push');
	expect((0, _reverse2.default)(bet13, picks13).resultAmount).toBe(0);
});

var bet14 = {
	'action': 'actionReverse',
	'type': 'risk',
	'amount': 1200,
	'toWin': 4800,
	'atRisk': 1200
};
var picks14 = [{ 'status': 'Won',
	'marked': {
		'oddLine': 200
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': 200
	} }, { 'status': 'Push',
	'marked': {
		'oddLine': 200
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': 200
	} }];
test('test reverse result', function () {
	expect((0, _reverse2.default)(bet14, picks14).status).toBe('Won');
	expect((0, _reverse2.default)(bet14, picks14).resultAmount).toBe(3600);
});

var bet15 = {
	'action': 'winReverse',
	'type': 'risk',
	'amount': 1200,
	'toWin': 4800,
	'atRisk': 1200
};
var picks15 = [{ 'status': 'Won',
	'marked': {
		'oddLine': 200
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': 200
	} }, { 'status': 'Push',
	'marked': {
		'oddLine': 200
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': 200
	} }];
test('test reverse result', function () {
	expect((0, _reverse2.default)(bet15, picks15).status).toBe('Won');
	expect((0, _reverse2.default)(bet15, picks15).resultAmount).toBe(3000);
});
//# sourceMappingURL=reverse.test.js.map