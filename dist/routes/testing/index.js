'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Provider = require('../../models/Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _Cooldown = require('../../models/Cooldown');

var _Cooldown2 = _interopRequireDefault(_Cooldown);

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

var _User3 = require('../../models/User.Player');

var _User4 = _interopRequireDefault(_User3);

var _User5 = require('../../models/User.Agent');

var _User6 = _interopRequireDefault(_User5);

var _Event = require('../../models/Event');

var _Event2 = _interopRequireDefault(_Event);

var _BetOrder = require('../../models/BetOrder');

var _BetOrder2 = _interopRequireDefault(_BetOrder);

var _Table = require('../../models/Table');

var _Table2 = _interopRequireDefault(_Table);

var _Pick = require('../../models/Pick');

var _Pick2 = _interopRequireDefault(_Pick);

var _Transaction = require('../../models/Transaction');

var _Transaction2 = _interopRequireDefault(_Transaction);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _updateTables = require('../../services/updateTables');

var _updateTables2 = _interopRequireDefault(_updateTables);

var _pickMon = require('../../services/updateScores/pickMon');

var _pickMon2 = _interopRequireDefault(_pickMon);

var _updatePicks = require('../../services/updatePicks');

var _updatePicks2 = _interopRequireDefault(_updatePicks);

var _updateBetOrders = require('../../services/updateBetOrders');

