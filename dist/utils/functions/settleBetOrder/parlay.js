'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parlay = function parlay(_ref, Picks) {
	var atRisk = _ref.atRisk,
	    betType = _ref.type,
	    betAmount = _ref.amount;


	var picksHaveWon = _lodash2.default.some(Picks, { status: 'Won' });
	var picksHaveLost = _lodash2.default.some(Picks, { status: 'Lost' });
	var picksHavePush = _lodash2.default.some(Picks, { status: 'Push' });
	var picksHavePostponed = _lodash2.default.some(Picks, { status: 'Postponed' });
	var picksHaveCancelled = _lodash2.default.some(Picks, { status: 'Cancelled' });
	var picksHaveReview = _lodash2.default.some(Picks, { status: 'Review' });
	var picksHavePending = _lodash2.default.some(Picks, { status: 'Pending' });

	//	const allPicksWon        = _.every(Picks, { status: 'Won' });
	//	const allPicksLost       = _.every(Picks, { status: 'Lost' })
	//	const allPicksPush       = _.every(Picks, { status: 'Push' });
	//	const allPicksCancelled  = _.every(Picks, { status: 'Postponed' })
	//	const allPicksPostponed  = _.every(Picks, { status: 'Cancelled' })
	//	const allPicksReview     = _.every(Picks, { status: 'Review' })
	//	const allPicksPending    = _.every(Picks, { status: 'Pending' })

	var isClosed = false;
	var status = 'Pending';
	var resultAmount = null;
	var note = {};

	switch (true) {

		case picksHaveLost:
			isClosed = true;
			status = 'Lost';
			resultAmount = -Number(atRisk);
			break;

		case picksHaveReview:
			status = 'Review';
			note = { title: 'Review', content: 'To be determine!', status: 'warning' };
			break;

		case picksHavePending:
			break;

		case picksHaveWon:
			var parlayLine = _lodash2.default.compact(Picks.map(function (_ref2) {
				var status = _ref2.status,
				    oddLine = _ref2.marked.oddLine;
				return status === 'Won' ? oddLine > 0 ? (oddLine + 100) / 100 : (Math.abs(oddLine) + 100) / Math.abs(oddLine) : null;
			})).reduce(function (a, b) {
				return a * b;
			}) - 1;
			var line = parlayLine > 1 ? parlayLine * 100 : -(100 / parlayLine);
			var wagerResultAmount = line > 0 ? betAmount * line / 100 : betAmount;
			var riskResultAmount = line > 0 ? betAmount * line / 100 : betAmount / Math.abs(line) * 100;
			resultAmount = betType === 'wager' ? wagerResultAmount : riskResultAmount;
			isClosed = true;
			status = 'Won';
			break;

		case picksHavePush:
			isClosed = true;
			status = 'Push';
			resultAmount = 0;
			break;

		case picksHavePostponed:
		case picksHaveCancelled:
			isClosed = true;
			status = 'Cancelled';
			resultAmount = 0;
			break;

		default:
			status = 'Review';
			note = { title: 'Review', content: 'To be determine!', status: 'warning' };
			break;
	}
	return { isClosed: isClosed, status: status, resultAmount: _lodash2.default.isNumber(resultAmount) ? Math.round(resultAmount) : null, note: note };
};

exports.default = parlay;
//# sourceMappingURL=parlay.js.map