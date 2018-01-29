'use strict';

var _generateAtRiskToWin = require('./generateAtRiskToWin');

var _generateAtRiskToWin2 = _interopRequireDefault(_generateAtRiskToWin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wagerPicks1 = [{ marked: { oddLine: 100 } }];
test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('straight', 'wager', 100, wagerPicks1)).toEqual({ atRisk: 100, toWin: 100 });
});

var wagerPicks2 = [{ marked: { oddLine: -750 } }];
test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('straight', 'wager', 120, wagerPicks2)).toEqual({ atRisk: 900, toWin: 120 });
});

test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('straight', 'wager', 100, wagerPicks2)).toEqual({ atRisk: 750, toWin: 100 });
});

test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('straight', 'risk', 100, wagerPicks2)).toEqual({ atRisk: 100, toWin: 13 });
});

var wagerPicks3 = [{ marked: { oddLine: 525 } }];
test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('straight', 'wager', 130, wagerPicks3)).toEqual({ atRisk: 130, toWin: 683 });
});

test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('straight', 'risk', 130, wagerPicks3)).toEqual({ atRisk: 130, toWin: 683 });
});

var wagerPicks4 = [{ marked: { oddLine: 125 } }, { marked: { oddLine: -105 } }, { marked: { oddLine: -110 } }];
test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('parlay', 'wager', 100, wagerPicks4)).toEqual({ atRisk: 100, toWin: 739 });
});

var wagerPicks12 = [{ marked: { oddLine: 125 } }, { marked: { oddLine: 125 } }, { marked: { oddLine: 125 } }];
test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('parlay', 'wager', 100, wagerPicks12)).toEqual({ atRisk: 100, toWin: 1039 });
});

var wagerPicks13 = [{ marked: { oddLine: 100 } }, { marked: { oddLine: 100 } }];
test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('parlay', 'wager', 100, wagerPicks13)).toEqual({ atRisk: 100, toWin: 300 });
});

var wagerPicks5 = [{ marked: { oddLine: -1525 } }, { marked: { oddLine: -675 } }];
test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('parlay', 'risk', 100, wagerPicks5)).toEqual({ atRisk: 100, toWin: 22 });
});

test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('parlay', 'wager', 100, wagerPicks5)).toEqual({ atRisk: 448, toWin: 100 });
});

var wagerPicks11 = [{ marked: { oddLine: -1000 } }, { marked: { oddLine: -1000 } }];
test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('parlay', 'wager', 100, wagerPicks11)).toEqual({ atRisk: 476, toWin: 100 });
});

var wagerPicks10 = [{ marked: { oddLine: -1000 } }, { marked: { oddLine: -1000 } }];
test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('parlay', 'risk', 100, wagerPicks10)).toEqual({ atRisk: 100, toWin: 21 });
});

var wagerPicks6 = [{ marked: { oddLine: -100 } }, { marked: { oddLine: -100 } }];
test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('actionReverse', 'wager', 100, wagerPicks6)).toEqual({ atRisk: 200, toWin: 400 });
});

var wagerPicks7 = [{ marked: { oddLine: -100 } }, { marked: { oddLine: -100 } }];
test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('actionReverse', 'risk', 200, wagerPicks7)).toEqual({ atRisk: 200, toWin: 400 });
});

var wagerPicks8 = [{ marked: { oddLine: -700 } }, { marked: { oddLine: -700 } }, { marked: { oddLine: -700 } }, { marked: { oddLine: -700 } }];
test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('actionReverse', 'risk', 1200, wagerPicks8)).toEqual({ atRisk: 1200, toWin: 343 });
});

test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('actionReverse', 'wager', 100, wagerPicks8)).toEqual({ atRisk: 1200, toWin: 343 });
});

var wagerPicks9 = [{ marked: { oddLine: 150 } }, { marked: { oddLine: 100 } }, { marked: { oddLine: 200 } }, { marked: { oddLine: 300 } }];
test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('actionReverse', 'wager', 100, wagerPicks9)).toEqual({ atRisk: 1200, toWin: 4500 });
});

test('test generateAtRiskToWin', function () {
	expect((0, _generateAtRiskToWin2.default)('actionReverse', 'risk', 1200, wagerPicks9)).toEqual({ atRisk: 1200, toWin: 4500 });
});
//# sourceMappingURL=generateAtRiskToWin.test.js.map