var _updateBetOrders2 = _interopRequireDefault(_updateBetOrders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//import updateEventOdd from '../../services/updateEventOdd';


var router = _express2.default.Router();

router.get('/dd', function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
		var betOrders, picks;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return _BetOrder2.default.find({ isClosed: false }).populate({ path: 'Picks', populate: { path: 'Event' } });

					case 2:
						betOrders = _context.sent;
						picks = betOrders.map(function (betOrder) {
							return betOrder.Picks.map(function (pick) {
								return pick;
							});
						});

						res.json(_lodash2.default.flatten(picks));

					case 5:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());

router.get('/oo', function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
		var betOrders, picks, overview;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.next = 2;
						return _BetOrder2.default.find({});

					case 2:
						betOrders = _context2.sent;
						_context2.next = 5;
						return _Pick2.default.find({}).populate('Event');

					case 5:
						picks = _context2.sent;

						//.populate({ path: 'Picks', populate: { path: 'Event' } })

						overview = {
							action: {
								straight: {
									Won: betOrders.reduce(function (sum, _ref3) {
										var status = _ref3.status,
										    action = _ref3.bet.action;
										return sum + (action === 'straight' && status === 'Won');
									}, 0),
									Lost: betOrders.reduce(function (sum, _ref4) {
										var status = _ref4.status,
										    action = _ref4.bet.action;
										return sum + (action === 'straight' && status === 'Lost');
									}, 0),
									Push: betOrders.reduce(function (sum, _ref5) {
										var status = _ref5.status,
										    action = _ref5.bet.action;
										return sum + (action === 'straight' && status === 'Push');
									}, 0),
									Pending: betOrders.reduce(function (sum, _ref6) {
										var status = _ref6.status,
										    action = _ref6.bet.action;
										return sum + (action === 'straight' && status === 'Pending');
									}, 0)
								},
								parlay: {
									Won: betOrders.reduce(function (sum, _ref7) {
										var status = _ref7.status,
										    action = _ref7.bet.action;
										return sum + (action === 'parlay' && status === 'Won');
									}, 0),
									Lost: betOrders.reduce(function (sum, _ref8) {
										var status = _ref8.status,
										    action = _ref8.bet.action;
										return sum + (action === 'parlay' && status === 'Lost');
									}, 0),
									Push: betOrders.reduce(function (sum, _ref9) {
										var status = _ref9.status,
										    action = _ref9.bet.action;
										return sum + (action === 'parlay' && status === 'Push');
									}, 0),
									Pending: betOrders.reduce(function (sum, _ref10) {
										var status = _ref10.status,
										    action = _ref10.bet.action;
										return sum + (action === 'parlay' && status === 'Pending');
									}, 0)
								},
								basicTeaser: {
									Won: betOrders.reduce(function (sum, _ref11) {
										var status = _ref11.status,
										    action = _ref11.bet.action;
										return sum + (action === 'basicTeaser' && status === 'Won');
									}, 0),
									Lost: betOrders.reduce(function (sum, _ref12) {
										var status = _ref12.status,
										    action = _ref12.bet.action;
										return sum + (action === 'basicTeaser' && status === 'Lost');
									}, 0),
									Push: betOrders.reduce(function (sum, _ref13) {
										var status = _ref13.status,
										    action = _ref13.bet.action;
										return sum + (action === 'basicTeaser' && status === 'Push');
									}, 0),
									Pending: betOrders.reduce(function (sum, _ref14) {
										var status = _ref14.status,
										    action = _ref14.bet.action;
										return sum + (action === 'basicTeaser' && status === 'Pending');
									}, 0)
								},
								specialTeaser: {
									Won: betOrders.reduce(function (sum, _ref15) {
										var status = _ref15.status,
										    action = _ref15.bet.action;
										return sum + (action === 'specialTeaser' && status === 'Won');
									}, 0),
									Lost: betOrders.reduce(function (sum, _ref16) {
										var status = _ref16.status,
										    action = _ref16.bet.action;
										return sum + (action === 'specialTeaser' && status === 'Lost');
									}, 0),
									Push: betOrders.reduce(function (sum, _ref17) {
										var status = _ref17.status,
										    action = _ref17.bet.action;
										return sum + (action === 'specialTeaser' && status === 'Push');
									}, 0),
									Pending: betOrders.reduce(function (sum, _ref18) {
										var status = _ref18.status,
										    action = _ref18.bet.action;
										return sum + (action === 'specialTeaser' && status === 'Pending');
									}, 0)
								},
								bigTeaser: {
									Won: betOrders.reduce(function (sum, _ref19) {
										var status = _ref19.status,
										    action = _ref19.bet.action;
										return sum + (action === 'bigTeaser' && status === 'Won');
									}, 0),
									Lost: betOrders.reduce(function (sum, _ref20) {
										var status = _ref20.status,
										    action = _ref20.bet.action;
										return sum + (action === 'bigTeaser' && status === 'Lost');
									}, 0),
									Push: betOrders.reduce(function (sum, _ref21) {
										var status = _ref21.status,
										    action = _ref21.bet.action;
										return sum + (action === 'bigTeaser' && status === 'Push');
									}, 0),
									Pending: betOrders.reduce(function (sum, _ref22) {
										var status = _ref22.status,
										    action = _ref22.bet.action;
										return sum + (action === 'bigTeaser' && status === 'Pending');
									}, 0)
								},
								superTeaser: {
									Won: betOrders.reduce(function (sum, _ref23) {
										var status = _ref23.status,
										    action = _ref23.bet.action;
										return sum + (action === 'superTeaser' && status === 'Won');
									}, 0),
									Lost: betOrders.reduce(function (sum, _ref24) {
										var status = _ref24.status,
										    action = _ref24.bet.action;
										return sum + (action === 'superTeaser' && status === 'Lost');
									}, 0),
									Push: betOrders.reduce(function (sum, _ref25) {
										var status = _ref25.status,
										    action = _ref25.bet.action;
										return sum + (action === 'superTeaser' && status === 'Push');
									}, 0),
									Pending: betOrders.reduce(function (sum, _ref26) {
										var status = _ref26.status,
										    action = _ref26.bet.action;
										return sum + (action === 'superTeaser' && status === 'Pending');
									}, 0)
								},
								winReverse: {
									Won: betOrders.reduce(function (sum, _ref27) {
										var status = _ref27.status,
										    action = _ref27.bet.action;
										return sum + (action === 'winReverse' && status === 'Won');
									}, 0),
									Lost: betOrders.reduce(function (sum, _ref28) {
										var status = _ref28.status,
										    action = _ref28.bet.action;
										return sum + (action === 'winReverse' && status === 'Lost');
									}, 0),
									Push: betOrders.reduce(function (sum, _ref29) {
										var status = _ref29.status,
										    action = _ref29.bet.action;
										return sum + (action === 'winReverse' && status === 'Push');
									}, 0),
									Pending: betOrders.reduce(function (sum, _ref30) {
										var status = _ref30.status,
										    action = _ref30.bet.action;
										return sum + (action === 'winReverse' && status === 'Pending');
									}, 0)
								},
								actionReverse: {
									Won: betOrders.reduce(function (sum, _ref31) {
										var status = _ref31.status,
										    action = _ref31.bet.action;
										return sum + (action === 'actionReverse' && status === 'Won');
									}, 0),
									Lost: betOrders.reduce(function (sum, _ref32) {
										var status = _ref32.status,
										    action = _ref32.bet.action;
										return sum + (action === 'actionReverse' && status === 'Lost');
									}, 0),
									Push: betOrders.reduce(function (sum, _ref33) {
										var status = _ref33.status,
										    action = _ref33.bet.action;
										return sum + (action === 'actionReverse' && status === 'Push');
									}, 0),
									Pending: betOrders.reduce(function (sum, _ref34) {
										var status = _ref34.status,
										    action = _ref34.bet.action;
										return sum + (action === 'actionReverse' && status === 'Pending');
									}, 0)
								}
							},
							odd: {
								MLine: {
									Won: picks.reduce(function (sum, _ref35) {
										var status = _ref35.status,
										    oddType = _ref35.marked.oddType;
										return sum + (oddType === 'MLine' && status === 'Won');
									}, 0),
									Lost: picks.reduce(function (sum, _ref36) {
										var status = _ref36.status,
										    oddType = _ref36.marked.oddType;
										return sum + (oddType === 'MLine' && status === 'Lost');
									}, 0),
									Push: picks.reduce(function (sum, _ref37) {
										var status = _ref37.status,
										    oddType = _ref37.marked.oddType;
										return sum + (oddType === 'MLine' && status === 'Push');
									}, 0),
									Pending: picks.reduce(function (sum, _ref38) {
										var status = _ref38.status,
										    oddType = _ref38.marked.oddType;
										return sum + (oddType === 'MLine' && status === 'Pending');
									}, 0)
								},
								Spread: {
									Won: picks.reduce(function (sum, _ref39) {
										var status = _ref39.status,
										    oddType = _ref39.marked.oddType;
										return sum + (oddType === 'Spread' && status === 'Won');
									}, 0),
									Lost: picks.reduce(function (sum, _ref40) {
										var status = _ref40.status,
										    oddType = _ref40.marked.oddType;
										return sum + (oddType === 'Spread' && status === 'Lost');
									}, 0),
									Push: picks.reduce(function (sum, _ref41) {
										var status = _ref41.status,
										    oddType = _ref41.marked.oddType;
										return sum + (oddType === 'Spread' && status === 'Push');
									}, 0),
									Pending: picks.reduce(function (sum, _ref42) {
										var status = _ref42.status,
										    oddType = _ref42.marked.oddType;
										return sum + (oddType === 'Spread' && status === 'Pending');
									}, 0)
								},
								Total: {
									Won: picks.reduce(function (sum, _ref43) {
										var status = _ref43.status,
										    oddType = _ref43.marked.oddType;
										return sum + (oddType === 'Total' && status === 'Won');
									}, 0),
									Lost: picks.reduce(function (sum, _ref44) {
										var status = _ref44.status,
										    oddType = _ref44.marked.oddType;
										return sum + (oddType === 'Total' && status === 'Lost');
									}, 0),
									Push: picks.reduce(function (sum, _ref45) {
										var status = _ref45.status,
										    oddType = _ref45.marked.oddType;
										return sum + (oddType === 'Total' && status === 'Push');
									}, 0),
									Pending: picks.reduce(function (sum, _ref46) {
										var status = _ref46.status,
										    oddType = _ref46.marked.oddType;
										return sum + (oddType === 'Total' && status === 'Pending');
									}, 0)
								},
								Draw: {
									Won: picks.reduce(function (sum, _ref47) {
										var status = _ref47.status,
										    oddType = _ref47.marked.oddType;
										return sum + (oddType === 'Draw' && status === 'Won');
									}, 0),
									Lost: picks.reduce(function (sum, _ref48) {
										var status = _ref48.status,
										    oddType = _ref48.marked.oddType;
										return sum + (oddType === 'Draw' && status === 'Lost');
									}, 0),
									Push: picks.reduce(function (sum, _ref49) {
										var status = _ref49.status,
										    oddType = _ref49.marked.oddType;
										return sum + (oddType === 'Draw' && status === 'Push');
									}, 0),
									Pending: picks.reduce(function (sum, _ref50) {
										var status = _ref50.status,
										    oddType = _ref50.marked.oddType;
										return sum + (oddType === 'Draw' && status === 'Pending');
									}, 0)
								}
							},
							sport: {
								Basketball: {
									Won: picks.reduce(function (sum, _ref51) {
										var status = _ref51.status,
										    sport = _ref51.Event.sport;
										return sum + (sport === 'Basketball' && status === 'Won');
									}, 0),
									Lost: picks.reduce(function (sum, _ref52) {
										var status = _ref52.status,
										    sport = _ref52.Event.sport;
										return sum + (sport === 'Basketball' && status === 'Lost');
									}, 0),
									Push: picks.reduce(function (sum, _ref53) {
										var status = _ref53.status,
										    sport = _ref53.Event.sport;
										return sum + (sport === 'Basketball' && status === 'Push');
									}, 0),
									Pending: picks.reduce(function (sum, _ref54) {
										var status = _ref54.status,
										    sport = _ref54.Event.sport;
										return sum + (sport === 'Basketball' && status === 'Pending');
									}, 0)
								},
								Football: {
									Won: picks.reduce(function (sum, _ref55) {
										var status = _ref55.status,
										    sport = _ref55.Event.sport;
										return sum + (sport === 'Football' && status === 'Won');
									}, 0),
									Lost: picks.reduce(function (sum, _ref56) {
										var status = _ref56.status,
										    sport = _ref56.Event.sport;
										return sum + (sport === 'Football' && status === 'Lost');
									}, 0),
									Push: picks.reduce(function (sum, _ref57) {
										var status = _ref57.status,
										    sport = _ref57.Event.sport;
										return sum + (sport === 'Football' && status === 'Push');
									}, 0),
									Pending: picks.reduce(function (sum, _ref58) {
										var status = _ref58.status,
										    sport = _ref58.Event.sport;
										return sum + (sport === 'Football' && status === 'Pending');
									}, 0)
								},
								Baseball: {
									Won: picks.reduce(function (sum, _ref59) {
										var status = _ref59.status,
										    sport = _ref59.Event.sport;
										return sum + (sport === 'Baseball' && status === 'Won');
									}, 0),
									Lost: picks.reduce(function (sum, _ref60) {
										var status = _ref60.status,
										    sport = _ref60.Event.sport;
										return sum + (sport === 'Baseball' && status === 'Lost');
									}, 0),
									Push: picks.reduce(function (sum, _ref61) {
										var status = _ref61.status,
										    sport = _ref61.Event.sport;
										return sum + (sport === 'Baseball' && status === 'Push');
									}, 0),
									Pending: picks.reduce(function (sum, _ref62) {
										var status = _ref62.status,
										    sport = _ref62.Event.sport;
										return sum + (sport === 'Baseball' && status === 'Pending');
									}, 0)
								},
								Soccer: {
									Won: picks.reduce(function (sum, _ref63) {
										var status = _ref63.status,
										    sport = _ref63.Event.sport;
										return sum + (sport === 'Soccer' && status === 'Won');
									}, 0),
									Lost: picks.reduce(function (sum, _ref64) {
										var status = _ref64.status,
										    sport = _ref64.Event.sport;
										return sum + (sport === 'Soccer' && status === 'Lost');
									}, 0),
									Push: picks.reduce(function (sum, _ref65) {
										var status = _ref65.status,
										    sport = _ref65.Event.sport;
										return sum + (sport === 'Soccer' && status === 'Push');
									}, 0),
									Pending: picks.reduce(function (sum, _ref66) {
										var status = _ref66.status,
										    sport = _ref66.Event.sport;
										return sum + (sport === 'Soccer' && status === 'Pending');
									}, 0)
								},
								Hockey: {
									Won: picks.reduce(function (sum, _ref67) {
										var status = _ref67.status,
										    sport = _ref67.Event.sport;
										return sum + (sport === 'Hockey' && status === 'Won');
									}, 0),
									Lost: picks.reduce(function (sum, _ref68) {
										var status = _ref68.status,
										    sport = _ref68.Event.sport;
										return sum + (sport === 'Hockey' && status === 'Lost');
									}, 0),
									Push: picks.reduce(function (sum, _ref69) {
										var status = _ref69.status,
										    sport = _ref69.Event.sport;
										return sum + (sport === 'Hockey' && status === 'Push');
									}, 0),
									Pending: picks.reduce(function (sum, _ref70) {
										var status = _ref70.status,
										    sport = _ref70.Event.sport;
										return sum + (sport === 'Hockey' && status === 'Pending');
									}, 0)
								},
								Fighting: {
									Won: picks.reduce(function (sum, _ref71) {
										var status = _ref71.status,
										    sport = _ref71.Event.sport;
										return sum + (sport === 'Fighting' && status === 'Won');
									}, 0),
									Lost: picks.reduce(function (sum, _ref72) {
										var status = _ref72.status,
										    sport = _ref72.Event.sport;
										return sum + (sport === 'Fighting' && status === 'Lost');
									}, 0),
									Push: picks.reduce(function (sum, _ref73) {
										var status = _ref73.status,
										    sport = _ref73.Event.sport;
										return sum + (sport === 'Fighting' && status === 'Push');
									}, 0),
									Pending: picks.reduce(function (sum, _ref74) {
										var status = _ref74.status,
										    sport = _ref74.Event.sport;
										return sum + (sport === 'Fighting' && status === 'Pending');
									}, 0)
								},
								ESports: {
									Won: picks.reduce(function (sum, _ref75) {
										var status = _ref75.status,
										    sport = _ref75.Event.sport;
										return sum + (sport === 'ESports' && status === 'Won');
									}, 0),
									Lost: picks.reduce(function (sum, _ref76) {
										var status = _ref76.status,
										    sport = _ref76.Event.sport;
										return sum + (sport === 'ESports' && status === 'Lost');
									}, 0),
									Push: picks.reduce(function (sum, _ref77) {
										var status = _ref77.status,
										    sport = _ref77.Event.sport;
										return sum + (sport === 'ESports' && status === 'Push');
									}, 0),
									Pending: picks.reduce(function (sum, _ref78) {
										var status = _ref78.status,
										    sport = _ref78.Event.sport;
										return sum + (sport === 'ESports' && status === 'Pending');
									}, 0)
								}
							}
						};


						res.json(overview);
						// return {
						// 	activePlayers: _.uniq(betOrders.map(betOrder => betOrder.Player.toString())).length,
						// 	resultAmount: isClosed ? betOrders.reduce((sum, { resultAmount }) => sum + resultAmount, 0) : null,
						// 	overview: {
						// 		straight: betOrders.reduce((sum, { bet: { action } }) => sum + (action === 'straight'), 0),
						// 		parlay: betOrders.reduce((sum, { bet: { action } }) => sum + (action === 'parlay'), 0),
						// 		basicTeaser: betOrders.reduce((sum, { bet: { action } }) => sum + (action === 'basicTeaser'), 0),
						// 		specialTeaser: betOrders.reduce((sum, { bet: { action } }) => sum + (action === 'specialTeaser'), 0),
						// 		bigTeaser: betOrders.reduce((sum, { bet: { action } }) => sum + (action === 'bigTeaser'), 0),
						// 		superTeaser: betOrders.reduce((sum, { bet: { action } }) => sum + (action === 'superTeaser'), 0),
						// 		winReverse: betOrders.reduce((sum, { bet: { action } }) => sum + (action === 'winReverse'), 0),
						// 		actionReverse: betOrders.reduce((sum, { bet: { action } }) => sum + (action === 'actionReverse'), 0),
						// 		totalAtRisk: betOrders.reduce((sum, { bet: { atRisk } }) => sum + atRisk, 0),
						// 		totalToWin: betOrders.reduce((sum, { bet: { toWin } }) => sum + toWin, 0),
						// 		totalBet: betOrders.length
						// 	},
						// }

					case 8:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}());
