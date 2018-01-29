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

var _renameEventPeriod = require('../../utils/functions/renameEventPeriod');

var _renameEventPeriod2 = _interopRequireDefault(_renameEventPeriod);

var _renameLeague = require('../../utils/functions/renameLeague');

var _renameLeague2 = _interopRequireDefault(_renameLeague);

var _sportTypes = require('../../utils/lists/sportTypes');

var _sportTypes2 = _interopRequireDefault(_sportTypes);

var _Provider = require('../../models/Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _SystemLog = require('../../models/SystemLog');

var _SystemLog2 = _interopRequireDefault(_SystemLog);

var _LogoCollect = require('../../models/LogoCollect');

var _LogoCollect2 = _interopRequireDefault(_LogoCollect);

var _index = require('../../index');

var _fileExists = require('file-exists');

var _fileExists2 = _interopRequireDefault(_fileExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var updateEventOddFromPickMon = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var pickMonSport, pickMonXML, pickMonEvents, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, event, theSport, thePeriod, theMatchTime, theOddCutOffTime, theLeague, theAwayPitcher, theHomePitcher, theOddCutOffAt, theExpectSecondHalfTime, isSecondHalfOnTime, theSpreadPoint, isSpreadPointPositive, theHomeSpreadPoint, theAwaySpreadPoint, theAwayROT, theHomeROT, theUniqueID, awayLogo, homeLogo, folderName, awayLogoExists, homeLogoExists, newEvent;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _Provider2.default.isActivate('pm');

					case 3:
						if (_context.sent) {
							_context.next = 5;
							break;
						}

						return _context.abrupt('return');

					case 5:
						// eslint-disable-next-line
						console.log('update pickMon odd');
						_context.next = 8;
						return _Provider2.default.findOne({ name: 'pm' }).then(function (res) {
							return res.options.join(',');
						});

					case 8:
						pickMonSport = _context.sent;
						_context.next = 11;
						return _axios2.default.get('https://api.pickmonitor.com/lines.php?uid=' + _config2.default.pickMon_UID + '&key=' + _config2.default.pickMon_Key + '&sports=' + pickMonSport + '&graded=0&full_call=1').then(function (res) {
							return res.data;
						});

					case 11:
						pickMonXML = _context.sent;
						_context.next = 14;
						return (0, _xml2jsEs6Promise2.default)(pickMonXML, { explicitArray: false }).then(function (res) {
							return res.hasOwnProperty('lines') && res.lines.hasOwnProperty('game') ? res.lines.game : [];
						});

					case 14:
						pickMonEvents = _context.sent;

						if (!_lodash2.default.isEmpty(pickMonEvents)) {
							_context.next = 17;
							break;
						}

						return _context.abrupt('return');

					case 17:
						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 20;
						_iterator = pickMonEvents[Symbol.iterator]();

					case 22:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 71;
							break;
						}

						event = _step.value;
						theSport = event.sporttype;

						if (_sportTypes2.default.includes(theSport)) {
							_context.next = 27;
							break;
						}

						return _context.abrupt('continue', 68);

					case 27:
						thePeriod = (0, _renameEventPeriod2.default)(event.line.perioddesc);

						if (!(thePeriod !== 'Second Half')) {
							_context.next = 30;
							break;
						}

						return _context.abrupt('continue', 68);

					case 30:
						theMatchTime = _moment2.default.utc(event.gamedate).add(5, 'h');

						if (!(0, _moment2.default)().add(5, 'd').endOf('day').isBefore(theMatchTime)) {
							_context.next = 33;
							break;
						}

						return _context.abrupt('continue', 68);

					case 33:
						theOddCutOffTime = _moment2.default.utc(event.line.wagercutoff).add(5, 'h');

						if (!(0, _moment2.default)().isAfter(theOddCutOffTime)) {
							_context.next = 36;
							break;
						}

						return _context.abrupt('continue', 68);

					case 36:
						theLeague = (0, _renameLeague2.default)(theSport, event.sportsubtype);
						theAwayPitcher = theSport === 'Baseball' ? !_lodash2.default.isEmpty(event.team1.pitcher) ? event.team1.pitcher : 'Action' : null;
						theHomePitcher = theSport === 'Baseball' ? !_lodash2.default.isEmpty(event.team2.pitcher) ? event.team2.pitcher : 'Action' : null;
						theOddCutOffAt = theOddCutOffTime;
						//			if(thePeriod === 'Second Half'){ 

						theExpectSecondHalfTime = (0, _moment2.default)(theMatchTime).add(1, 'h').add(45, 'm');
						isSecondHalfOnTime = (0, _moment2.default)(theExpectSecondHalfTime).isAfter(theOddCutOffTime); // return true: Yes its onTime. false: use expect time

						theOddCutOffAt = isSecondHalfOnTime ? theOddCutOffTime : theExpectSecondHalfTime;
						//			}
						theSpreadPoint = Number(event.line.spread.points);
						isSpreadPointPositive = theSpreadPoint > 0;
						theHomeSpreadPoint = theSpreadPoint;
						theAwaySpreadPoint = isSpreadPointPositive ? -Number(theSpreadPoint) : Math.abs(theSpreadPoint);
						theAwayROT = event.team1.rotnum.toString();
						theHomeROT = event.team2.rotnum.toString();
						theUniqueID = (0, _moment2.default)(theMatchTime).format('MMDDYY') + '_' + theAwayROT + '_' + theHomeROT + '_' + theSport + '_' + thePeriod.replace(/\s/g, '');

						//

						awayLogo = {
							name: event.team1.name.split(' ').join('_').toLowerCase().replace(/\.|\'|\&/g, ''),
							team: event.team1.name,
							sport: theSport,
							league: theLeague,
							region: null,
							detail: event.team1.name + ' ' + theAwayROT + ' vs ' + event.team2.name + ' ' + theHomeROT
						};
						homeLogo = {
							name: event.team2.name.split(' ').join('_').toLowerCase().replace(/\.|\'|\&/g, ''),
							team: event.team2.name,
							sport: theSport,
							league: theLeague,
							region: null,
							detail: event.team1.name + ' ' + theAwayROT + ' vs ' + event.team2.name + ' ' + theHomeROT
						};
						folderName = theLeague === 'NCAAB' || theLeague === 'NCAAF' ? 'NCAA' : theSport;
						_context.next = 55;
						return (0, _fileExists2.default)(_index.dirname + ('/public/images/teamlogos/' + folderName + '/' + awayLogo.name + '.png'));

					case 55:
						awayLogoExists = _context.sent;

						if (awayLogoExists) {
							_context.next = 59;
							break;
						}

						_context.next = 59;
						return _LogoCollect2.default.findOneAndUpdate({ name: awayLogo.name }, awayLogo, { upsert: true });

					case 59:
						_context.next = 61;
						return (0, _fileExists2.default)(_index.dirname + ('/public/images/teamlogos/' + folderName + '/' + homeLogo.name + '.png'));

					case 61:
						homeLogoExists = _context.sent;

						if (homeLogoExists) {
							_context.next = 65;
							break;
						}

						_context.next = 65;
						return _LogoCollect2.default.findOneAndUpdate({ name: homeLogo.name }, homeLogo, { upsert: true });

					case 65:
						//


						newEvent = {
							ID: event.id,
							uniqueID: theUniqueID,
							provider: 'pm',
							bookmaker: 'pm',
							sport: theSport,
							period: thePeriod,
							league: theLeague,
							region: null,
							matchTime: (0, _moment2.default)(theMatchTime),
							team: {
								away: event.team1.name,
								awayROT: theAwayROT,
								awayPitcher: theAwayPitcher,
								home: event.team2.name,
								homeROT: theHomeROT,
								homePitcher: theHomePitcher
							},
							score: {
								home: null,
								away: null
							},
							odd: {
								awayMoneyLine: Number(event.line.money.team1) || null,
								awaySpreadPoint: Number(theAwaySpreadPoint) || null,
								awaySpreadLine: Number(event.line.spread.team1) || null,
								homeMoneyLine: Number(event.line.money.team2) || null,
								homeSpreadPoint: Number(theHomeSpreadPoint) || null,
								homeSpreadLine: Number(event.line.spread.team2) || null,
								totalOverPoint: Number(event.line.total.points) || null,
								totalOverLine: Number(event.line.total.over) || null,
								totalUnderPoint: Number(event.line.total.points) || null,
								totalUnderLine: Number(event.line.total.under) || null,
								drawLine: Number(event.line.money.draw) || null

							},
							cutOffAt: (0, _moment2.default)(theOddCutOffAt),
							isFinished: false,
							status: 'Pending',
							updatedAt: (0, _moment2.default)()
						};
						_context.next = 68;
						return _Event2.default.findOneAndUpdate({ uniqueID: newEvent.uniqueID, status: 'Pending' }, newEvent, { upsert: true });

					case 68:
						_iteratorNormalCompletion = true;
						_context.next = 22;
						break;

					case 71:
						_context.next = 77;
						break;

					case 73:
						_context.prev = 73;
						_context.t0 = _context['catch'](20);
						_didIteratorError = true;
						_iteratorError = _context.t0;

					case 77:
						_context.prev = 77;
						_context.prev = 78;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 80:
						_context.prev = 80;

						if (!_didIteratorError) {
							_context.next = 83;
							break;
						}

						throw _iteratorError;

					case 83:
						return _context.finish(80);

					case 84:
						return _context.finish(77);

					case 85:
						_context.next = 91;
						break;

					case 87:
						_context.prev = 87;
						_context.t1 = _context['catch'](0);
						_context.next = 91;
						return _SystemLog2.default.create({ title: 'update pick mon event failed', content: '' + _context.t1, status: 'danger' });

					case 91:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 87], [20, 73, 77, 85], [78,, 80, 84]]);
	}));

	return function updateEventOddFromPickMon() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = updateEventOddFromPickMon;
//# sourceMappingURL=pickMon.js.map