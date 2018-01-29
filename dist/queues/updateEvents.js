'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Cooldown = require('../models/Cooldown');

var _Cooldown2 = _interopRequireDefault(_Cooldown);

var _pickMon = require('../services/updateEvents/pickMon');

var _pickMon2 = _interopRequireDefault(_pickMon);

var _jsonOdd = require('../services/updateEvents/jsonOdd');

var _jsonOdd2 = _interopRequireDefault(_jsonOdd);

var _queue = require('queue');

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var updateQueue = (0, _queue2.default)();
var startQueue = function startQueue(queue) {
	return new Promise(function (resolve, reject) {
		return queue.start(function (error) {
			return error ? reject(error) : resolve();
		});
	});
};
var updateEvents = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						_context3.next = 3;
						return _Cooldown2.default.isActivate('updateEventOdd');

					case 3:
						if (!_context3.sent) {
							_context3.next = 5;
							break;
						}

						updateQueue.push(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
							return regeneratorRuntime.wrap(function _callee$(_context) {
								while (1) {
									switch (_context.prev = _context.next) {
										case 0:
											_context.next = 2;
											return (0, _jsonOdd2.default)();

										case 2:
											return _context.abrupt('return', _context.sent);

										case 3:
										case 'end':
											return _context.stop();
									}
								}
							}, _callee, undefined);
						})), _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
							return regeneratorRuntime.wrap(function _callee2$(_context2) {
								while (1) {
									switch (_context2.prev = _context2.next) {
										case 0:
											_context2.next = 2;
											return (0, _pickMon2.default)();

										case 2:
											return _context2.abrupt('return', _context2.sent);

										case 3:
										case 'end':
											return _context2.stop();
									}
								}
							}, _callee2, undefined);
						})));

					case 5:
						_context3.next = 7;
						return startQueue(updateQueue);

					case 7:
						_context3.next = 12;
						break;

					case 9:
						_context3.prev = 9;
						_context3.t0 = _context3['catch'](0);
						throw new Error(__dirname + '\n' + _context3.t0);

					case 12:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 9]]);
	}));

	return function updateEvents() {
		return _ref.apply(this, arguments);
	};
}();
exports.default = updateEvents;
//# sourceMappingURL=updateEvents.js.map