//matchTime: { $lt: moment().subtract(10, 'm') }
router.get('/updateprovider', function () {
	var _ref79 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
		var pm;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.next = 2;
						return _Provider2.default.findOneAndUpdate({ name: 'pm' }, { $set: { options: ['basketball', 'football'] } });

					case 2:
						pm = _context3.sent;


						res.json(pm);

					case 4:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined);
	}));

	return function (_x5, _x6) {
		return _ref79.apply(this, arguments);
	};
}());

router.get('/betorderhistory', function () {
	var _ref80 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
		var result;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.next = 2;
						return _Pick2.default.findOne({ _id: _mongoose2.default.Types.ObjectId('5a48a35541b4f0d355c53fe6') });

					case 2:
						result = _context4.sent;

						console.log(isNaN(result.overviewPoint));
						res.json(result);

					case 5:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined);
	}));

	return function (_x7, _x8) {
		return _ref80.apply(this, arguments);
	};
}());

router.get('/betorder', function () {
	var _ref81 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.t0 = res;
						_context5.next = 3;
						return (0, _updateBetOrders2.default)();

					case 3:
						_context5.t1 = _context5.sent;

						_context5.t0.json.call(_context5.t0, _context5.t1);

					case 5:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, undefined);
	}));

	return function (_x9, _x10) {
		return _ref81.apply(this, arguments);
	};
}());

