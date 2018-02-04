'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _Event = require('../../models/Event');

var _Event2 = _interopRequireDefault(_Event);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _xml2jsEs6Promise = require('xml2js-es6-promise');

var _xml2jsEs6Promise2 = _interopRequireDefault(_xml2jsEs6Promise);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Provider = require('../../models/Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _SystemLog = require('../../models/SystemLog');

var _SystemLog2 = _interopRequireDefault(_SystemLog);

var _Pick = require('../../models/Pick');

var _Pick2 = _interopRequireDefault(_Pick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var pickMon = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var pickMonSport, pickMonEventIDs, pickMonXML, pickMonScores, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pickMonEventID, eventScore, status, isFinished, homeScore, awayScore, update, updatedEvent;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						// eslint-disable-next-line
						console.log('update pick mon score');
						_context.prev = 1;
						_context.next = 4;
						return _Provider2.default.findOne({ name: 'pm' }).then(function (res) {
							return res.options.join(',');
						});

					case 4:
						pickMonSport = _context.sent;
						_context.next = 7;
						return _Pick2.default.find({ status: 'Pending' }, 'Event').populate({ path: 'Event', match: { provider: 'pm', status: 'Pending', cutOffAt: { $lt: (0, _moment2.default)().subtract(1, 'h') } }, select: 'ID' }) // $lt moment(), query started game , filter after 2 hr
						.then(function (picks) {
							return _lodash2.default.uniqBy(_lodash2.default.compact(picks.map(function (pick) {
								return pick.Event;
							})), 'ID');
						}).map(function (event) {
							return event.ID;
						});

					case 7:
						pickMonEventIDs = _context.sent;

						if (!_lodash2.default.isEmpty(pickMonEventIDs)) {
							_context.next = 10;
							break;
						}

						return _context.abrupt('return');

					case 10:
						_context.next = 12;
						return _axios2.default.get('https://api.pickmonitor.com/lines.php?uid=' + _config2.default.pickMon_UID + '&key=' + _config2.default.pickMon_Key + '&sports=' + pickMonSport + '&graded=1&full_call=1').then(function (res) {
							return res.data;
						});

					case 12:
						pickMonXML = _context.sent;
						_context.next = 15;
						return (0, _xml2jsEs6Promise2.default)(pickMonXML, { explicitArray: false }).then(function (res) {
							return res.hasOwnProperty('lines') && res.lines.hasOwnProperty('game') ? res.lines.game : [];
						});

					case 15:
						pickMonScores = _context.sent;

						if (!_lodash2.default.isEmpty(pickMonScores)) {
							_context.next = 18;
							break;
						}

						return _context.abrupt('return');

					case 18:
						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 21;
						_iterator = pickMonEventIDs[Symbol.iterator]();

					case 23:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 43;
							break;
						}

						pickMonEventID = _step.value;
						eventScore = _lodash2.default.find(pickMonScores, { id: pickMonEventID });

						if (!_lodash2.default.isEmpty(eventScore)) {
							_context.next = 28;
							break;
						}

						return _context.abrupt('continue', 40);

					case 28:
						status = 'Review';
						isFinished = false;
						homeScore = null;
						awayScore = null;

						if (eventScore.void === '0' && !_lodash2.default.isEmpty(eventScore.line.score.winner)) {
							status = 'Finished';
							isFinished = true;
							homeScore = eventScore.line.score.team2;
							awayScore = eventScore.line.score.team1;
						}
						update = {
							score: {
								away: awayScore,
								home: homeScore
							},
							isFinished: isFinished,
							status: status,
							updatedAt: (0, _moment2.default)()
						};
						_context.next = 36;
						return _Event2.default.findOneAndUpdate({ ID: pickMonEventID, provider: 'pm', status: 'Pending' }, { $set: update }, { new: true });

					case 36:
						updatedEvent = _context.sent;

						if (!(updatedEvent.status === 'Review')) {
							_context.next = 40;
							break;
						}

						_context.next = 40;
						return _SystemLog2.default.create({ title: 'PickMon Event has Review', content: '' + updatedEvent._id, status: 'danger' });

					case 40:
						_iteratorNormalCompletion = true;
						_context.next = 23;
						break;

					case 43:
						_context.next = 49;
						break;

					case 45:
						_context.prev = 45;
						_context.t0 = _context['catch'](21);
						_didIteratorError = true;
						_iteratorError = _context.t0;

					case 49:
						_context.prev = 49;
						_context.prev = 50;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 52:
						_context.prev = 52;

						if (!_didIteratorError) {
							_context.next = 55;
							break;
						}

						throw _iteratorError;

					case 55:
						return _context.finish(52);

					case 56:
						return _context.finish(49);

					case 57:
						_context.next = 63;
						break;

					case 59:
						_context.prev = 59;
						_context.t1 = _context['catch'](1);
						_context.next = 63;
						return _SystemLog2.default.create({ title: 'update pick mon score Failed', content: _context.t1, status: 'danger' });

					case 63:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[1, 59], [21, 45, 49, 57], [50,, 52, 56]]);
	}));

	return function pickMon() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = pickMon;
//# sourceMappingURL=pickMon.js.map