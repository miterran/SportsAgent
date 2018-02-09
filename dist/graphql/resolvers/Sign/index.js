'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Mutation = exports.Query = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _yup = require('yup');

var _yup2 = _interopRequireDefault(_yup);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

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

var _Transaction = require('../../../models/Transaction');

var _Transaction2 = _interopRequireDefault(_Transaction);

var _SystemLog = require('../../../models/SystemLog');

var _SystemLog2 = _interopRequireDefault(_SystemLog);

var _uniqid = require('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _PriceRate = require('../../../models/PriceRate');

var _PriceRate2 = _interopRequireDefault(_PriceRate);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var transporter = _nodemailer2.default.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: _config2.default.GMAIL, // generated ethereal user
		pass: _config2.default.GPASSWORD // generated ethereal password
	}
});

var forgotPasswordSchema = _yup2.default.object().shape({
	email: _yup2.default.string().email().required(),
	passcode: _yup2.default.string().matches(/^[0-9]+$/, 'Passcode format is invalid.').min(4).max(4).required()
});

var agentRegisterSchema = _yup2.default.object().shape({
	username: _yup2.default.string().matches(/^\w+$/, 'Username format is invalid.').min(4).max(10).required(),
	email: _yup2.default.string().email().required(),
	password: _yup2.default.string().min(4).max(12).required(),
	passcode: _yup2.default.string().matches(/^[0-9]+$/, 'Passcode format is invalid.').min(4).max(4).required(),
	deviceToken: _yup2.default.string()
});

var playerRegisterSchema = _yup2.default.object().shape({
	playerUsername: _yup2.default.string().matches(/^\w+$/, 'Username format is invalid.').min(4 | null, 'Username at least 4 characters.').max(10).required('Username required'),
	playerNickname: _yup2.default.string().matches(/^\w+$/, 'Nickname format is invalid.').max(10).required('Nickname required'),
	playerPassword: _yup2.default.string().min(4 | null, 'Password at least 4 characters.').max(12).required('Password required'),
	playerPasscode: _yup2.default.string().matches(/^[0-9]+$/, 'Passcode format is invalid.').min(4 | null, 'Passcode requires 4 digits.').max(4).required('Passcode required'),
	initial: _yup2.default.number().integer().min(0).max(999999).required(),
	minRisk: _yup2.default.number().integer().positive().min(10 | null, 'Minimun Risk must greater then 10.').max(999999).required(),
	maxWin: _yup2.default.number().integer().min(0).max(999999).required(),
	parlay: _yup2.default.boolean(),
	basicTeaser: _yup2.default.boolean(),
	specialTeaser: _yup2.default.boolean(),
	bigTeaser: _yup2.default.boolean(),
	superTeaser: _yup2.default.boolean(),
	winReverse: _yup2.default.boolean(),
	actionReverse: _yup2.default.boolean(),
	parlayTeam: _yup2.default.number().integer().positive().min(2).max(8).required(),
	basicTeaserTeam: _yup2.default.number().integer().positive().min(2).max(8).required(),
	specialTeaserTeam: _yup2.default.number().integer().positive().min(2).max(8).required(),
	bigTeaserTeam: _yup2.default.number().integer().positive().min(2).max(8).required(),
	winReverseTeam: _yup2.default.number().integer().positive().min(2).max(4).required(),
	actionReverseTeam: _yup2.default.number().integer().positive().min(2).max(4).required(),
	passcode: _yup2.default.string().matches(/^[0-9]+$/, 'Passcode format is invalid.').min(4).max(4).required()
});

var Query = exports.Query = {};