router.get('/pickresult', function () {
	var _ref82 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
		return regeneratorRuntime.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_context6.next = 2;
						return (0, _updatePicks2.default)();

					case 2:
						res.json('done');

					case 3:
					case 'end':
						return _context6.stop();
				}
			}
		}, _callee6, undefined);
	}));

	return function (_x11, _x12) {
		return _ref82.apply(this, arguments);
	};
}());

router.get('/result', function () {
	var _ref83 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
		return regeneratorRuntime.wrap(function _callee7$(_context7) {
			while (1) {
				switch (_context7.prev = _context7.next) {
					case 0:
						_context7.t0 = res;
						_context7.next = 3;
						return (0, _pickMon2.default)();

					case 3:
						_context7.t1 = _context7.sent;

						_context7.t0.json.call(_context7.t0, _context7.t1);

					case 5:
					case 'end':
						return _context7.stop();
				}
			}
		}, _callee7, undefined);
	}));

	return function (_x13, _x14) {
		return _ref83.apply(this, arguments);
	};
}());

router.get('/login', function () {
	var _ref84 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
		var result;
		return regeneratorRuntime.wrap(function _callee8$(_context8) {
			while (1) {
				switch (_context8.prev = _context8.next) {
					case 0:
						_context8.next = 2;
						return _User2.default.findOne({ username: new RegExp('\\b' + 'ETU23' + '\\b', 'i') });

					case 2:
						result = _context8.sent;

						res.json(result);

					case 4:
					case 'end':
						return _context8.stop();
				}
			}
		}, _callee8, undefined);
	}));

	return function (_x15, _x16) {
		return _ref84.apply(this, arguments);
	};
}());

