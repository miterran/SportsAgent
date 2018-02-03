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

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _apn = require('../../apn');

var _apn2 = _interopRequireDefault(_apn);

var _apn3 = require('apn');

var _apn4 = _interopRequireDefault(_apn3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var updateBetOrderResult = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var betOrders, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, betOrder, allPicksPending, update, newBetOrder, player, agent, agentNotify, playerNotify;

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
							_context.next = 46;
							break;
						}

						betOrder = _step.value;
						allPicksPending = _lodash2.default.every(betOrder.Picks, { status: 'Pending' });

						if (!allPicksPending) {
							_context.next = 17;
							break;
						}

						return _context.abrupt('continue', 43);

					case 17:
						update = (0, _settleBetOrder2.default)(betOrder);

						if (!(update.status === 'Pending')) {
							_context.next = 20;
							break;
						}

						return _context.abrupt('continue', 43);

					case 20:
						_context.next = 22;
						return _BetOrder2.default.findOneAndUpdate({ _id: betOrder._id }, { $set: _lodash2.default.merge(update, { updatedAt: (0, _moment2.default)() }) }, { new: true }).populate('Agent').populate('Player');

					case 22:
						newBetOrder = _context.sent;

						if (newBetOrder.isClosed) {
							_context.next = 25;
							break;
						}

						return _context.abrupt('continue', 43);

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
						if (!newBetOrder.Agent.notification.afterBetOrder) {
							_context.next = 38;
							break;
						}

						agentNotify = new _apn4.default.Notification({
							sound: 'ping.aiff',
							alert: newBetOrder.Player.username + '\'s ' + newBetOrder.title + ' had ' + newBetOrder.status + ' ' + (newBetOrder.resultAmount === 0 ? '' : newBetOrder.resultAmount),
							topic: _config2.default.APN_TOPIC,
							payload: { BetOrder: newBetOrder.BetOrder }
						});
						_context.next = 38;
						return _apn2.default.send(agentNotify, newBetOrder.Agent.notification.deviceToken);

					case 38:
						if (!newBetOrder.Player.notification.afterBetOrder) {
							_context.next = 42;
							break;
						}

						playerNotify = new _apn4.default.Notification({
							sound: 'ping.aiff',
							alert: 'Your ' + newBetOrder.title + ' had ' + newBetOrder.status + ' ' + (newBetOrder.resultAmount === 0 ? '' : newBetOrder.resultAmount),
							topic: _config2.default.APN_TOPIC,
							payload: { BetOrder: newBetOrder.BetOrder }
						});
						_context.next = 42;
						return _apn2.default.send(playerNotify, newBetOrder.Player.notification.deviceToken);

					case 42:

						_apn2.default.shutdown();

					case 43:
						_iteratorNormalCompletion = true;
						_context.next = 12;
						break;

					case 46:
						_context.next = 52;
						break;

					case 48:
						_context.prev = 48;
						_context.t0 = _context['catch'](10);
						_didIteratorError = true;
						_iteratorError = _context.t0;

					case 52:
						_context.prev = 52;
						_context.prev = 53;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 55:
						_context.prev = 55;

						if (!_didIteratorError) {
							_context.next = 58;
							break;
						}

						throw _iteratorError;

					case 58:
						return _context.finish(55);

					case 59:
						return _context.finish(52);

					case 60:
						_context.next = 66;
						break;

					case 62:
						_context.prev = 62;
						_context.t1 = _context['catch'](1);
						_context.next = 66;
						return _SystemLog2.default.create({ title: 'update bet order result failed', content: '' + _context.t1, status: 'danger' });

					case 66:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[1, 62], [10, 48, 52, 60], [53,, 55, 59]]);
	}));

	return function updateBetOrderResult() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = updateBetOrderResult;
//# sourceMappingURL=index.js.map