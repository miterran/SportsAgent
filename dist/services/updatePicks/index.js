'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Pick = require('../../models/Pick');

var _Pick2 = _interopRequireDefault(_Pick);

var _SystemLog = require('../../models/SystemLog');

var _SystemLog2 = _interopRequireDefault(_SystemLog);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _determinePickResult = require('../../utils/functions/determinePickResult');

var _determinePickResult2 = _interopRequireDefault(_determinePickResult);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _apn = require('../../apn');

var _apn2 = _interopRequireDefault(_apn);

var _apn3 = require('apn');

var _apn4 = _interopRequireDefault(_apn3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var updatePickResult = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var picks, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pick, _pick$Event, eventStatus, _pick$Event$score, homeScore, awayScore, pickStatus, isClosed, newPick, agentNotify, playerNotify;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						// eslint-disable-next-line
						console.log('update pick result');
						_context.prev = 1;
						_context.next = 4;
						return _Pick2.default.find({ isClosed: false }, 'Event marked').populate({ path: 'Event', select: 'isFinished sport score status' }).then(function (picks) {
							return _lodash2.default.compact(picks.map(function (pick) {
								return pick.Event.isFinished ? pick : null;
							}));
						});

					case 4:
						picks = _context.sent;

						if (!_lodash2.default.isEmpty(picks)) {
							_context.next = 7;
							break;
						}

						return _context.abrupt('return');

					case 7:
						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 10;
						_iterator = picks[Symbol.iterator]();

					case 12:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 36;
							break;
						}

						pick = _step.value;
						_pick$Event = pick.Event, eventStatus = _pick$Event.status, _pick$Event$score = _pick$Event.score, homeScore = _pick$Event$score.home, awayScore = _pick$Event$score.away;
						pickStatus = eventStatus;
						isClosed = true;

						if (eventStatus === 'Finished' && homeScore >= 0 && awayScore >= 0) {
							pickStatus = (0, _determinePickResult2.default)(pick);
						}
						if (eventStatus === 'Review') {
							isClosed = false;
						}

						_context.next = 21;
						return _Pick2.default.findOneAndUpdate({
							_id: _mongoose2.default.Types.ObjectId(pick._id), status: 'Pending', isClosed: false
						}, {
							$set: { isClosed: isClosed, status: pickStatus, updatedAt: (0, _moment2.default)() }
						}, {
							new: true
						}).populate('Event').populate('Agent').populate('Player');

					case 21:
						newPick = _context.sent;

						if (isClosed) {
							_context.next = 24;
							break;
						}

						return _context.abrupt('continue', 33);

					case 24:
						if (!newPick.Agent.notification.afterPick) {
							_context.next = 28;
							break;
						}

						agentNotify = new _apn4.default.Notification({
							sound: 'ping.aiff',
							alert: newPick.Player.username + '\'s Pick had ' + newPick.status + ', ' + newPick.Event.team.away + ' vs ' + newPick.Event.team.home,
							topic: _config2.default.APN_TOPIC,
							payload: { BetOrder: newPick.BetOrder }
						});
						_context.next = 28;
						return _apn2.default.send(agentNotify, newPick.Agent.notification.deviceToken);

					case 28:
						if (!newPick.Player.notification.afterPick) {
							_context.next = 32;
							break;
						}

						playerNotify = new _apn4.default.Notification({
							sound: 'ping.aiff',
							alert: 'Your Pick had ' + newPick.status + ', ' + newPick.Event.team.away + ' vs ' + newPick.Event.team.home,
							topic: _config2.default.APN_TOPIC,
							payload: { BetOrder: newPick.BetOrder }
						});
						_context.next = 32;
						return _apn2.default.send(playerNotify, newPick.Player.notification.deviceToken);

					case 32:

						_apn2.default.shutdown();

					case 33:
						_iteratorNormalCompletion = true;
						_context.next = 12;
						break;

					case 36:
						_context.next = 42;
						break;

					case 38:
						_context.prev = 38;
						_context.t0 = _context['catch'](10);
						_didIteratorError = true;
						_iteratorError = _context.t0;

					case 42:
						_context.prev = 42;
						_context.prev = 43;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 45:
						_context.prev = 45;

						if (!_didIteratorError) {
							_context.next = 48;
							break;
						}

						throw _iteratorError;

					case 48:
						return _context.finish(45);

					case 49:
						return _context.finish(42);

					case 50:
						_context.next = 56;
						break;

					case 52:
						_context.prev = 52;
						_context.t1 = _context['catch'](1);
						_context.next = 56;
						return _SystemLog2.default.create({ title: 'update picks result failed', content: '' + _context.t1, status: 'danger' });

					case 56:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[1, 52], [10, 38, 42, 50], [43,, 45, 49]]);
	}));

	return function updatePickResult() {
		return _ref.apply(this, arguments);
	};
}();
exports.default = updatePickResult;
//# sourceMappingURL=index.js.map