router.get('/testusers', function () {
	var _ref85 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
		var event;
		return regeneratorRuntime.wrap(function _callee9$(_context9) {
			while (1) {
				switch (_context9.prev = _context9.next) {
					case 0:
						_context9.next = 2;
						return _Event2.default.findOne({ ID: '1501095' });

					case 2:
						event = _context9.sent;

						console.log(event.closedAt);
						res.json(event);

					case 5:
					case 'end':
						return _context9.stop();
				}
			}
		}, _callee9, undefined);
	}));

	return function (_x17, _x18) {
		return _ref85.apply(this, arguments);
	};
}());

router.get('/testprovider', function () {
	var _ref86 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
		return regeneratorRuntime.wrap(function _callee10$(_context10) {
			while (1) {
				switch (_context10.prev = _context10.next) {
					case 0:
						_context10.next = 2;
						return (0, _updateTables2.default)();

					case 2:
						res.json('done');

					case 3:
					case 'end':
						return _context10.stop();
				}
			}
		}, _callee10, undefined);
	}));

	return function (_x19, _x20) {
		return _ref86.apply(this, arguments);
	};
}());

router.get('/cooldown', function () {
	var _ref87 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
		var newCooldown;
		return regeneratorRuntime.wrap(function _callee11$(_context11) {
			while (1) {
				switch (_context11.prev = _context11.next) {
					case 0:
						newCooldown = new _Cooldown2.default({
							usage: 'updateTable',
							sec: 10,
							updatedAt: (0, _moment2.default)()
						});
						_context11.next = 3;
						return newCooldown.save();

					case 3:
						res.json('done');

					case 4:
					case 'end':
						return _context11.stop();
				}
			}
		}, _callee11, undefined);
	}));

	return function (_x21, _x22) {
		return _ref87.apply(this, arguments);
	};
}());

