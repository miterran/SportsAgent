'use strict';

var _parlay = require('./parlay');

var _parlay2 = _interopRequireDefault(_parlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bet = {
	'type': 'wager',
	'amount': 100
};
var picks1 = [{ 'status': 'Pending',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Pending',
	'marked': {
		'oddLine': -110
	} }];
test('test parlay result', function () {
	expect((0, _parlay2.default)(bet, picks1).status).toBe('Pending');
	expect((0, _parlay2.default)(bet, picks1).resultAmount).toBe(null);
});

var bet2 = {
	'type': 'wager',
	'amount': 100
};
var picks2 = [{ 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }];
test('test parlay result', function () {
	expect((0, _parlay2.default)(bet2, picks2).status).toBe('Won');
	expect((0, _parlay2.default)(bet2, picks2).resultAmount).toBe(264);
});

var bet3 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 300
};
var picks3 = [{ 'status': 'Lost',
	'marked': {
		'oddLine': -110
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -110
	} }];
test('test parlay result', function () {
	expect((0, _parlay2.default)(bet3, picks3).status).toBe('Lost');
	expect((0, _parlay2.default)(bet3, picks3).resultAmount).toBe(-300);
});

var bet4 = {
	'type': 'wager',
	'amount': 100,
	'atRisk': 21
};
var picks4 = [{ 'status': 'Won',
	'marked': {
		'oddLine': -1000
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -1000
	} }];
test('test parlay result', function () {
	expect((0, _parlay2.default)(bet4, picks4).status).toBe('Won');
	expect((0, _parlay2.default)(bet4, picks4).resultAmount).toBe(100);
});

var bet5 = {
	'type': 'risk',
	'amount': 100,
	'atRisk': 100
};
var picks5 = [{ 'status': 'Won',
	'marked': {
		'oddLine': -1000
	} }, { 'status': 'Won',
	'marked': {
		'oddLine': -1000
	} }];
test('test parlay result', function () {
	expect((0, _parlay2.default)(bet5, picks5).status).toBe('Won');
	expect((0, _parlay2.default)(bet5, picks5).resultAmount).toBe(21);
});

var bet21 = {
	'type': 'risk',
	'amount': 100,
	'atRisk': 100
};
var picks21 = [{ 'status': 'Postponed',
	'marked': {
		'oddLine': -1000
	} }, { 'status': 'Cancelled',
	'marked': {
		'oddLine': -1000
	} }, { 'status': 'Cancelled',
	'marked': {
		'oddLine': -1000
	} }, { 'status': 'Postponed',
	'marked': {
		'oddLine': -1000
	} }];
test('test parlay result', function () {
	expect((0, _parlay2.default)(bet21, picks21).status).toBe('Cancelled');
	expect((0, _parlay2.default)(bet21, picks21).resultAmount).toBe(0);
});
//# sourceMappingURL=parlay.test.js.map