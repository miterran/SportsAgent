'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Mutation = exports.Query = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _User = require('../../../models/User');

var _User2 = _interopRequireDefault(_User);

var _User3 = require('../../../models/User.Agent');

var _User4 = _interopRequireDefault(_User3);

var _User5 = require('../../../models/User.Player');

var _User6 = _interopRequireDefault(_User5);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _SystemLog = require('../../../models/SystemLog');

var _SystemLog2 = _interopRequireDefault(_SystemLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = exports.Query = {
	user: function user(root, req, ctx) {
		return _User2.default.findOne({ _id: _mongoose2.default.Types.ObjectId(ctx.user._id) });
	},
	agent: function agent(root, req, ctx) {
		if (ctx.user && ctx.user.role !== 'Agent') return null;
		return _User4.default.findOne({ _id: _mongoose2.default.Types.ObjectId(ctx.user._id) });
	},
	player: function player(root, req, ctx) {
		if (ctx.user.role === 'Guest') return null;
		return _User6.default.findOne({ _id: _mongoose2.default.Types.ObjectId(ctx.user._id) });
	},
	agentPlayers: function agentPlayers(root, req, ctx) {
		if (ctx.user.role !== 'Agent') return null;
		return _User6.default.find({ Agent: _mongoose2.default.Types.ObjectId(ctx.user._id) });
	},
	agentPlayer: function agentPlayer(root, req, ctx) {
		if (ctx.user.role !== 'Agent' || req.Player === '') return null;
		return _User6.default.findOne({ _id: _mongoose2.default.Types.ObjectId(req.Player) });
	}
};

var Mutation = exports.Mutation = {
	switchPlayerActivate: function switchPlayerActivate(root, req, ctx) {
		var _this = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			var player;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (!(ctx.user.role !== 'Agent')) {
								_context.next = 2;
								break;
							}

							return _context.abrupt('return', { title: 'Not Authenticated', content: 'Please try again.', status: 'warning' });

						case 2:
							_context.next = 4;
							return _User6.default.findOneAndUpdate({ Agent: _mongoose2.default.Types.ObjectId(ctx.user._id), _id: _mongoose2.default.Types.ObjectId(req.Player) }, { $set: { isActivate: req.isActivate } }, { new: true });

						case 4:
							player = _context.sent;

							if (player) {
								_context.next = 7;
								break;
							}

							return _context.abrupt('return', { title: 'Not Authenticated', content: 'Please try again.', status: 'warning' });

						case 7:
							return _context.abrupt('return', { title: player.username, content: player.isActivate, status: 'success' });

						case 8:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}))();
	},
	playerMutation: function playerMutation(root, req, ctx) {
		var _this2 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
			var agent, player;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;

							if (!(ctx.user.role !== 'Agent')) {
								_context2.next = 3;
								break;
							}

							return _context2.abrupt('return', { title: 'Not Authenticated', content: 'Please try again.', status: 'warning' });

						case 3:
							if (!_lodash2.default.isEmpty(req.Player)) {
								_context2.next = 5;
								break;
							}

							return _context2.abrupt('return', { title: 'Missing Player', content: 'Please try again.', status: 'warning' });

						case 5:
							if (!_lodash2.default.isEmpty(req.passcode)) {
								_context2.next = 7;
								break;
							}

							return _context2.abrupt('return', { title: 'Missing Passcode', content: 'Please try again.', status: 'warning' });

						case 7:
							_context2.next = 9;
							return _User4.default.findOne({ _id: _mongoose2.default.Types.ObjectId(ctx.user._id) }, 'passcode');

						case 9:
							agent = _context2.sent;

							if (!(agent.passcode !== req.passcode)) {
								_context2.next = 12;
								break;
							}

							return _context2.abrupt('return', { title: 'Not Authenticated', content: 'Please try again.', status: 'warning' });

						case 12:
							_context2.next = 14;
							return _User6.default.findOne({ Agent: _mongoose2.default.Types.ObjectId(ctx.user._id), _id: _mongoose2.default.Types.ObjectId(req.Player) });

						case 14:
							player = _context2.sent;

							if (player) {
								_context2.next = 17;
								break;
							}

							return _context2.abrupt('return', { title: 'Not Authenticated', content: 'Please try again.', status: 'warning' });

						case 17:
							if (_lodash2.default.isEmpty(req.newNickname)) {
								_context2.next = 20;
								break;
							}

							_context2.next = 20;
							return _User6.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(req.Player) }, { $set: { nickname: req.newNickname } });

						case 20:
							if (_lodash2.default.isEmpty(req.newPassword)) {
								_context2.next = 23;
								break;
							}

							_context2.next = 23;
							return _User6.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(req.Player) }, { $set: { password: req.newPassword } });

						case 23:
							if (_lodash2.default.isEmpty(req.newPasscode)) {
								_context2.next = 26;
								break;
							}

							_context2.next = 26;
							return _User6.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(req.Player) }, { $set: { passcode: req.newPasscode } });

						case 26:
							if (_lodash2.default.isEmpty(req.newInitial)) {
								_context2.next = 29;
								break;
							}

							_context2.next = 29;
							return _User6.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(req.Player) }, { $set: { 'credit.initial': Number(req.newInitial) } });

						case 29:
							if (_lodash2.default.isEmpty(req.newMaxWin)) {
								_context2.next = 32;
								break;
							}

							_context2.next = 32;
							return _User6.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(req.Player) }, { $set: { 'wagerLimit.maxWin': Number(req.newMaxWin) } });

						case 32:
							if (_lodash2.default.isEmpty(req.newMinRisk)) {
								_context2.next = 35;
								break;
							}

							_context2.next = 35;
							return _User6.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(req.Player) }, { $set: { 'wagerLimit.minRisk': Number(req.newMinRisk) } });

						case 35:
							if (!req.isSetNewWagerLimit) {
								_context2.next = 38;
								break;
							}

							_context2.next = 38;
							return _User6.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(req.Player) }, { $set: {
									'wagerLimit.parlay': req.newParlay,
									'wagerLimit.parlayTeam': req.newParlayTeam,
									'wagerLimit.basicTeaser': req.newBasicTeaser,
									'wagerLimit.basicTeaserTeam': req.newBasicTeaserTeam,
									'wagerLimit.specialTeaser': req.newSpecialTeaser,
									'wagerLimit.specialTeaserTeam': req.newSpecialTeaserTeam,
									'wagerLimit.bigTeaser': req.newBigTeaser,
									'wagerLimit.bigTeaserTeam': req.newBigTeaserTeam,
									'wagerLimit.superTeaser': req.newSuperTeaser,
									'wagerLimit.winReverse': req.newWinReverse,
									'wagerLimit.winReverseTeam': req.newWinReverseTeam,
									'wagerLimit.actionReverse': req.newActionReverse,
									'wagerLimit.actionReverseTeam': req.newActionReverseTeam,
									'wagerLimit.updatedAt': (0, _moment2.default)()
								} });

						case 38:
							_context2.next = 40;
							return _SystemLog2.default.create({ title: 'Updated Player', content: ctx.user.username + ' Updated Player ' + player.username, status: 'success' });

						case 40:
							return _context2.abrupt('return', { title: 'Edit', content: 'Successful', status: 'success' });

						case 43:
							_context2.prev = 43;
							_context2.t0 = _context2['catch'](0);
							_context2.next = 47;
							return _SystemLog2.default.create({ title: 'Update Player Failed', content: ctx.user.username + ' Updated Player Failed ' + req.Player + ' ' + _context2.t0, status: 'danger' });

						case 47:
							return _context2.abrupt('return', { title: 'Unknow Error', content: 'Please try again later!', status: 'danger' });

						case 48:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this2, [[0, 43]]);
		}))();
	}
};
//# sourceMappingURL=index.js.map