var Mutation = exports.Mutation = {
	agentRegister: function agentRegister(root, req) {
		var _this = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			var isReqValid, isUserExisted, isEmailExisted, newAgentBonus, agent, newAgent;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							_context.next = 3;
							return agentRegisterSchema.isValid(req);

						case 3:
							isReqValid = _context.sent;

							if (isReqValid) {
								_context.next = 9;
								break;
							}

							_context.next = 7;
							return agentRegisterSchema.validate(req).catch(function (err) {
								return err.message;
							});

						case 7:
							_context.t0 = _context.sent;
							return _context.abrupt('return', {
								title: 'Please try again.',
								content: _context.t0,
								status: 'warning'
							});

						case 9:
							_context.next = 11;
							return _User2.default.findOne({ username: new RegExp('\\b' + req.username + '\\b', 'i') });

						case 11:
							isUserExisted = _context.sent;

							if (!isUserExisted) {
								_context.next = 14;
								break;
							}

							return _context.abrupt('return', { title: req.username, content: 'Username has already been taken.', status: 'warning' });

						case 14:
							_context.next = 16;
							return _User2.default.findOne({ email: new RegExp('\\b' + req.email + '\\b', 'i') });

						case 16:
							isEmailExisted = _context.sent;

							if (!isEmailExisted) {
								_context.next = 19;
								break;
							}

							return _context.abrupt('return', { title: req.email, content: 'Email has already been taken.', status: 'warning' });

						case 19:
							_context.next = 21;
							return _PriceRate2.default.findOne({ item: 'NewAgentBonus' });

						case 21:
							newAgentBonus = _context.sent;
							agent = new _User4.default({
								username: req.username,
								email: req.email,
								password: req.password,
								passcode: req.passcode,
								weekNum: (0, _moment2.default)().isoWeek(),
								credit: {
									balance: newAgentBonus.credit
								},
								notification: {
									deviceToken: req.deviceToken
								},
								Players: [],
								deletedPlayers: []
							});
							_context.next = 25;
							return agent.save();

						case 25:
							newAgent = _context.sent;

							console.log(newAgent.notification);
							_context.next = 29;
							return _Transaction2.default.create({
								Agent: newAgent._id,
								ID: _uniqid2.default.process(),
								type: 'Bonus',
								description: 'New Agent Bonus',
								amount: newAgentBonus.credit,
								balance: newAgent.credit.balance
							});

						case 29:
							_context.next = 31;
							return _SystemLog2.default.create({ title: 'New Agent Created', content: req.username, status: 'success' });

						case 31:
							_context.next = 33;
							return _SystemLog2.default.create({ title: 'New Agent Bonus ' + newAgentBonus.credit, content: req.username, status: 'success' });

						case 33:
							return _context.abrupt('return', { title: 'Created New Agent', content: _jsonwebtoken2.default.sign(_lodash2.default.pick(newAgent, ['_id', 'role', 'username']), _config2.default.jwtSecret), status: 'success' });

						case 36:
							_context.prev = 36;
							_context.t1 = _context['catch'](0);
							_context.next = 40;
							return _SystemLog2.default.create({ title: 'New Agent Failed', content: req.username + ' ' + _context.t1, status: 'danger' });

						case 40:
							return _context.abrupt('return', { title: 'Unknow Error', content: 'Please try again later!', status: 'danger' });

						case 41:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this, [[0, 36]]);
		}))();
	},
	login: function login(root, req) {
		var _this2 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
			var deviceToken, user, token;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.prev = 0;
							deviceToken = req.deviceToken ? { $set: { 'notification.deviceToken': req.deviceToken } } : null;
							_context2.next = 4;
							return _User2.default.findOneAndUpdate({ username: new RegExp('\\b' + req.username + '\\b', 'i'), password: req.password }, deviceToken);

						case 4:
							user = _context2.sent;

							if (user) {
								_context2.next = 7;
								break;
							}

							return _context2.abrupt('return', { title: 'Login Failed', content: 'Username or Password is incorrect', status: 'warning' });

						case 7:
							token = _jsonwebtoken2.default.sign(_lodash2.default.pick(user, ['_id', 'role', 'username']), _config2.default.jwtSecret);
							return _context2.abrupt('return', { title: user.role + 'Navigator', content: token, status: 'success' });

						case 11:
							_context2.prev = 11;
							_context2.t0 = _context2['catch'](0);
							return _context2.abrupt('return', { title: 'Unknow Error', content: 'Please try again later!', status: 'danger' });

						case 14:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this2, [[0, 11]]);
		}))();
	},
	playerRegister: function playerRegister(root, req, ctx) {
		var _this3 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
			var agent, isReqValid, isUserExisted, player, newPlayer, newPriceCost, agentUpdated;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.prev = 0;

							if (!(ctx.user.role !== 'Agent')) {
								_context3.next = 3;
								break;
							}

							return _context3.abrupt('return', { title: 'Not Authenticated', content: 'Please try again.', status: 'danger' });

						case 3:
							_context3.next = 5;
							return _User4.default.findOne({ _id: _mongoose2.default.Types.ObjectId(ctx.user._id), passcode: req.passcode });

						case 5:
							agent = _context3.sent;

							if (agent) {
								_context3.next = 8;
								break;
							}

							return _context3.abrupt('return', { title: 'Passcode Not Match', content: 'Please try again.', status: 'warning' });

						case 8:
							_context3.next = 10;
							return playerRegisterSchema.isValid(req);

						case 10:
							isReqValid = _context3.sent;

							if (isReqValid) {
								_context3.next = 16;
								break;
							}

							_context3.next = 14;
							return playerRegisterSchema.validate(req).catch(function (err) {
								return err.message;
							});

						case 14:
							_context3.t0 = _context3.sent;
							return _context3.abrupt('return', {
								title: 'Please try again.',
								content: _context3.t0,
								status: 'warning'
							});

						case 16:
							_context3.next = 18;
							return _User2.default.findOne({ username: new RegExp('\\b' + req.playerUsername + '\\b', 'i') }, '_id');

						case 18:
							isUserExisted = _context3.sent;

							if (!isUserExisted) {
								_context3.next = 21;
								break;
							}

							return _context3.abrupt('return', { title: req.playerUsername, content: 'Username has already been taken.', status: 'warning' });

						case 21:
							player = new _User6.default({
								portrait: '/',
								username: req.playerUsername,
								nickname: req.playerNickname,
								password: req.playerPassword,
								passcode: req.playerPasscode,
								Agent: ctx.user._id,
								weekNum: (0, _moment2.default)().isoWeek(),
								isActivate: true,
								isDeleted: false,
								credit: {
									initial: Number(req.initial)
								},
								notification: {},
								wagerLimit: {
									parlay: req.parlay,
									basicTeaser: req.basicTeaser,
									specialTeaser: req.specialTeaser,
									bigTeaser: req.bigTeaser,
									superTeaser: req.superTeaser,
									actionReverse: req.actionReverse,
									winReverse: req.winReverse,
									maxWin: Number(req.maxWin),
									minRisk: Number(req.minRisk),
									parlayTeam: req.parlayTeam,
									basicTeaserTeam: req.basicTeaserTeam,
									specialTeaserTeam: req.specialTeaserTeam,
									bigTeaserTeam: req.bigTeaserTeam,
									actionReverseTeam: req.actionReverseTeam,
									winReverseTeam: req.winReverseTeam
								}
							});
							_context3.next = 24;
							return player.save();

						case 24:
							newPlayer = _context3.sent;
							_context3.next = 27;
							return _PriceRate2.default.findOne({ item: 'NewPlayerCost' });

						case 27:
							newPriceCost = _context3.sent;
							_context3.next = 30;
							return _User4.default.findOneAndUpdate({
								_id: _mongoose2.default.Types.ObjectId(ctx.user._id)
							}, {
								$push: { Players: newPlayer._id },
								$inc: { 'credit.balance': newPriceCost.credit },
								$set: { 'credit.updatedAt': (0, _moment2.default)() }
							}, { new: true });

						case 30:
							agentUpdated = _context3.sent;
							_context3.next = 33;
							return _Transaction2.default.create({
								Agent: ctx.user._id,
								ID: _uniqid2.default.process(),
								type: 'CreatePlayer',
								description: 'New Player ' + newPlayer.username + ' (' + newPlayer.nickname + ')',
								amount: newPriceCost.credit,
								balance: agentUpdated.credit.balance
							});

						case 33:
							_context3.next = 35;
							return _SystemLog2.default.create({ title: 'New Player Created', content: agentUpdated.username + ' created a new player ' + newPlayer.username + ' (' + newPlayer.nickname + ')', status: 'success' });

						case 35:
							return _context3.abrupt('return', { title: 'New Player', content: newPlayer.username, status: 'success' });

						case 38:
							_context3.prev = 38;
							_context3.t1 = _context3['catch'](0);
							_context3.next = 42;
							return _SystemLog2.default.create({ title: 'New Player Create Failed', content: ctx.user.username + ' create player ' + req.playerUsername + ' failed ' + _context3.t1, status: 'danger' });

						case 42:
							return _context3.abrupt('return', { title: 'Unknow Error', content: 'Please try again later!', status: 'danger' });

						case 43:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, _this3, [[0, 38]]);
		}))();
	},
	forgotPassword: function forgotPassword(root, req) {
		var _this4 = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
			var isReqValid, tempPassword, agent, mailOptions;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.prev = 0;
							_context4.next = 3;
							return forgotPasswordSchema.isValid(req);

						case 3:
							isReqValid = _context4.sent;

							if (isReqValid) {
								_context4.next = 9;
								break;
							}

							_context4.next = 7;
							return forgotPasswordSchema.validate(req).catch(function (err) {
								return err.message;
							});

						case 7:
							_context4.t0 = _context4.sent;
							return _context4.abrupt('return', {
								title: 'Please try again.',
								content: _context4.t0,
								status: 'warning'
							});

						case 9:
							tempPassword = _uniqid2.default.process().substring(0, 6);
							_context4.next = 12;
							return _User4.default.findOneAndUpdate({ email: req.email, passcode: req.passcode }, { $set: { password: tempPassword } });

						case 12:
							agent = _context4.sent;

							if (agent) {
								_context4.next = 15;
								break;
							}

							return _context4.abrupt('return', { title: 'ERROR.', content: 'Email or Passcode incorrect', status: 'danger' });

						case 15:
							mailOptions = {
								from: _config2.default.GMAIL, // sender address
								to: agent.email, // list of receivers
								subject: 'SPORTS AGENT APP PASSWORD RESET', // Subject line
								text: 'Sports Agent App \n username: ' + agent.username + ' \n temporary password: ' + tempPassword + ' \n Please set up a new password after login.' // plain text body
							};
							_context4.next = 18;
							return transporter.sendMail(mailOptions);

						case 18:
							return _context4.abrupt('return', { title: 'SUCCESS', content: agent.email, status: 'success' });

						case 21:
							_context4.prev = 21;
							_context4.t1 = _context4['catch'](0);
							_context4.next = 25;
							return _SystemLog2.default.create({ title: 'Agent Reset Password Error', content: req.email + ' ' + req.passcode + ' failed ' + _context4.t1, status: 'danger' });

						case 25:
							return _context4.abrupt('return', { title: 'Unknow Error', content: 'Please try again later!', status: 'danger' });

						case 26:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, _this4, [[0, 21]]);
		}))();
	}
};
//# sourceMappingURL=index.js.map