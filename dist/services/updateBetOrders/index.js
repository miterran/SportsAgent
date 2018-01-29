'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _BetOrder = require('../../models/BetOrder');

var _BetOrder2 = _interopRequireDefault(_BetOrder);

var _User = require('../../models/User.Player');

var _User2 = _interopRequireDefault(_User);

var _User3 = require('../../models/User.Agent');

var _User4 = _interopRequireDefault(_User3);

var _SystemLog = require('../../models/SystemLog');

var _SystemLog2 = _interopRequireDefault(_SystemLog);

var _settleBetOrder = require('../../utils/functions/settleBetOrder');

var _settleBetOrder2 = _interopRequireDefault(_settleBetOrder);

var _Transaction = require('../../models/Transaction');

var _Transaction2 = _interopRequireDefault(_Transaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var updateBetOrderResult = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var betOrders, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, betOrder, allPicksPending, update, newBetOrder, player, agent;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						// eslint-disable-next-line
						console.log('update bet order result');
						_context.prev = 1;
						_context.next = 4;
						return _BetOrder2.default.find({ isClosed: false, status: 'Pending' }, 'Player Agent bet Picks').populate({ path: 'Picks', select: 'status marked.oddLine' });

					case 4:
						betOrders = _context.sent;

						if (!_lodash2.default.isEmpty(betOrders)) {
							_context.next = 7;
							break;
						}

						return _context.abrupt('return');

					case 7:
						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 10;
						_iterator = betOrders[Symbol.iterator]();

					case 12:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 37;
							break;
						}

						betOrder = _step.value;
						allPicksPending = _lodash2.default.every(betOrder.Picks, { status: 'Pending' });

						if (!allPicksPending) {
							_context.next = 17;
							break;
						}

						return _context.abrupt('continue', 34);

					case 17:
						update = (0, _settleBetOrder2.default)(betOrder);

						if (!(update.status === 'Pending')) {
							_context.next = 20;
							break;
						}

						return _context.abrupt('continue', 34);

					case 20:
						_context.next = 22;
						return _BetOrder2.default.findOneAndUpdate({ _id: betOrder._id }, { $set: _lodash2.default.merge(update, { updatedAt: (0, _moment2.default)() }) }, { new: true });

					case 22:
						newBetOrder = _context.sent;

						if (newBetOrder.isClosed) {
							_context.next = 25;
							break;
						}

						return _context.abrupt('continue', 34);

					case 25:
						_context.next = 27;
						return _User2.default.findOneAndUpdate({ _id: newBetOrder.Player }, {
							'$inc': {
								'credit.balance': Number(newBetOrder.resultAmount),
								'credit.pending': -Number(newBetOrder.bet.atRisk)
							},
							'$set': {
								'credit.updatedAt': (0, _moment2.default)()
							}
						}, {
							new: true
						});

					case 27:
						player = _context.sent;
						_context.next = 30;
						return _User4.default.findOneAndUpdate({ _id: newBetOrder.Agent }, {
							'$inc': {
								'credit.balance': newBetOrder.status === 'Lost' ? Number(newBetOrder.resultAmount) : 0,
								'credit.pending': -Number(newBetOrder.bet.atRisk)
							},
							'$set': {
								'credit.updatedAt': (0, _moment2.default)()
							}
						}, {
							new: true
						});

					case 30:
						agent = _context.sent;

						if (!(newBetOrder.status === 'Lost')) {
							_context.next = 34;
							break;
						}

						_context.next = 34;
						return _Transaction2.default.create({
							Agent: agent._id,
							ID: newBetOrder.ID,
							type: 'BetOrder',
							description: '(' + player.username + ') Lost ' + newBetOrder.title,
							amount: Number(newBetOrder.resultAmount),
							balance: agent.credit.balance
						});

					case 34:
						_iteratorNormalCompletion = true;
						_context.next = 12;
						break;

					case 37:
						_context.next = 43;
						break;

					case 39:
						_context.prev = 39;
						_context.t0 = _context['catch'](10);
						_didIteratorError = true;
						_iteratorError = _context.t0;

					case 43:
						_context.prev = 43;
						_context.prev = 44;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 46:
						_context.prev = 46;

						if (!_didIteratorError) {
							_context.next = 49;
							break;
						}

						throw _iteratorError;

					case 49:
						return _context.finish(46);

					case 50:
						return _context.finish(43);

					case 51:
						_context.next = 57;
						break;

					case 53:
						_context.prev = 53;
						_context.t1 = _context['catch'](1);
						_context.next = 57;
						return _SystemLog2.default.create({ title: 'update bet order result failed', content: '' + _context.t1, status: 'danger' });

					case 57:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[1, 53], [10, 39, 43, 51], [44,, 46, 50]]);
	}));

	return function updateBetOrderResult() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = updateBetOrderResult;
//# sourceMappingURL=index.js.map