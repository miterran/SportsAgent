'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Mutation = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _yup = require('yup');

var _yup2 = _interopRequireDefault(_yup);

var _User = require('../../../models/User');

var _User2 = _interopRequireDefault(_User);

var _User3 = require('../../../models/User.Agent');

var _User4 = _interopRequireDefault(_User3);

var _SystemLog = require('../../../models/SystemLog');

var _SystemLog2 = _interopRequireDefault(_SystemLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var passcodeSchema = _yup2.default.object().shape({
	newPasscode: _yup2.default.string().matches(/^[0-9]+$/, 'New Passcode format is invalid.').min(4).max(4).required()
});

var Mutation = exports.Mutation = {
	changePassword: function changePassword(root, _ref, ctx) {
		var _this = this;

		var password = _ref.password,
		    newPassword = _ref.newPassword,
		    confirmNewPassword = _ref.confirmNewPassword;
		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			var user;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (!(ctx.user._id === '')) {
								_context.next = 2;
								break;
							}

							return _context.abrupt('return', { title: 'Not Authenticated', content: 'Please try again.', status: 'warning' });

						case 2:
							if (!(newPassword.length < 4 || confirmNewPassword.length < 4)) {
								_context.next = 4;
								break;
							}

							return _context.abrupt('return', { title: 'New Password Invalid', content: 'requires 4 characters', status: 'warning' });

						case 4:
							if (!(newPassword !== confirmNewPassword)) {
								_context.next = 6;
								break;
							}

							return _context.abrupt('return', { title: 'New Password Not Match', content: 'Please try again.', status: 'warning' });

						case 6:
							_context.next = 8;
							return _User2.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(ctx.user._id), password: password }, { $set: { password: newPassword } });

						case 8:
							user = _context.sent;

							if (user) {
								_context.next = 11;
								break;
							}

							return _context.abrupt('return', { title: 'Current Password Incorrect', content: 'Please try again.', status: 'warning' });

						case 11:
							_context.next = 13;
							return _SystemLog2.default.create({ title: 'User Changed Password', content: user.username + ' Changed Password', status: 'success' });

						case 13:
							return _context.abrupt('return', { title: 'Completed', content: 'Your Password has been changed!', status: 'success' });

						case 14:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}))();
	},
	changePasscode: function changePasscode(root, _ref2, ctx) {
		var _this2 = this;

		var password = _ref2.password,
		    newPasscode = _ref2.newPasscode,
		    confirmNewPasscode = _ref2.confirmNewPasscode;
		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
			var isNewPasscodeValid, user;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							if (!(ctx.user._id === '')) {
								_context2.next = 2;
								break;
							}

							return _context2.abrupt('return', { title: 'Not Authenticated', content: 'Please try again.', status: 'warning' });

						case 2:
							if (!(newPasscode !== confirmNewPasscode)) {
								_context2.next = 4;
								break;
							}

							return _context2.abrupt('return', { title: 'New Passcode Not Match', content: 'Please try again.', status: 'warning' });

						case 4:
							_context2.next = 6;
							return passcodeSchema.isValid({ newPasscode: newPasscode });

						case 6:
							isNewPasscodeValid = _context2.sent;

							if (isNewPasscodeValid) {
								_context2.next = 12;
								break;
							}

							_context2.next = 10;
							return passcodeSchema.validate({ newPasscode: newPasscode }).catch(function (err) {
								return err.message;
							});

						case 10:
							_context2.t0 = _context2.sent;
							return _context2.abrupt('return', {
								title: 'New Passcode Invalid',
								content: _context2.t0,
								status: 'warning'
							});

						case 12:
							_context2.next = 14;
							return _User2.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(ctx.user._id), password: password }, { $set: { passcode: newPasscode } });

						case 14:
							user = _context2.sent;

							if (user) {
								_context2.next = 17;
								break;
							}

							return _context2.abrupt('return', { title: 'Password Incorrect', content: 'Please try again.', status: 'warning' });

						case 17:
							_context2.next = 19;
							return _SystemLog2.default.create({ title: 'User Changed Passcode', content: user.username + ' Changed Passcode', status: 'success' });

						case 19:
							return _context2.abrupt('return', { title: 'Completed', content: 'Your Passcode has been changed!', status: 'success' });

						case 20:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this2);
		}))();
	},
	changeEmail: function changeEmail(root, _ref3, ctx) {
		var _this3 = this;

		var passcode = _ref3.passcode,
		    email = _ref3.email;
		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
			var agent;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							if (!(ctx.user.role !== 'Agent')) {
								_context3.next = 2;
								break;
							}

							return _context3.abrupt('return', { title: 'Not Authenticated', content: 'Please try again.', status: 'warning' });

						case 2:
							_context3.next = 4;
							return _User4.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(ctx.user._id), passcode: passcode }, { $set: { email: email } });

						case 4:
							_context3.next = 6;
							return _context3.sent;

						case 6:
							agent = _context3.sent;

							if (agent) {
								_context3.next = 9;
								break;
							}

							return _context3.abrupt('return', { title: 'Warning', content: 'Passcode Incorrect.', status: 'warning' });

						case 9:
							_context3.next = 11;
							return _SystemLog2.default.create({ title: 'Agent Changed Email', content: ctx.user.username + ' Changed Email', status: 'success' });

						case 11:
							return _context3.abrupt('return', { title: 'Completed', content: 'New Email: ' + email, status: 'success' });

						case 12:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, _this3);
		}))();
	}
};
//# sourceMappingURL=index.js.map