router.get('/createProvider', function () {
	var _ref88 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
		var newProvider, result;
		return regeneratorRuntime.wrap(function _callee12$(_context12) {
			while (1) {
				switch (_context12.prev = _context12.next) {
					case 0:
						newProvider = new _Provider2.default({
							name: 'jo',
							options: [],
							api: '/',
							isActivate: true
						});
						_context12.next = 3;
						return newProvider.save();

					case 3:
						result = _context12.sent;

						res.json(result);

					case 5:
					case 'end':
						return _context12.stop();
				}
			}
		}, _callee12, undefined);
	}));

	return function (_x23, _x24) {
		return _ref88.apply(this, arguments);
	};
}());

router.get('/createcooldown', function () {
	var _ref89 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
		var newCooldown, result;
		return regeneratorRuntime.wrap(function _callee13$(_context13) {
			while (1) {
				switch (_context13.prev = _context13.next) {
					case 0:
						newCooldown = new _Cooldown2.default({
							usage: 'updateResult',
							sec: 3000,
							updatedAt: (0, _moment2.default)()
						});
						_context13.next = 3;
						return newCooldown.save();

					case 3:
						result = _context13.sent;

						res.json(result);

					case 5:
					case 'end':
						return _context13.stop();
				}
			}
		}, _callee13, undefined);
	}));

	return function (_x25, _x26) {
		return _ref89.apply(this, arguments);
	};
}());

router.get('/findeventcool', function () {
	var _ref90 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
		var haha;
		return regeneratorRuntime.wrap(function _callee14$(_context14) {
			while (1) {
				switch (_context14.prev = _context14.next) {
					case 0:
						_context14.next = 2;
						return _Event2.default.getcool();

					case 2:
						haha = _context14.sent;

						console.log(haha);
						res.json(haha);

					case 5:
					case 'end':
						return _context14.stop();
				}
			}
		}, _callee14, undefined);
	}));

	return function (_x27, _x28) {
		return _ref90.apply(this, arguments);
	};
}());

router.post('/findodd', function () {
	var _ref91 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(req, res) {
		var result;
		return regeneratorRuntime.wrap(function _callee15$(_context15) {
			while (1) {
				switch (_context15.prev = _context15.next) {
					case 0:
						_context15.next = 2;
						return _Event2.default.odd.findOne({ ID: '01012017_123_321_BASKETBALL_FULLGAME' });

					case 2:
						result = _context15.sent;

						res.json(result);

					case 4:
					case 'end':
						return _context15.stop();
				}
			}
		}, _callee15, undefined);
	}));

	return function (_x29, _x30) {
		return _ref91.apply(this, arguments);
	};
}());

