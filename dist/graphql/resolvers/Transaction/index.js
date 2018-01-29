'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Query = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Transaction = require('../../../models/Transaction');

var _Transaction2 = _interopRequireDefault(_Transaction);

var _BetOrder = require('../../../models/BetOrder');

var _BetOrder2 = _interopRequireDefault(_BetOrder);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _uniqid = require('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _User = require('../../../models/User.Agent');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = exports.Query = {
	transactions: function transactions(root, _ref, ctx) {
		var _this = this;

		var startOfWeekNum = _ref.startOfWeekNum,
		    endOfWeekNum = _ref.endOfWeekNum;
		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			var agent, available, pendingTransactions, transactions, openBets;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (!(ctx.user.role !== 'Agent')) {
								_context.next = 2;
								break;
							}

							return _context.abrupt('return', null);

						case 2:
							_context.next = 4;
							return _User2.default.findOne({ _id: _mongoose2.default.Types.ObjectId(ctx.user._id) });

						case 4:
							agent = _context.sent;
							available = agent.credit.available;
							pendingTransactions = [];
							_context.next = 9;
							return _Transaction2.default.find({
								Agent: _mongoose2.default.Types.ObjectId(ctx.user._id),
								createdAt: { $gte: (0, _moment2.default)().add(Number(startOfWeekNum), 'w').startOf('isoWeek'),
									$lte: (0, _moment2.default)().add(Number(endOfWeekNum), 'w').endOf('isoWeek') }
							}).sort({ createdAt: 'descending' });

						case 9:
							transactions = _context.sent;

							if (!(startOfWeekNum === 0 && endOfWeekNum === 0)) {
								_context.next = 15;
								break;
							}

							_context.next = 13;
							return _BetOrder2.default.find({ Agent: _mongoose2.default.Types.ObjectId(ctx.user._id), isClosed: false }).populate({ path: 'Player', select: 'username' }).sort({ createdAt: 'descending' });

						case 13:
							openBets = _context.sent;

							pendingTransactions = openBets.map(function (openBet) {
								var pending = {
									_id: _uniqid2.default.process(),
									ID: openBet.ID,
									type: 'Pending',
									description: '(' + openBet.Player.username + ') placed ' + openBet.title,
									createdAt: openBet.createdAt,
									amount: openBet.bet.atRisk,
									balance: available
								};
								available += openBet.bet.atRisk;
								return pending;
							});

						case 15:
							return _context.abrupt('return', pendingTransactions.concat(transactions));

						case 16:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}))();
	}
};
//# sourceMappingURL=index.js.map