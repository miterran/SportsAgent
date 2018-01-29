'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _teaserOddLine = require('../../collections/teaserOddLine');

var _teaserOddLine2 = _interopRequireDefault(_teaserOddLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var teaser = function teaser(_ref, Picks) {
	var action = _ref.action,
	    toWin = _ref.toWin,
	    atRisk = _ref.atRisk,
	    betAmount = _ref.amount,
	    betType = _ref.type;


	//	const picksHaveWon       = _.some(Picks, { status: 'Won' });			
	var picksHaveLost = _lodash2.default.some(Picks, { status: 'Lost' });
	var picksHavePush = _lodash2.default.some(Picks, { status: 'Push' });
	var picksHavePostponed = _lodash2.default.some(Picks, { status: 'Postponed' });
	var picksHaveCancelled = _lodash2.default.some(Picks, { status: 'Cancelled' });
	var picksHaveReview = _lodash2.default.some(Picks, { status: 'Review' });
	var picksHavePending = _lodash2.default.some(Picks, { status: 'Pending' });

	//	const allPicksWon        = _.every(Picks, { status: 'Won' });
	//	const allPicksLost       = _.every(Picks, { status: 'Lost' });
	//	const allPicksPush       = _.every(Picks, { status: 'Push' });
	//	const allPicksCancelled  = _.every(Picks, { status: 'Postponed' });
	//	const allPicksPostponed  = _.every(Picks, { status: 'Canceled' });
	//	const allPicksReview     = _.every(Picks, { status: 'Review' });
	//	const allPicksPending    = _.every(Picks, { status: 'Pending' });

	var picksWonCounter = Picks.reduce(function (total, pick) {
		return total + (pick.status === 'Won');
	}, 0);
	//	const picksLength = Picks.length;

	var isClosed = false;
	var status = 'Pending';
	var resultAmount = null;
	var note = {};

	if (action !== 'superTeaser') {
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
			case picksWonCounter >= 2:
				var line = _teaserOddLine2.default[action][picksWonCounter];
				var wagerResultAmount = line > 0 ? betAmount * line / 100 : betAmount;
				var riskResultAmount = line > 0 ? betAmount * line / 100 : betAmount / Math.abs(line) * 100;
				resultAmount = betType === 'wager' ? wagerResultAmount : riskResultAmount;
				isClosed = true;
				status = 'Won';
				break;
			case picksHavePush:
			case picksWonCounter === 1:
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
	} else {
		switch (true) {
			case picksHavePush:
			case picksHaveLost:
				isClosed = true;
				status = 'Lost';
				resultAmount = -Number(atRisk);
				break;
			case picksWonCounter === 3:
				isClosed = true;
				status = 'Won';
				resultAmount = Number(toWin);
				break;
			case picksHavePending:
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
	}
	return { isClosed: isClosed, status: status, resultAmount: _lodash2.default.isNumber(resultAmount) ? Math.round(resultAmount) : null, note: note };
};
exports.default = teaser;
//# sourceMappingURL=teaser.js.map