router.post('/eventodd', function () {
	var _ref92 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(req, res) {
		var result;
		return regeneratorRuntime.wrap(function _callee16$(_context16) {
			while (1) {
				switch (_context16.prev = _context16.next) {
					case 0:
						_context16.next = 2;
						return _Event2.default.findOneAndUpdate({ ID: '1215171130AM_14929_14930_BASKETBALL_FULLGAME' }, { $unset: { expireAt: '' } });

					case 2:
						result = _context16.sent;

						res.json(result);
						// const result = await Event.findOne({ isFinished: true })
						// console.log(result)
						// res.json(result)

					case 4:
					case 'end':
						return _context16.stop();
				}
			}
		}, _callee16, undefined);
	}));

	return function (_x31, _x32) {
		return _ref92.apply(this, arguments);
	};
}());

router.post('/newevent', function () {
	var _ref93 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(req, res) {
		var newEvent, result;
		return regeneratorRuntime.wrap(function _callee17$(_context17) {
			while (1) {
				switch (_context17.prev = _context17.next) {
					case 0:
						newEvent = new _Event2.default({
							ID: '1215171130AM_14929_14930_BASKETBALL_FULLGAME',
							sport: 'Basketball',
							period: 'Full Game',
							league: 'NBA',
							region: null,
							matchTime: (0, _moment2.default)('2017-12-19T17:35:00.000+16:00'),
							team: {
								home: 'Dallas Mavericks',
								homeROT: '716',
								homePitcher: '',
								away: 'Phoenix Suns',
								awayROT: '715',
								awayPitcher: ''
							},
							score: {
								source: {
									ID: '1498737',
									provider: 'pm'
								},
								home: null,
								away: null,
								updatedAt: (0, _moment2.default)()
							},
							odd: {
								source: {
									ID: '587498',
									provider: 'jsonOdd',
									bookmaker: '3'
								},
								raw: {
									awayMoneyLine: 250,
									homeMoneyLine: -275,
									awaySpreadPoint: -7,
									awaySpreadLine: -105,
									homeSpreadPoint: 7,
									homeSpreadLine: -105,
									totalOverPoint: 209.5,
									totalOverLine: -103,
									totalUnderPoint: 209.5,
									totalUnderLine: -107,
									drawLine: 0
								},
								updatedAt: (0, _moment2.default)(),
								cutOffAt: (0, _moment2.default)('2017-12-19T17:35:00.000+16:00')
							},
							status: 'Pending',
							updatedAt: (0, _moment2.default)(),
							createdAt: (0, _moment2.default)(),
							expireAt: (0, _moment2.default)().add(100, 'y')
						});
						_context17.next = 3;
						return newEvent.save();

					case 3:
						result = _context17.sent;

						res.json(result);

					case 5:
					case 'end':
						return _context17.stop();
				}
			}
		}, _callee17, undefined);
	}));

	return function (_x33, _x34) {
		return _ref93.apply(this, arguments);
	};
}());

router.post('/testevent', function () {
	var _ref94 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(req, res) {
		var final;
		return regeneratorRuntime.wrap(function _callee18$(_context18) {
			while (1) {
				switch (_context18.prev = _context18.next) {
					case 0:
						_context18.next = 2;
						return _Event2.default.findOne({ ID: '01012017_123_321_BASKETBALL_FULLGAME' }).then(function (result) {
							result.odd.build = { action: 'basicTeaser', sport: result.sport, period: result.period };
							return result;
						});

					case 2:
						final = _context18.sent;

						// result.odd.build = { action: 'basicTeaser', sport: 'Basketball', period: 'Full Game' }
						console.log(final.odd.afterBuild);
						console.log(final.odd.isActivate);
						console.log(final.odd.isExpired);
						res.json(final);

					case 7:
					case 'end':
						return _context18.stop();
				}
			}
		}, _callee18, undefined);
	}));

	return function (_x35, _x36) {
		return _ref94.apply(this, arguments);
	};
}());

router.post('/saveagent', function () {
	var _ref95 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(req, res) {
		var newUser;
		return regeneratorRuntime.wrap(function _callee19$(_context19) {
			while (1) {
				switch (_context19.prev = _context19.next) {
					case 0:
						newUser = new _User6.default({
							portrait: '/',
							username: 'ej',
							password: '1234',
							passcode: '1234',
							isActivate: true,
							lastOnlineAt: (0, _moment2.default)(),
							createdAt: (0, _moment2.default)(),
							email: 'ej@gmail.com',
							credit: {},
							bonus: {},
							upcomingWager: {}
						});
						_context19.next = 3;
						return newUser.save();

					case 3:
						res.status(200).send('good');

					case 4:
					case 'end':
						return _context19.stop();
				}
			}
		}, _callee19, undefined);
	}));

	return function (_x37, _x38) {
		return _ref95.apply(this, arguments);
	};
}());

