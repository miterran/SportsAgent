'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Mutation = exports.Query = undefined;

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

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

var _PriceRate = require('../../../models/PriceRate');

var _PriceRate2 = _interopRequireDefault(_PriceRate);

var _SystemLog = require('../../../models/SystemLog');

var _SystemLog2 = _interopRequireDefault(_SystemLog);

var _Receipt = require('../../../models/Receipt');

var _Receipt2 = _interopRequireDefault(_Receipt);

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

var Mutation = exports.Mutation = {
	adjustAgentCredit: function adjustAgentCredit(root, req, ctx) {
		var _this2 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
			var agent;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;

							if (!(req.MK !== _config2.default.MK)) {
								_context2.next = 3;
								break;
							}

							return _context2.abrupt('return', { title: 'Not Authenticated', content: 'Please try again.', status: 'danger' });

						case 3:
							_context2.next = 5;
							return _User2.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(req.Agent) }, { $inc: { 'credit.balance': req.amount } }, { new: true });

						case 5:
							agent = _context2.sent;

							if (agent) {
								_context2.next = 8;
								break;
							}

							return _context2.abrupt('return', { title: 'Agent Not Found', content: 'Please try again', status: 'warning' });

						case 8:
							_context2.next = 10;
							return _Transaction2.default.create({
								ID: _uniqid2.default.process(),
								Agent: req.Agent,
								type: 'Adjust',
								description: 'credit adjust',
								createdAt: (0, _moment2.default)(),
								amount: req.amount,
								balance: agent.credit.balance
							});

						case 10:
							return _context2.abrupt('return', { title: 'Agent Credit Adjust', content: 'added ' + req.amount + ', new balance ' + agent.credit.balance, status: 'success' });

						case 13:
							_context2.prev = 13;
							_context2.t0 = _context2['catch'](0);
							return _context2.abrupt('return', { title: 'Agent Credit Adjust Failed', content: _context2.t0, status: 'danger' });

						case 16:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this2, [[0, 13]]);
		}))();
	},
	purchaseCredit: function purchaseCredit(root, req, ctx) {
		var _this3 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
			var product, agent, theID;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							if (!(ctx.user.role !== 'Agent')) {
								_context3.next = 2;
								break;
							}

							return _context3.abrupt('return', { title: 'Not Authenticated', content: 'Please try again.', status: 'danger' });

						case 2:
							_context3.prev = 2;
							_context3.next = 5;
							return _PriceRate2.default.findOne({ item: req.item });

						case 5:
							product = _context3.sent;
							_context3.next = 8;
							return _User2.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(ctx.user._id) }, { $inc: { 'credit.balance': product.credit } }, { new: true });

						case 8:
							agent = _context3.sent;
							theID = _uniqid2.default.process();
							_context3.next = 12;
							return _Receipt2.default.create({
								ID: theID,
								Agent: ctx.user._id,
								platform: req.platform,
								data: req.receipt,
								usd: product.usd,
								credit: product.credit,
								item: product.item,
								createdAt: (0, _moment2.default)()
							});

						case 12:
							_context3.next = 14;
							return _Transaction2.default.create({
								ID: theID,
								Agent: ctx.user._id,
								type: 'Purchase',
								description: 'Purchased ' + product.credit + ' credit ($' + product.usd + ')',
								createdAt: (0, _moment2.default)(),
								amount: product.credit,
								balance: agent.credit.balance
							});

						case 14:
							_context3.next = 16;
							return _SystemLog2.default.create({ title: 'Credit Purchase Success', content: ctx.user.username + ' purchased credit ' + req.item + ' ' + req.platform + ' ' + req.receipt, status: 'success' });

						case 16:
							return _context3.abrupt('return', { title: 'Completed', content: agent.credit.balance, status: 'success' });

						case 19:
							_context3.prev = 19;
							_context3.t0 = _context3['catch'](2);
							_context3.next = 23;
							return _SystemLog2.default.create({ title: 'Credit Purchase Failed', content: ctx.user.username + ' purchase credit Failed ' + req.item + ' ' + req.platform + ' ' + req.receipt + ' ' + _context3.t0, status: 'danger' });

						case 23:
							return _context3.abrupt('return', { title: 'Failed', content: 'Please try again.', status: 'danger' });

						case 24:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, _this3, [[2, 19]]);
		}))();
	}
};
//# sourceMappingURL=index.js.map