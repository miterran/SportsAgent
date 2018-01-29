'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _teaserOddLine = require('../collections/teaserOddLine');

var _teaserOddLine2 = _interopRequireDefault(_teaserOddLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateAtRiskToWin = function generateAtRiskToWin(action, betType, betAmount, wagerPicks) {
	var line = 0;
	var atRisk = 0;
	var toWin = 0;
	switch (action) {
		case 'straight':
			line = wagerPicks[0].marked.oddLine;
			break;
		case 'parlay':
			var parlayLine = wagerPicks.map(function (_ref) {
				var oddLine = _ref.marked.oddLine;
				return oddLine > 0 ? (oddLine + 100) / 100 : (Math.abs(oddLine) + 100) / Math.abs(oddLine);
			}).reduce(function (a, b) {
				return a * b;
			}) - 1;
			line = parlayLine > 1 ? parlayLine * 100 : -(100 / parlayLine);
			break;
		case 'basicTeaser':
		case 'specialTeaser':
		case 'bigTeaser':
		case 'superTeaser':
			line = _teaserOddLine2.default[action][wagerPicks.length];
			break;
		case 'actionReverse':
		case 'winReverse':
			line = wagerPicks.map(function (_ref2) {
				var oddLine = _ref2.marked.oddLine;
				return oddLine > 0 ? betAmount * oddLine / 100 : betAmount / Math.abs(oddLine) * 100;
			}).reduce(function (a, b) {
				return a += b;
			});
			break;
		default:
			break;
	}

	if (action !== 'actionReverse' || action !== 'winReverse') {
		if (betType === 'wager') {
			if (line > 0) {
				atRisk = betAmount;
				toWin = betAmount * line / 100;
			} else {
				atRisk = betAmount * Math.abs(line) / 100;
				toWin = betAmount;
			}
		} else if (betType === 'risk') {
			atRisk = betAmount;
			if (line > 0) {
				toWin = betAmount * line / 100;
			} else {
				toWin = betAmount / Math.abs(line) * 100;
			}
		}
	}

	if (action === 'actionReverse' || action === 'winReverse') {
		if (betType === 'wager') {
			atRisk = (wagerPicks.length - 1) * wagerPicks.length * betAmount;
			toWin = (wagerPicks.length - 1) * 2 * line;
		} else if (betType === 'risk') {
			atRisk = betAmount;
			toWin = line / (wagerPicks.length / 2);
		}
	}
	return { atRisk: Math.round(atRisk) || 0, toWin: Math.round(toWin) || 0 };
};

exports.default = generateAtRiskToWin;
//# sourceMappingURL=generateAtRiskToWin.js.map