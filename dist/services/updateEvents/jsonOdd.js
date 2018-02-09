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

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _renameEventPeriod = require('../../utils/functions/renameEventPeriod');

var _renameEventPeriod2 = _interopRequireDefault(_renameEventPeriod);

var _SystemLog = require('../../models/SystemLog');

var _SystemLog2 = _interopRequireDefault(_SystemLog);

var _Provider = require('../../models/Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _LogoCollect = require('../../models/LogoCollect');

var _LogoCollect2 = _interopRequireDefault(_LogoCollect);

var _index = require('../../index');

var _fileExists = require('file-exists');

var _fileExists2 = _interopRequireDefault(_fileExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var axiosJsonOdd = _axios2.default.create({ headers: { 'JsonOdds-API-Key': _config2.default.jsonOddApiKey } });

var updateEventOddFromJsonOdd = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var jsonOddSports, jsoonEvents, nba, allSports, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, event, jsonSport, theSport, theMatchTime, theLeague, theRegion, theAwayPitcher, theHomePitcher, theAwayROT, theHomeROT, awayLogo, homeLogo, folderName, awayLogoExists, homeLogoExists, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, odd, thePeriod, theUniqueID, newEvent;

		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _Provider2.default.isActivate('jo');

					case 3:
						if (_context.sent) {
							_context.next = 5;
							break;
						}

						return _context.abrupt('return');

					case 5:
						//eslint-disable-next-line
						console.log('update jsonOdd odd');
						_context.next = 8;
						return _Provider2.default.findOne({ name: 'jo' }).then(function (res) {
							return res.options;
						});

					case 8:
						jsonOddSports = _context.sent;
						jsoonEvents = [];
						_context.next = 12;
						return axiosJsonOdd.get('https://jsonodds.com/api/odds/nba?source=4').then(function (res) {
							return res.data;
						}).catch(function () {
							return [];
						});

					case 12:
						nba = _context.sent;
						_context.next = 15;
						return axiosJsonOdd.get('https://jsonodds.com/api/odds?source=3').then(function (res) {
							return res.data.filter(function (event) {
								return event.Sport !== 1;
							});
						}).catch(function () {
							return [];
						});

					case 15:
						allSports = _context.sent;


						jsoonEvents = nba.concat(allSports);

						if (!_lodash2.default.isEmpty(jsonEvents)) {
							_context.next = 19;
							break;
						}

						return _context.abrupt('return');

					case 19:
						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context.prev = 22;
						_iterator = jsonEvents[Symbol.iterator]();

					case 24:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context.next = 94;
							break;
						}

						event = _step.value;
						jsonSport = _lodash2.default.find(jsonOddSports, { idx: event.Sport, activate: true });

						if (jsonSport) {
							_context.next = 29;
							break;
						}

						return _context.abrupt('continue', 91);

					case 29:
						theSport = jsonSport.sport;
						theMatchTime = _moment2.default.utc(event.MatchTime);

						if (!(0, _moment2.default)().add(5, 'days').endOf('day').isBefore(theMatchTime)) {
							_context.next = 33;
							break;
						}

						return _context.abrupt('continue', 91);

					case 33:
						if (!(0, _moment2.default)().isAfter(theMatchTime)) {
							_context.next = 35;
							break;
						}

						return _context.abrupt('continue', 91);

					case 35:
						if (!(0, _moment2.default)().add(5, 'd').endOf('day').isBefore(theMatchTime)) {
							_context.next = 37;
							break;
						}

						return _context.abrupt('continue', 91);

					case 37:
						theLeague = event.Sport === 7 ? event.hasOwnProperty('League') && event.League.hasOwnProperty('Name') ? event.League.Name : '' : jsonSport.league;

						if (!(theLeague === '')) {
							_context.next = 40;
							break;
						}

						return _context.abrupt('continue', 91);

					case 40:
						theRegion = event.Sport === 7 ? event.DisplayRegion : null;
						theAwayPitcher = theSport === 'Baseball' ? !_lodash2.default.isEmpty(event.AwayPitcher) ? event.AwayPitcher : 'Action' : null;
						theHomePitcher = theSport === 'Baseball' ? !_lodash2.default.isEmpty(event.HomePitcher) ? event.HomePitcher : 'Action' : null;
						theAwayROT = event.AwayROT;
						theHomeROT = event.HomeROT;

						//

						awayLogo = {
							name: event.AwayTeam.split(' ').join('_').toLowerCase().replace(/\.|\'|\&/g, ''),
							team: event.AwayTeam,
							sport: theSport,
							league: theLeague,
							region: theRegion,
							detail: event.AwayTeam + ' ' + theAwayROT + ' vs ' + event.HomeTeam + ' ' + theHomeROT
						};
						homeLogo = {
							name: event.HomeTeam.split(' ').join('_').toLowerCase().replace(/\.|\'|\&/g, ''),
							team: event.HomeTeam,
							sport: theSport,
							league: theLeague,
							region: theRegion,
							detail: event.AwayTeam + ' ' + theAwayROT + ' vs ' + event.HomeTeam + ' ' + theHomeROT
						};
						folderName = theLeague === 'NCAAB' || theLeague === 'NCAAF' ? 'NCAA' : theSport;
						_context.next = 50;
						return (0, _fileExists2.default)(_index.dirname + ('/public/images/teamlogos/' + folderName + '/' + awayLogo.name + '.png'));

					case 50:
						awayLogoExists = _context.sent;

						if (awayLogoExists) {
							_context.next = 54;
							break;
						}

						_context.next = 54;
						return _LogoCollect2.default.findOneAndUpdate({ name: awayLogo.name }, awayLogo, { upsert: true });

					case 54:
						_context.next = 56;
						return (0, _fileExists2.default)(_index.dirname + ('/public/images/teamlogos/' + folderName + '/' + homeLogo.name + '.png'));

					case 56:
						homeLogoExists = _context.sent;

						if (homeLogoExists) {
							_context.next = 60;
							break;
						}

						_context.next = 60;
						return _LogoCollect2.default.findOneAndUpdate({ name: homeLogo.name }, homeLogo, { upsert: true });

					case 60:
						//


						_iteratorNormalCompletion2 = true;
						_didIteratorError2 = false;
						_iteratorError2 = undefined;
						_context.prev = 63;
						_iterator2 = event.Odds[Symbol.iterator]();

					case 65:
						if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
							_context.next = 77;
							break;
						}

						odd = _step2.value;
						thePeriod = (0, _renameEventPeriod2.default)(odd.OddType);

						if (!(thePeriod === 'unknow')) {
							_context.next = 70;
							break;
						}

						return _context.abrupt('continue', 74);

					case 70:
						theUniqueID = (0, _moment2.default)(theMatchTime).format('MMDDYY') + '_' + theAwayROT + '_' + theHomeROT + '_' + theSport + '_' + thePeriod.replace(/\s/g, '');
						newEvent = {
							ID: odd.ID,
							uniqueID: theUniqueID,
							provider: 'jo',
							bookmaker: odd.SiteID.toString(),
							sport: theSport,
							period: thePeriod,
							league: theLeague,
							region: theRegion,
							matchTime: theMatchTime,
							team: {
								away: event.AwayTeam,
								awayROT: theAwayROT,
								awayPitcher: theAwayPitcher,
								home: event.HomeTeam,
								homeROT: theHomeROT,
								homePitcher: theHomePitcher
							},
							score: {
								home: null,
								away: null
							},
							odd: {
								awayMoneyLine: Number(odd.MoneyLineAway) || null,
								awaySpreadPoint: Number(odd.PointSpreadAway) || null,
								awaySpreadLine: Number(odd.PointSpreadAwayLine) || null,
								homeMoneyLine: Number(odd.MoneyLineHome) || null,
								homeSpreadPoint: Number(odd.PointSpreadHome) || null,
								homeSpreadLine: Number(odd.PointSpreadHomeLine) || null,
								totalOverPoint: Number(odd.TotalNumber) || null,
								totalOverLine: Number(odd.OverLine) || null,
								totalUnderPoint: Number(odd.TotalNumber) || null,
								totalUnderLine: Number(odd.UnderLine) || null,
								drawLine: Number(odd.DrawLine) || null
							},
							cutOffAt: (0, _moment2.default)(theMatchTime),
							isFinished: false,
							status: 'Pending',
							updatedAt: (0, _moment2.default)()
						};
						_context.next = 74;
						return _Event2.default.findOneAndUpdate({ uniqueID: newEvent.uniqueID }, newEvent, { upsert: true });

					case 74:
						_iteratorNormalCompletion2 = true;
						_context.next = 65;
						break;

					case 77:
						_context.next = 83;
						break;

					case 79:
						_context.prev = 79;
						_context.t0 = _context['catch'](63);
						_didIteratorError2 = true;
						_iteratorError2 = _context.t0;

					case 83:
						_context.prev = 83;
						_context.prev = 84;

						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}

					case 86:
						_context.prev = 86;

						if (!_didIteratorError2) {
							_context.next = 89;
							break;
						}

						throw _iteratorError2;

					case 89:
						return _context.finish(86);

					case 90:
						return _context.finish(83);

					case 91:
						_iteratorNormalCompletion = true;
						_context.next = 24;
						break;

					case 94:
						_context.next = 100;
						break;

					case 96:
						_context.prev = 96;
						_context.t1 = _context['catch'](22);
						_didIteratorError = true;
						_iteratorError = _context.t1;

					case 100:
						_context.prev = 100;
						_context.prev = 101;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 103:
						_context.prev = 103;

						if (!_didIteratorError) {
							_context.next = 106;
							break;
						}

						throw _iteratorError;

					case 106:
						return _context.finish(103);

					case 107:
						return _context.finish(100);

					case 108:
						_context.next = 114;
						break;

					case 110:
						_context.prev = 110;
						_context.t2 = _context['catch'](0);
						_context.next = 114;
						return _SystemLog2.default.create({ title: 'update json odd event failed', content: _context.t2, status: 'danger' });

					case 114:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 110], [22, 96, 100, 108], [63, 79, 83, 91], [84,, 86, 90], [101,, 103, 107]]);
	}));

	return function updateEventOddFromJsonOdd() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = updateEventOddFromJsonOdd;
//# sourceMappingURL=jsonOdd.js.map