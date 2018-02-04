'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var addUserToReq = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
		var token, decodeToken, user;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						token = req.headers['authorization'];

						if (!token) {
							req.user = { _id: '', username: 'vistor', role: 'Guest', createdAt: (0, _moment2.default)() };
							next();
						}
						_context.prev = 2;
						decodeToken = _jsonwebtoken2.default.verify(token, _config2.default.jwtSecret);
						_context.next = 6;
						return _User2.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(decodeToken._id) }, { $set: { lastOnlineAt: (0, _moment2.default)() } });

					case 6:
						user = _context.sent;

						req.user = _lodash2.default.pick(user, ['_id', 'username', 'role', 'createdAt']);
						next();
						_context.next = 15;
						break;

					case 11:
						_context.prev = 11;
						_context.t0 = _context['catch'](2);

						req.user = { _id: '', username: 'vistor', role: 'Guest', createdAt: (0, _moment2.default)() };
						next();

					case 15:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[2, 11]]);
	}));

	return function addUserToReq(_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = addUserToReq;
//# sourceMappingURL=addUserToReq.js.map