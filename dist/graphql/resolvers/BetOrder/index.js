'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Query = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _BetOrder = require('../../../models/BetOrder');

var _BetOrder2 = _interopRequireDefault(_BetOrder);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = exports.Query = {
	betOrder: function betOrder(root, req) {
		var _this = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (req.BetOrder) {
								_context.next = 2;
								break;
							}

							return _context.abrupt('return', null);

						case 2:
							return _context.abrupt('return', _BetOrder2.default.findOne({ _id: _mongoose2.default.Types.ObjectId(req.BetOrder) }).populate({ path: 'Picks', populate: { path: 'Event' } }).populate({ path: 'Player', select: 'username nickname' }));

						case 3:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}))();
	},
	betOrders: function betOrders(root, _ref, ctx) {
		var _this2 = this;

		var Player = _ref.Player,
		    isClosed = _ref.isClosed,
		    startOfWeekNum = _ref.startOfWeekNum,
		    endOfWeekNum = _ref.endOfWeekNum;
		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
			var query, sortByDate;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							query = { isClosed: isClosed };
							sortByDate = isClosed ? 'updatedAt' : 'createdAt';

							if (ctx.user.role === 'Agent') {
								query = Player === '' ? _lodash2.default.merge(query, { Agent: _mongoose2.default.Types.ObjectId(ctx.user._id) }) : _lodash2.default.merge(query, { Player: _mongoose2.default.Types.ObjectId(Player) });
							}
							if (ctx.user.role === 'Player') {
								query = _lodash2.default.merge(query, { Player: _mongoose2.default.Types.ObjectId(ctx.user._id) });
							}

							if (!isClosed) {
								_context2.next = 10;
								break;
							}

							if (_lodash2.default.isNumber(startOfWeekNum)) {
								_context2.next = 7;
								break;
							}

							throw new Error('Missing Start Of Week Num');

						case 7:
							if (_lodash2.default.isNumber(endOfWeekNum)) {
								_context2.next = 9;
								break;
							}

							throw new Error('Missing End Of Week Num');

						case 9:
							query = _lodash2.default.merge(query, _defineProperty({}, sortByDate, { $gte: (0, _moment2.default)().add(Number(startOfWeekNum), 'w').startOf('isoWeek'), $lte: (0, _moment2.default)().add(Number(endOfWeekNum), 'w').endOf('isoWeek') }));

						case 10:
							return _context2.abrupt('return', _BetOrder2.default.find(query).populate({ path: 'Player', select: 'username nickname' }).sort(_defineProperty({}, sortByDate, 'descending')));

						case 11:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this2);
		}))();
	},
	betOrdersOverview: function betOrdersOverview(root, _ref2, ctx) {
		var _this3 = this;

		var Player = _ref2.Player,
		    isClosed = _ref2.isClosed,
		    startOfWeekNum = _ref2.startOfWeekNum,
		    endOfWeekNum = _ref2.endOfWeekNum;
		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
			var query, sortByDate, betOrders, picks;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							query = { isClosed: isClosed };
							sortByDate = isClosed ? 'updatedAt' : 'createdAt';

							if (ctx.user.role === 'Agent') {
								query = Player === '' ? _lodash2.default.merge(query, { Agent: _mongoose2.default.Types.ObjectId(ctx.user._id) }) : _lodash2.default.merge(query, { Player: _mongoose2.default.Types.ObjectId(Player) });
							}
							if (ctx.user.role === 'Player') {
								query = _lodash2.default.merge(query, { Player: _mongoose2.default.Types.ObjectId(ctx.user._id) });
							}

							if (!isClosed) {
								_context3.next = 10;
								break;
							}

							if (_lodash2.default.isNumber(startOfWeekNum)) {
								_context3.next = 7;
								break;
							}

							throw new Error('Missing Start Of Week Num');

						case 7:
							if (_lodash2.default.isNumber(endOfWeekNum)) {
								_context3.next = 9;
								break;
							}

							throw new Error('Missing End Of Week Num');

						case 9:
							query = _lodash2.default.merge(query, _defineProperty({}, sortByDate, { $gte: (0, _moment2.default)().add(Number(startOfWeekNum), 'w').startOf('isoWeek'), $lte: (0, _moment2.default)().add(Number(endOfWeekNum), 'w').endOf('isoWeek') }));

						case 10:
							_context3.next = 12;
							return _BetOrder2.default.find(query).populate({ path: 'Picks', populate: { path: 'Event' } });

						case 12:
							betOrders = _context3.sent;
							picks = _lodash2.default.flatten(betOrders.map(function (betOrder) {
								return betOrder.Picks.map(function (pick) {
									return pick;
								});
							}));

							//		const picks = await Pick.find(query).populate('Event')

							return _context3.abrupt('return', {
								activePlayers: _lodash2.default.uniq(betOrders.map(function (betOrder) {
									return betOrder.Player.toString();
								})).length,
								resultAmount: isClosed ? betOrders.reduce(function (sum, _ref3) {
									var resultAmount = _ref3.resultAmount;
									return sum + resultAmount;
								}, 0) : null,
								totalAtRisk: betOrders.reduce(function (sum, _ref4) {
									var atRisk = _ref4.bet.atRisk;
									return sum + atRisk;
								}, 0),
								totalToWin: betOrders.reduce(function (sum, _ref5) {
									var toWin = _ref5.bet.toWin;
									return sum + toWin;
								}, 0),
								totalBets: betOrders.length,
								overview: {
									action: {
										straight: {
											Won: betOrders.reduce(function (sum, _ref6) {
												var status = _ref6.status,
												    action = _ref6.bet.action;
												return sum + (action === 'straight' && status === 'Won');
											}, 0),
											Lost: betOrders.reduce(function (sum, _ref7) {
												var status = _ref7.status,
												    action = _ref7.bet.action;
												return sum + (action === 'straight' && status === 'Lost');
											}, 0),
											Push: betOrders.reduce(function (sum, _ref8) {
												var status = _ref8.status,
												    action = _ref8.bet.action;
												return sum + (action === 'straight' && status === 'Push');
											}, 0),
											Pending: betOrders.reduce(function (sum, _ref9) {
												var status = _ref9.status,
												    action = _ref9.bet.action;
												return sum + (action === 'straight' && status === 'Pending');
											}, 0)
										},
										parlay: {
											Won: betOrders.reduce(function (sum, _ref10) {
												var status = _ref10.status,
												    action = _ref10.bet.action;
												return sum + (action === 'parlay' && status === 'Won');
											}, 0),
											Lost: betOrders.reduce(function (sum, _ref11) {
												var status = _ref11.status,
												    action = _ref11.bet.action;
												return sum + (action === 'parlay' && status === 'Lost');
											}, 0),
											Push: betOrders.reduce(function (sum, _ref12) {
												var status = _ref12.status,
												    action = _ref12.bet.action;
												return sum + (action === 'parlay' && status === 'Push');
											}, 0),
											Pending: betOrders.reduce(function (sum, _ref13) {
												var status = _ref13.status,
												    action = _ref13.bet.action;
												return sum + (action === 'parlay' && status === 'Pending');
											}, 0)
										},
										basicTeaser: {
											Won: betOrders.reduce(function (sum, _ref14) {
												var status = _ref14.status,
												    action = _ref14.bet.action;
												return sum + (action === 'basicTeaser' && status === 'Won');
											}, 0),
											Lost: betOrders.reduce(function (sum, _ref15) {
												var status = _ref15.status,
												    action = _ref15.bet.action;
												return sum + (action === 'basicTeaser' && status === 'Lost');
											}, 0),
											Push: betOrders.reduce(function (sum, _ref16) {
												var status = _ref16.status,
												    action = _ref16.bet.action;
												return sum + (action === 'basicTeaser' && status === 'Push');
											}, 0),
											Pending: betOrders.reduce(function (sum, _ref17) {
												var status = _ref17.status,
												    action = _ref17.bet.action;
												return sum + (action === 'basicTeaser' && status === 'Pending');
											}, 0)
										},
										specialTeaser: {
											Won: betOrders.reduce(function (sum, _ref18) {
												var status = _ref18.status,
												    action = _ref18.bet.action;
												return sum + (action === 'specialTeaser' && status === 'Won');
											}, 0),
											Lost: betOrders.reduce(function (sum, _ref19) {
												var status = _ref19.status,
												    action = _ref19.bet.action;
												return sum + (action === 'specialTeaser' && status === 'Lost');
											}, 0),
											Push: betOrders.reduce(function (sum, _ref20) {
												var status = _ref20.status,
												    action = _ref20.bet.action;
												return sum + (action === 'specialTeaser' && status === 'Push');
											}, 0),
											Pending: betOrders.reduce(function (sum, _ref21) {
												var status = _ref21.status,
												    action = _ref21.bet.action;
												return sum + (action === 'specialTeaser' && status === 'Pending');
											}, 0)
										},
										bigTeaser: {
											Won: betOrders.reduce(function (sum, _ref22) {
												var status = _ref22.status,
												    action = _ref22.bet.action;
												return sum + (action === 'bigTeaser' && status === 'Won');
											}, 0),
											Lost: betOrders.reduce(function (sum, _ref23) {
												var status = _ref23.status,
												    action = _ref23.bet.action;
												return sum + (action === 'bigTeaser' && status === 'Lost');
											}, 0),
											Push: betOrders.reduce(function (sum, _ref24) {
												var status = _ref24.status,
												    action = _ref24.bet.action;
												return sum + (action === 'bigTeaser' && status === 'Push');
											}, 0),
											Pending: betOrders.reduce(function (sum, _ref25) {
												var status = _ref25.status,
												    action = _ref25.bet.action;
												return sum + (action === 'bigTeaser' && status === 'Pending');
											}, 0)
										},
										superTeaser: {
											Won: betOrders.reduce(function (sum, _ref26) {
												var status = _ref26.status,
												    action = _ref26.bet.action;
												return sum + (action === 'superTeaser' && status === 'Won');
											}, 0),
											Lost: betOrders.reduce(function (sum, _ref27) {
												var status = _ref27.status,
												    action = _ref27.bet.action;
												return sum + (action === 'superTeaser' && status === 'Lost');
											}, 0),
											Push: betOrders.reduce(function (sum, _ref28) {
												var status = _ref28.status,
												    action = _ref28.bet.action;
												return sum + (action === 'superTeaser' && status === 'Push');
											}, 0),
											Pending: betOrders.reduce(function (sum, _ref29) {
												var status = _ref29.status,
												    action = _ref29.bet.action;
												return sum + (action === 'superTeaser' && status === 'Pending');
											}, 0)
										},
										winReverse: {
											Won: betOrders.reduce(function (sum, _ref30) {
												var status = _ref30.status,
												    action = _ref30.bet.action;
												return sum + (action === 'winReverse' && status === 'Won');
											}, 0),
											Lost: betOrders.reduce(function (sum, _ref31) {
												var status = _ref31.status,
												    action = _ref31.bet.action;
												return sum + (action === 'winReverse' && status === 'Lost');
											}, 0),
											Push: betOrders.reduce(function (sum, _ref32) {
												var status = _ref32.status,
												    action = _ref32.bet.action;
												return sum + (action === 'winReverse' && status === 'Push');
											}, 0),
											Pending: betOrders.reduce(function (sum, _ref33) {
												var status = _ref33.status,
												    action = _ref33.bet.action;
												return sum + (action === 'winReverse' && status === 'Pending');
											}, 0)
										},
										actionReverse: {
											Won: betOrders.reduce(function (sum, _ref34) {
												var status = _ref34.status,
												    action = _ref34.bet.action;
												return sum + (action === 'actionReverse' && status === 'Won');
											}, 0),
											Lost: betOrders.reduce(function (sum, _ref35) {
												var status = _ref35.status,
												    action = _ref35.bet.action;
												return sum + (action === 'actionReverse' && status === 'Lost');
											}, 0),
											Push: betOrders.reduce(function (sum, _ref36) {
												var status = _ref36.status,
												    action = _ref36.bet.action;
												return sum + (action === 'actionReverse' && status === 'Push');
											}, 0),
											Pending: betOrders.reduce(function (sum, _ref37) {
												var status = _ref37.status,
												    action = _ref37.bet.action;
												return sum + (action === 'actionReverse' && status === 'Pending');
											}, 0)
										}
									},
									odd: {
										MLine: {
											Won: picks.reduce(function (sum, _ref38) {
												var status = _ref38.status,
												    oddType = _ref38.marked.oddType;
												return sum + (oddType === 'MLine' && status === 'Won');
											}, 0),
											Lost: picks.reduce(function (sum, _ref39) {
												var status = _ref39.status,
												    oddType = _ref39.marked.oddType;
												return sum + (oddType === 'MLine' && status === 'Lost');
											}, 0),
											Push: picks.reduce(function (sum, _ref40) {
												var status = _ref40.status,
												    oddType = _ref40.marked.oddType;
												return sum + (oddType === 'MLine' && status === 'Push');
											}, 0),
											Pending: picks.reduce(function (sum, _ref41) {
												var status = _ref41.status,
												    oddType = _ref41.marked.oddType;
												return sum + (oddType === 'MLine' && status === 'Pending');
											}, 0)
										},
										Spread: {
											Won: picks.reduce(function (sum, _ref42) {
												var status = _ref42.status,
												    oddType = _ref42.marked.oddType;
												return sum + (oddType === 'Spread' && status === 'Won');
											}, 0),
											Lost: picks.reduce(function (sum, _ref43) {
												var status = _ref43.status,
												    oddType = _ref43.marked.oddType;
												return sum + (oddType === 'Spread' && status === 'Lost');
											}, 0),
											Push: picks.reduce(function (sum, _ref44) {
												var status = _ref44.status,
												    oddType = _ref44.marked.oddType;
												return sum + (oddType === 'Spread' && status === 'Push');
											}, 0),
											Pending: picks.reduce(function (sum, _ref45) {
												var status = _ref45.status,
												    oddType = _ref45.marked.oddType;
												return sum + (oddType === 'Spread' && status === 'Pending');
											}, 0)
										},
										Total: {
											Won: picks.reduce(function (sum, _ref46) {
												var status = _ref46.status,
												    oddType = _ref46.marked.oddType;
												return sum + (oddType === 'Total' && status === 'Won');
											}, 0),
											Lost: picks.reduce(function (sum, _ref47) {
												var status = _ref47.status,
												    oddType = _ref47.marked.oddType;
												return sum + (oddType === 'Total' && status === 'Lost');
											}, 0),
											Push: picks.reduce(function (sum, _ref48) {
												var status = _ref48.status,
												    oddType = _ref48.marked.oddType;
												return sum + (oddType === 'Total' && status === 'Push');
											}, 0),
											Pending: picks.reduce(function (sum, _ref49) {
												var status = _ref49.status,
												    oddType = _ref49.marked.oddType;
												return sum + (oddType === 'Total' && status === 'Pending');
											}, 0)
										},
										Draw: {
											Won: picks.reduce(function (sum, _ref50) {
												var status = _ref50.status,
												    oddType = _ref50.marked.oddType;
												return sum + (oddType === 'Draw' && status === 'Won');
											}, 0),
											Lost: picks.reduce(function (sum, _ref51) {
												var status = _ref51.status,
												    oddType = _ref51.marked.oddType;
												return sum + (oddType === 'Draw' && status === 'Lost');
											}, 0),
											Push: picks.reduce(function (sum, _ref52) {
												var status = _ref52.status,
												    oddType = _ref52.marked.oddType;
												return sum + (oddType === 'Draw' && status === 'Push');
											}, 0),
											Pending: picks.reduce(function (sum, _ref53) {
												var status = _ref53.status,
												    oddType = _ref53.marked.oddType;
												return sum + (oddType === 'Draw' && status === 'Pending');
											}, 0)
										}
									},
									sport: {
										Basketball: {
											Won: picks.reduce(function (sum, _ref54) {
												var status = _ref54.status,
												    sport = _ref54.Event.sport;
												return sum + (sport === 'Basketball' && status === 'Won');
											}, 0),
											Lost: picks.reduce(function (sum, _ref55) {
												var status = _ref55.status,
												    sport = _ref55.Event.sport;
												return sum + (sport === 'Basketball' && status === 'Lost');
											}, 0),
											Push: picks.reduce(function (sum, _ref56) {
												var status = _ref56.status,
												    sport = _ref56.Event.sport;
												return sum + (sport === 'Basketball' && status === 'Push');
											}, 0),
											Pending: picks.reduce(function (sum, _ref57) {
												var status = _ref57.status,
												    sport = _ref57.Event.sport;
												return sum + (sport === 'Basketball' && status === 'Pending');
											}, 0)
										},
										Football: {
											Won: picks.reduce(function (sum, _ref58) {
												var status = _ref58.status,
												    sport = _ref58.Event.sport;
												return sum + (sport === 'Football' && status === 'Won');
											}, 0),
											Lost: picks.reduce(function (sum, _ref59) {
												var status = _ref59.status,
												    sport = _ref59.Event.sport;
												return sum + (sport === 'Football' && status === 'Lost');
											}, 0),
											Push: picks.reduce(function (sum, _ref60) {
												var status = _ref60.status,
												    sport = _ref60.Event.sport;
												return sum + (sport === 'Football' && status === 'Push');
											}, 0),
											Pending: picks.reduce(function (sum, _ref61) {
												var status = _ref61.status,
												    sport = _ref61.Event.sport;
												return sum + (sport === 'Football' && status === 'Pending');
											}, 0)
										},
										Baseball: {
											Won: picks.reduce(function (sum, _ref62) {
												var status = _ref62.status,
												    sport = _ref62.Event.sport;
												return sum + (sport === 'Baseball' && status === 'Won');
											}, 0),
											Lost: picks.reduce(function (sum, _ref63) {
												var status = _ref63.status,
												    sport = _ref63.Event.sport;
												return sum + (sport === 'Baseball' && status === 'Lost');
											}, 0),
											Push: picks.reduce(function (sum, _ref64) {
												var status = _ref64.status,
												    sport = _ref64.Event.sport;
												return sum + (sport === 'Baseball' && status === 'Push');
											}, 0),
											Pending: picks.reduce(function (sum, _ref65) {
												var status = _ref65.status,
												    sport = _ref65.Event.sport;
												return sum + (sport === 'Baseball' && status === 'Pending');
											}, 0)
										},
										Soccer: {
											Won: picks.reduce(function (sum, _ref66) {
												var status = _ref66.status,
												    sport = _ref66.Event.sport;
												return sum + (sport === 'Soccer' && status === 'Won');
											}, 0),
											Lost: picks.reduce(function (sum, _ref67) {
												var status = _ref67.status,
												    sport = _ref67.Event.sport;
												return sum + (sport === 'Soccer' && status === 'Lost');
											}, 0),
											Push: picks.reduce(function (sum, _ref68) {
												var status = _ref68.status,
												    sport = _ref68.Event.sport;
												return sum + (sport === 'Soccer' && status === 'Push');
											}, 0),
											Pending: picks.reduce(function (sum, _ref69) {
												var status = _ref69.status,
												    sport = _ref69.Event.sport;
												return sum + (sport === 'Soccer' && status === 'Pending');
											}, 0)
										},
										Hockey: {
											Won: picks.reduce(function (sum, _ref70) {
												var status = _ref70.status,
												    sport = _ref70.Event.sport;
												return sum + (sport === 'Hockey' && status === 'Won');
											}, 0),
											Lost: picks.reduce(function (sum, _ref71) {
												var status = _ref71.status,
												    sport = _ref71.Event.sport;
												return sum + (sport === 'Hockey' && status === 'Lost');
											}, 0),
											Push: picks.reduce(function (sum, _ref72) {
												var status = _ref72.status,
												    sport = _ref72.Event.sport;
												return sum + (sport === 'Hockey' && status === 'Push');
											}, 0),
											Pending: picks.reduce(function (sum, _ref73) {
												var status = _ref73.status,
												    sport = _ref73.Event.sport;
												return sum + (sport === 'Hockey' && status === 'Pending');
											}, 0)
										},
										Fighting: {
											Won: picks.reduce(function (sum, _ref74) {
												var status = _ref74.status,
												    sport = _ref74.Event.sport;
												return sum + (sport === 'Fighting' && status === 'Won');
											}, 0),
											Lost: picks.reduce(function (sum, _ref75) {
												var status = _ref75.status,
												    sport = _ref75.Event.sport;
												return sum + (sport === 'Fighting' && status === 'Lost');
											}, 0),
											Push: picks.reduce(function (sum, _ref76) {
												var status = _ref76.status,
												    sport = _ref76.Event.sport;
												return sum + (sport === 'Fighting' && status === 'Push');
											}, 0),
											Pending: picks.reduce(function (sum, _ref77) {
												var status = _ref77.status,
												    sport = _ref77.Event.sport;
												return sum + (sport === 'Fighting' && status === 'Pending');
											}, 0)
										},
										ESports: {
											Won: picks.reduce(function (sum, _ref78) {
												var status = _ref78.status,
												    sport = _ref78.Event.sport;
												return sum + (sport === 'ESports' && status === 'Won');
											}, 0),
											Lost: picks.reduce(function (sum, _ref79) {
												var status = _ref79.status,
												    sport = _ref79.Event.sport;
												return sum + (sport === 'ESports' && status === 'Lost');
											}, 0),
											Push: picks.reduce(function (sum, _ref80) {
												var status = _ref80.status,
												    sport = _ref80.Event.sport;
												return sum + (sport === 'ESports' && status === 'Push');
											}, 0),
											Pending: picks.reduce(function (sum, _ref81) {
												var status = _ref81.status,
												    sport = _ref81.Event.sport;
												return sum + (sport === 'ESports' && status === 'Pending');
											}, 0)
										}
									}
								}
							});

						case 15:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, _this3);
		}))();
	}
};
//# sourceMappingURL=index.js.map