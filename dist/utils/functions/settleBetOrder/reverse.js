'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var permutation = function permutation(arr) {
	var permutations = [];
	var swap = function swap(a, b) {
		var tmp = arr[a];
		arr[a] = arr[b];
		arr[b] = tmp;
	};
	var generate = function generate(n) {
		if (n === 1) {
			var newArr = arr.slice(0, 2);
			permutations.push(newArr);
		} else {
			for (var i = 0; i !== n; ++i) {
				generate(n - 1);
				swap(n % 2 ? 0 : i, n - 1);
			}
		}
	};
	generate(arr.length);
	return permutations;
};

var multiDimensionalUnique = function multiDimensionalUnique(arr) {
	var uniques = [];
	var itemsFound = {};
	for (var i = 0, l = arr.length; i < l; i++) {
		var stringified = JSON.stringify(arr[i]);
		if (itemsFound[stringified]) {
			continue;
		}
		uniques.push(arr[i]);
		itemsFound[stringified] = true;
	}
	return uniques;
};

var reverse = function reverse(_ref, Picks) {
	var action = _ref.action,
	    atRisk = _ref.atRisk,
	    betType = _ref.type,
	    betAmount = _ref.amount;


	//	const picksHaveWon       = _.some(Picks, { status: 'Won' });			
	//	const picksHaveLost      = _.some(Picks, { status: 'Lost' });		
	//	const picksHavePush      = _.some(Picks, { status: 'Push' });		
	//	const picksHavePostponed = _.some(Picks, { status: 'Postponed' });
	//	const picksHaveCancelled = _.some(Picks, { status: 'Cancelled' });
	var picksHaveReview = _lodash2.default.some(Picks, { status: 'Review' });
	var picksHavePending = _lodash2.default.some(Picks, { status: 'Pending' });

	//	const allPicksWon        = _.every(Picks, { status: 'Won' });
	var allPicksLost = _lodash2.default.every(Picks, { status: 'Lost' });
	//	const allPicksPush       = _.every(Picks, { status: 'Push' });
	var allPicksCancelled = _lodash2.default.every(Picks, { status: 'Postponed' });
	var allPicksPostponed = _lodash2.default.every(Picks, { status: 'Cancelled' });
	//	const allPicksReview     = _.every(Picks, { status: 'Review' });
	//	const allPicksPending    = _.every(Picks, { status: 'Pending' });

	var picksRange = _lodash2.default.range(Picks.length);
	var inOrders = permutation(picksRange);
	var orders = multiDimensionalUnique(inOrders);

	var isClosed = false;
	var status = 'Pending';
	var resultAmount = null;
	var note = {};

	switch (true) {

		case allPicksLost:
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

		case allPicksCancelled:
		case allPicksPostponed:
			isClosed = true;
			status = 'Cancelled';
			resultAmount = 0;
			break;

		default:

			orders.forEach(function (order) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = order[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var idx = _step.value;
						var _Picks$idx = Picks[idx],
						    _status = _Picks$idx.status,
						    oddLine = _Picks$idx.marked.oddLine;

						var pickRiskAmount = atRisk / ((Picks.length - 1) * Picks.length);
						switch (_status) {
							case 'Won':
								resultAmount += oddLine > 0 ? pickRiskAmount * oddLine / 100 : pickRiskAmount / Math.abs(oddLine) * 100;
								break;
							case 'Lost':
								resultAmount -= pickRiskAmount;
								return;
							case 'Push':
							case 'Cancelled':
							case 'Postponed':
								resultAmount += 0;
								//					if(action === 'actionReverse') break;
								if (action === 'winReverse') return;
								break;
							default:
								break;

						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			});

			isClosed = true;
			if (resultAmount === 0) {
				status = 'Push';
			}
			if (resultAmount > 0) {
				status = 'Won';
			}
			if (resultAmount < 0) {
				status = 'Lost';
			}
			break;

	}

	return { isClosed: isClosed, status: status, resultAmount: _lodash2.default.isNumber(resultAmount) ? Math.round(resultAmount) : null, note: note };
};

exports.default = reverse;
//# sourceMappingURL=reverse.js.map