router.post('/saveplayer', function () {
	var _ref96 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(req, res) {
		var newUser;
		return regeneratorRuntime.wrap(function _callee20$(_context20) {
			while (1) {
				switch (_context20.prev = _context20.next) {
					case 0:
						newUser = new _User4.default({
							portrait: '/',
							username: 'david',
							password: '1234',
							passcode: '1234',
							isActivate: true,
							lastOnlineAt: (0, _moment2.default)(),
							createdAt: (0, _moment2.default)(),
							nickname: 'peter',
							weekNum: 0,
							Agent: '5a39b72c255fc1166d1d4c26',
							credit: {},
							upcomingWager: {}
						});
						_context20.next = 3;
						return newUser.save();

					case 3:
						res.status(200).send('good');

					case 4:
					case 'end':
						return _context20.stop();
				}
			}
		}, _callee20, undefined);
	}));

	return function (_x39, _x40) {
		return _ref96.apply(this, arguments);
	};
}());

router.get('/userfind', function () {
	var _ref97 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(req, res) {
		var player;
		return regeneratorRuntime.wrap(function _callee21$(_context21) {
			while (1) {
				switch (_context21.prev = _context21.next) {
					case 0:
						_context21.next = 2;
						return _User2.default.find({ username: 'plio' }).populate('agent');

					case 2:
						player = _context21.sent;

						res.status(200).send(player);

					case 4:
					case 'end':
						return _context21.stop();
				}
			}
		}, _callee21, undefined);
	}));

	return function (_x41, _x42) {
		return _ref97.apply(this, arguments);
	};
}());

// router.get('/rolefind', async (req, res) => {
// 	const users = await User.find({ role: 'agent' })
// 	res.status(200).send(users)
// })

router.get('/rolefind', function () {
	var _ref98 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(req, res) {
		var users;
		return regeneratorRuntime.wrap(function _callee22$(_context22) {
			while (1) {
				switch (_context22.prev = _context22.next) {
					case 0:
						_context22.next = 2;
						return _User2.default.find({ role: 'agent' });

					case 2:
						users = _context22.sent;

						res.json(users[0].credit.available);

					case 4:
					case 'end':
						return _context22.stop();
				}
			}
		}, _callee22, undefined);
	}));

	return function (_x43, _x44) {
		return _ref98.apply(this, arguments);
	};
}());

router.get('/tras', function () {
	var _ref99 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(req, res) {
		var newTrans, result;
		return regeneratorRuntime.wrap(function _callee23$(_context23) {
			while (1) {
				switch (_context23.prev = _context23.next) {
					case 0:
						newTrans = new _Transaction2.default({ detail: { title: 'title', content: 2 }, amount: 3 });
						_context23.next = 3;
						return newTrans.save();

					case 3:
						result = _context23.sent;

						console.log(result.amount === null);
						console.log(result.yo);
						res.json(result);
						//	await Transaction.collection.drop()
						//	res.json('ok')

					case 7:
					case 'end':
						return _context23.stop();
				}
			}
		}, _callee23, undefined);
	}));

	return function (_x45, _x46) {
		return _ref99.apply(this, arguments);
	};
}());

router.get('/new-event', function () {
	var _ref100 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(req, res) {
		var newEvent, result;
		return regeneratorRuntime.wrap(function _callee24$(_context24) {
			while (1) {
				switch (_context24.prev = _context24.next) {
					case 0:
						newEvent = new _Event2.default({
							ID: '444',
							odd: {
								default: {
									awayMoneyLine: 1
								}
							}
						});
						_context24.next = 3;
						return newEvent.save();

					case 3:
						result = _context24.sent;

						res.json(result);

					case 5:
					case 'end':
						return _context24.stop();
				}
			}
		}, _callee24, undefined);
	}));

	return function (_x47, _x48) {
		return _ref100.apply(this, arguments);
	};
}());

router.get('/test-event', function () {
	var _ref101 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(req, res) {
		var result;
		return regeneratorRuntime.wrap(function _callee25$(_context25) {
			while (1) {
				switch (_context25.prev = _context25.next) {
					case 0:
						_context25.next = 2;
						return _Event2.default.findOne({ ID: '444' });

					case 2:
						result = _context25.sent;

						result.odd.setAction = 'straight';
						console.log(result.odd.getCurrent);
						//	result.odd.action = 'straight'
						// result.odd.sport = 'Basketball'
						res.json(result);

					case 6:
					case 'end':
						return _context25.stop();
				}
			}
		}, _callee25, undefined);
	}));

	return function (_x49, _x50) {
		return _ref101.apply(this, arguments);
	};
}());

exports.default = router;
//# sourceMappingURL=index.js.map