'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var straight = function straight(_ref, Picks) {
	var toWin = _ref.toWin,
	    atRisk = _ref.atRisk;


	var isClosed = false;
	var status = 'Pending';
	var resultAmount = null;
	var note = {};

	switch (Picks[0].status) {
		case 'Pending':
			break;
		case 'Won':
			isClosed = true;
			status = 'Won';
			resultAmount = Number(toWin);
			break;
		case 'Won Half':
			isClosed = true;
			status = 'Won';
			resultAmount = Number(toWin) / 2;
			break;
		case 'Lost':
			isClosed = true;
			status = 'Lost';
			resultAmount = -Number(atRisk);
			break;
		case 'Lost Half':
			isClosed = true;
			status = 'Lost';
			resultAmount = -Number(atRisk / 2);
			break;
		case 'Push':
			isClosed = true;
			status = 'Push';
			resultAmount = 0;
			break;
		case 'Postponed':
		case 'Cancelled':
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

exports.default = straight;
//# sourceMappingURL=straight.js.map