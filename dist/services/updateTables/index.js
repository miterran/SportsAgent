'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Table = require('../../models/Table');

var _Table2 = _interopRequireDefault(_Table);

var _Event = require('../../models/Event');

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var generateTableSports = function generateTableSports(actionEvents) {
	var sports = [];
	if (_lodash2.default.isEmpty(actionEvents)) return [];
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		var _loop = function _loop() {
			var event = _step.value;

			if (!_lodash2.default.some(sports, { name: event.sport })) sports.push({ name: event.sport, leagues: [] });
			var sportIndex = sports.findIndex(function (sport) {
				return sport.name === event.sport;
			});
			if (!_lodash2.default.some(sports[sportIndex].leagues, { name: event.league })) sports[sportIndex].leagues.push({ name: event.league, region: event.region, periods: [] });
			var leagueIndex = sports[sportIndex].leagues.findIndex(function (league) {
				return league.name === event.league && league.region === event.region;
			});
			if (leagueIndex < 0) return 'continue';
			if (!_lodash2.default.some(sports[sportIndex].leagues[leagueIndex].periods, { name: event.period })) sports[sportIndex].leagues[leagueIndex].periods.push({ name: event.period });
		};

		for (var _iterator = actionEvents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _ret = _loop();

			if (_ret === 'continue') continue;
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return sports;
};

var generateActionEvents = function generateActionEvents(action, events) {
	return _lodash2.default.compact(events.map(function (event) {
		event.action = action;if (event.isActionOddActivate) return _lodash2.default.pick(event, ['sport', 'league', 'region', 'period']);return null;
	}));
};

var updateTable = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var events, standardEvents, modifyEvents, specialEvents;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;

						// eslint-disable-next-line
						console.log('update table');
						_context.next = 4;
						return _Event2.default.find({ cutOffAt: { $gte: (0, _moment2.default)() } }, 'sport period league region odd');

					case 4:
						events = _context.sent;
						standardEvents = generateActionEvents('straight', events);
						modifyEvents = generateActionEvents('superTeaser', events);
						specialEvents = generateActionEvents('parlay', events);
						_context.next = 10;
						return _Table2.default.findOneAndUpdate({ name: 'standard' }, { $set: { sports: generateTableSports(standardEvents) } });

					case 10:
						_context.next = 12;
						return _Table2.default.findOneAndUpdate({ name: 'modify' }, { $set: { sports: generateTableSports(modifyEvents) } });

					case 12:
						_context.next = 14;
						return _Table2.default.findOneAndUpdate({ name: 'special' }, { $set: { sports: generateTableSports(specialEvents) } });

					case 14:
						_context.next = 19;
						break;

					case 16:
						_context.prev = 16;
						_context.t0 = _context['catch'](0);
						throw new Error(__dirname + '\n' + _context.t0);

					case 19:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 16]]);
	}));

	return function updateTable() {
		return _ref.apply(this, arguments);
	};
}();
exports.default = updateTable;
//# sourceMappingURL=index.js.map