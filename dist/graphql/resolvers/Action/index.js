'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Mutation = exports.Query = undefined;

var _Table = require('../../../models/Table');

var _Table2 = _interopRequireDefault(_Table);

var _Event = require('../../../models/Event');

var _Event2 = _interopRequireDefault(_Event);

var _User = require('../../../models/User.Agent');

var _User2 = _interopRequireDefault(_User);

var _User3 = require('../../../models/User.Player');

var _User4 = _interopRequireDefault(_User3);

var _Pick = require('../../../models/Pick');

var _Pick2 = _interopRequireDefault(_Pick);

var _BetOrder = require('../../../models/BetOrder');

var _BetOrder2 = _interopRequireDefault(_BetOrder);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _uniqid = require('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

var _generateAtRiskToWin2 = require('../../../utils/functions/generateAtRiskToWin');

var _generateAtRiskToWin3 = _interopRequireDefault(_generateAtRiskToWin2);

var _renameActionToTable = require('../../../utils/functions/renameActionToTable');

var _renameActionToTable2 = _interopRequireDefault(_renameActionToTable);

var _renameActionFullName = require('../../../utils/functions/renameActionFullName');

var _renameActionFullName2 = _interopRequireDefault(_renameActionFullName);

var _sportTypes = require('../../../utils/lists/sportTypes');

var _sportTypes2 = _interopRequireDefault(_sportTypes);

var _periodTypes = require('../../../utils/lists/periodTypes');

var _periodTypes2 = _interopRequireDefault(_periodTypes);

var _minTeam = require('../../../utils/collections/minTeam');

var _minTeam2 = _interopRequireDefault(_minTeam);

var _updateEvents = require('../../../queues/updateEvents');

var _updateEvents2 = _interopRequireDefault(_updateEvents);

var _updateTables = require('../../../queues/updateTables');

var _updateTables2 = _interopRequireDefault(_updateTables);

var _SystemLog = require('../../../models/SystemLog');

var _SystemLog2 = _interopRequireDefault(_SystemLog);

var _Transaction = require('../../../models/Transaction');

var _Transaction2 = _interopRequireDefault(_Transaction);

var _PriceRate = require('../../../models/PriceRate');

var _PriceRate2 = _interopRequireDefault(_PriceRate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = exports.Query = {
	table: function table(root, req) {
		var _this = this;

		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			var table;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return (0, _updateTables2.default)();

						case 2:
							_context.next = 4;
							return _Table2.default.findOne({ name: (0, _renameActionToTable2.default)(req.action) });

						case 4:
							table = _context.sent;

							table.sports.sort(function (a, b) {
								return _sportTypes2.default.indexOf(a.name) - _sportTypes2.default.indexOf(b.name);
							});
							table.sports.map(function (sport) {
								return sport.leagues.map(function (league) {
									return league.periods.sort(function (a, b) {
										return _periodTypes2.default.indexOf(a.name) - _periodTypes2.default.indexOf(b.name);
									});
								});
							});
							return _context.abrupt('return', table);

						case 8:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}))();
	},
	actionEvents: function actionEvents(root, _ref) {
		var _this2 = this;

		var action = _ref.action,
		    tablePicks = _ref.tablePicks;
		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							if (!_lodash2.default.isEmpty(tablePicks)) {
								_context2.next = 2;
								break;
							}

							return _context2.abrupt('return', []);

						case 2:
							return _context2.abrupt('return', _Event2.default.find({ $or: tablePicks, cutOffAt: { $gte: (0, _moment2.default)() }, status: 'Pending', isFinished: false }).sort({ cutOffAt: 1 }).then(function (events) {
								return _lodash2.default.compact(events.map(function (event) {
									event.action = action;if (event.isActionOddActivate) {
										return event;
									} else {
										return null;
									}
								}));
							}));

						case 3:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this2);
		}))();
	},
	wagerPicks: function wagerPicks(root, _ref2) {
		var _this3 = this;

		var action = _ref2.action,
		    eventOddPicks = _ref2.eventOddPicks;
		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
			var eventIDs, events;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							if (!_lodash2.default.isEmpty(eventOddPicks)) {
								_context3.next = 2;
								break;
							}

							return _context3.abrupt('return', []);

						case 2:
							//		await updateEvents()
							eventIDs = _lodash2.default.uniqBy(eventOddPicks.map(function (pick) {
								return { _id: _mongoose2.default.Types.ObjectId(pick.Event) };
							}), '_id');
							_context3.next = 5;
							return _Event2.default.find({ $or: eventIDs }).then(function (events) {
								return events.map(function (event) {
									event.action = action;return event;
								});
							});

						case 5:
							events = _context3.sent;
							return _context3.abrupt('return', eventOddPicks.map(function (pick) {
								var event = _lodash2.default.find(events, function (event) {
									return event._id.toString() === pick.Event;
								});
								return {
									ID: pick.ID,
									Event: event,
									marked: {
										oddLine: event.actionOdd[pick.marked.oddLineTarget] || null,
										oddPoint: event.actionOdd[pick.marked.oddPointTarget] || null,
										oddTarget: pick.marked.oddTarget,
										oddType: pick.marked.oddType,
										oddLineTarget: pick.marked.oddLineTarget,
										oddPointTarget: pick.marked.oddPointTarget
									}
								};
							}));

						case 7:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, _this3);
		}))();
	}
};

var Mutation = exports.Mutation = {
	createBetOrder: function createBetOrder(root, _ref3, ctx) {
		var _this4 = this;

		var action = _ref3.action,
		    passcode = _ref3.passcode,
		    betType = _ref3.betType,
		    betAmount = _ref3.betAmount,
		    atRisk = _ref3.atRisk,
		    toWin = _ref3.toWin,
		    picks = _ref3.picks;
		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
			var player, _generateAtRiskToWin, recalAtRisk, recalToWin, agentAvailableCredit, pickIDs, existedOpenBets, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, existedOpenBet, uniqEventIDs, mongooseEventIDs, latestEvents, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, pick, latestEvent, sport, league, period, cutOffAt, _latestEvent$team, away, home, eventDetail, latestOddPoint, latestOddLine, pickOddPoint, pickOddLine, oddUpdatedDetail, newBetOrder, savedBetOrder, newPicks, savedPickIDs, theBetOrder, agent, actionFee;

			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.prev = 0;
							_context4.next = 3;
							return _User4.default.findOne({ _id: _mongoose2.default.Types.ObjectId(ctx.user._id), passcode: passcode });

						case 3:
							player = _context4.sent;

							if (player) {
								_context4.next = 6;
								break;
							}

							return _context4.abrupt('return', { title: 'Passcode Not Match', content: 'Please try again.', status: 'warning' });

						case 6:
							if (player.isActivate) {
								_context4.next = 8;
								break;
							}

							return _context4.abrupt('return', { title: 'Account Has Deactivated', content: 'Please contact Agent.', status: 'warning' });

						case 8:
							_generateAtRiskToWin = (0, _generateAtRiskToWin3.default)(action, betType, betAmount, picks), recalAtRisk = _generateAtRiskToWin.atRisk, recalToWin = _generateAtRiskToWin.toWin;

							if (!(atRisk !== Number(recalAtRisk) || toWin !== Number(recalToWin))) {
								_context4.next = 11;
								break;
							}

							return _context4.abrupt('return', { title: 'Bet Amount Error', content: 'Please try again.', status: 'warning' });

						case 11:
							_context4.next = 13;
							return _User2.default.findOne({ _id: _mongoose2.default.Types.ObjectId(player.Agent) }).then(function (agent) {
								return agent.credit.available;
							});

						case 13:
							agentAvailableCredit = _context4.sent;

							if (!(atRisk > agentAvailableCredit)) {
								_context4.next = 16;
								break;
							}

							return _context4.abrupt('return', { title: 'Agent Has Not Enough Credit', content: 'Please contact Agent.', status: 'warning' });

						case 16:
							if (!(atRisk > player.credit.available)) {
								_context4.next = 18;
								break;
							}

							return _context4.abrupt('return', { title: 'You Have Not Enough Credit', content: 'Please contact Agent.', status: 'warning' });

						case 18:
							if (!(picks.length > player.wagerLimit[action + 'Team'])) {
								_context4.next = 20;
								break;
							}

							return _context4.abrupt('return', { title: (0, _renameActionFullName2.default)(action) + ' Teams Over Wager Limit', content: 'Please try again.', status: 'warning' });

						case 20:
							if (!(picks.length < _minTeam2.default[action])) {
								_context4.next = 22;
								break;
							}

							return _context4.abrupt('return', { title: (0, _renameActionFullName2.default)(action) + ' Teams Under ' + _minTeam2.default[action], content: 'Please try again.', status: 'warning' });

						case 22:
							if (!(toWin > player.wagerLimit.maxWin)) {
								_context4.next = 24;
								break;
							}

							return _context4.abrupt('return', { title: 'Win Amount Over Wager Limit ' + player.wagerLimit.maxWin, content: 'Please try again or contact Agent.', status: 'warning' });

						case 24:
							if (!(atRisk < player.wagerLimit.minRisk)) {
								_context4.next = 26;
								break;
							}

							return _context4.abrupt('return', { title: 'Risk Amount Under ' + player.wagerLimit.minRisk, content: 'Please try again or contact Agent.', status: 'warning' });

						case 26:
							//

							//check duplicate order
							pickIDs = picks.map(function (pick) {
								return pick.ID;
							});
							_context4.next = 29;
							return _BetOrder2.default.find({ 'bet.action': action, isClosed: false }, 'ID Picks createdAt').populate({ path: 'Picks', select: 'ID' }).then(function (betOrders) {
								return betOrders.map(function (betOrder) {
									return { ID: betOrder.ID, createdAt: betOrder.createdAt, Picks: betOrder.Picks.map(function (Pick) {
											return Pick.ID;
										}) };
								});
							});

						case 29:
							existedOpenBets = _context4.sent;
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							_context4.prev = 33;
							_iterator = existedOpenBets[Symbol.iterator]();

						case 35:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								_context4.next = 42;
								break;
							}

							existedOpenBet = _step.value;

							if (!_lodash2.default.isEqual(pickIDs, existedOpenBet.Picks)) {
								_context4.next = 39;
								break;
							}

							return _context4.abrupt('return', {
								title: 'Order Duplicated',
								content: '#' + existedOpenBet.ID.toUpperCase() + ' Submitted On:, ' + (0, _moment2.default)(existedOpenBet.createdAt).format('ddd MMM DD - hh:mm A'),
								status: 'warning'
							});

						case 39:
							_iteratorNormalCompletion = true;
							_context4.next = 35;
							break;

						case 42:
							_context4.next = 48;
							break;

						case 44:
							_context4.prev = 44;
							_context4.t0 = _context4['catch'](33);
							_didIteratorError = true;
							_iteratorError = _context4.t0;

						case 48:
							_context4.prev = 48;
							_context4.prev = 49;

							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}

						case 51:
							_context4.prev = 51;

							if (!_didIteratorError) {
								_context4.next = 54;
								break;
							}

							throw _iteratorError;

						case 54:
							return _context4.finish(51);

						case 55:
							return _context4.finish(48);

						case 56:
							_context4.next = 58;
							return (0, _updateEvents2.default)();

						case 58:
							uniqEventIDs = _lodash2.default.uniqBy(picks.map(function (pick) {
								return pick.Event;
							}));
							mongooseEventIDs = uniqEventIDs.map(function (eventID) {
								return { _id: _mongoose2.default.Types.ObjectId(eventID) };
							});
							_context4.next = 62;
							return _Event2.default.find({ $or: mongooseEventIDs }).then(function (events) {
								return events.map(function (event) {
									event.action = action;return event;
								});
							});

						case 62:
							latestEvents = _context4.sent;
							_iteratorNormalCompletion2 = true;
							_didIteratorError2 = false;
							_iteratorError2 = undefined;
							_context4.prev = 66;
							_iterator2 = picks[Symbol.iterator]();

						case 68:
							if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
								_context4.next = 89;
								break;
							}

							pick = _step2.value;
							latestEvent = _lodash2.default.find(latestEvents, { _id: _mongoose2.default.Types.ObjectId(pick.Event) });

							if (latestEvent) {
								_context4.next = 73;
								break;
							}

							return _context4.abrupt('return', { title: 'Event Error', content: 'Please pick other event.', status: 'warning' });

						case 73:
							sport = latestEvent.sport, league = latestEvent.league, period = latestEvent.period, cutOffAt = latestEvent.cutOffAt, _latestEvent$team = latestEvent.team, away = _latestEvent$team.away, home = _latestEvent$team.home;
							eventDetail = sport + ' ' + league + ' ' + period + ',' + away + ' vs ' + home;

							if (!latestEvent.isOddExpired) {
								_context4.next = 77;
								break;
							}

							return _context4.abrupt('return', { title: 'Odd Expired ' + (0, _moment2.default)(cutOffAt).format('hh:mm A'), content: eventDetail, status: 'warning' });

						case 77:
							if (latestEvent.isActionOddActivate) {
								_context4.next = 79;
								break;
							}

							return _context4.abrupt('return', { title: 'Event Not Available', content: eventDetail, status: 'warning' });

						case 79:
							latestOddPoint = latestEvent.actionOdd[pick.marked.oddPointTarget] || null;
							latestOddLine = latestEvent.actionOdd[pick.marked.oddLineTarget] || null;
							pickOddPoint = pick.marked.oddPoint || null;
							pickOddLine = pick.marked.oddLine || null;
							oddUpdatedDetail = pick.marked.oddType + ' ' + pick.marked.oddTarget + ' ' + (pickOddPoint ? '( ' + pickOddPoint + ' ) ' : '') + pickOddLine + ' to ' + (latestOddPoint ? '( ' + latestOddPoint + ' ) ' : '') + latestOddLine;

							if (!(latestOddPoint !== pickOddPoint || latestOddLine !== pickOddLine)) {
								_context4.next = 86;
								break;
							}

							return _context4.abrupt('return', { title: 'Odd Has Update', content: eventDetail + ', ' + oddUpdatedDetail, status: 'warning' });

						case 86:
							_iteratorNormalCompletion2 = true;
							_context4.next = 68;
							break;

						case 89:
							_context4.next = 95;
							break;

						case 91:
							_context4.prev = 91;
							_context4.t1 = _context4['catch'](66);
							_didIteratorError2 = true;
							_iteratorError2 = _context4.t1;

						case 95:
							_context4.prev = 95;
							_context4.prev = 96;

							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}

						case 98:
							_context4.prev = 98;

							if (!_didIteratorError2) {
								_context4.next = 101;
								break;
							}

							throw _iteratorError2;

						case 101:
							return _context4.finish(98);

						case 102:
							return _context4.finish(95);

						case 103:
							_context4.next = 105;
							return _Event2.default.update({ $or: mongooseEventIDs }, { $set: { isPicked: true } }, { multi: true });

						case 105:
							newBetOrder = new _BetOrder2.default({
								ID: _uniqid2.default.process(),
								Player: ctx.user._id,
								Agent: player.Agent,
								bet: {
									action: action,
									type: betType,
									amount: betAmount,
									toWin: toWin,
									atRisk: atRisk
								},
								resultAmount: null,
								isClosed: false,
								status: 'Pending',
								note: {},
								updatedAt: (0, _moment2.default)(),
								createdAt: (0, _moment2.default)()
							});
							_context4.next = 108;
							return newBetOrder.save();

						case 108:
							savedBetOrder = _context4.sent;
							newPicks = picks.map(function (pick) {
								return new _Pick2.default({
									ID: pick.ID,
									Player: ctx.user._id,
									Agent: player.Agent,
									BetOrder: savedBetOrder._id,
									Event: pick.Event,
									marked: pick.marked,
									isClosed: false,
									status: 'Pending',
									note: {},
									updatedAt: (0, _moment2.default)(),
									created: (0, _moment2.default)()
								});
							});
							_context4.next = 112;
							return _Pick2.default.insertMany(newPicks).then(function (picks) {
								return picks.map(function (pick) {
									return pick._id;
								});
							});

						case 112:
							savedPickIDs = _context4.sent;
							_context4.next = 115;
							return _BetOrder2.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(savedBetOrder._id) }, { $set: { Picks: savedPickIDs } }, { new: true });

						case 115:
							theBetOrder = _context4.sent;
							_context4.next = 118;
							return _User4.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(ctx.user._id) }, { $inc: { 'credit.pending': atRisk }, $set: { 'credit.updatedAt': (0, _moment2.default)() } });

						case 118:
							_context4.next = 120;
							return _User2.default.findOneAndUpdate({ _id: _mongoose2.default.Types.ObjectId(player.Agent) }, { $inc: { 'credit.pending': atRisk, 'credit.balance': -10 }, $set: { 'credit.updatedAt': (0, _moment2.default)() } }, { new: true });

						case 120:
							agent = _context4.sent;
							_context4.next = 123;
							return _PriceRate2.default.findOne({ item: 'PlayerActionFee' });

						case 123:
							actionFee = _context4.sent;
							_context4.next = 126;
							return _Transaction2.default.create({
								Agent: agent._id,
								ID: savedBetOrder.ID,
								type: 'ActionFee',
								description: '(' + ctx.user.username + ') Action Fee',
								amount: actionFee.credit,
								balance: agent.credit.balance
							});

						case 126:
							_context4.next = 128;
							return _SystemLog2.default.create({ title: 'New Open Bet Order', content: ctx.user.username + ' created a open bet ' + theBetOrder.title, status: 'success' });

						case 128:
							return _context4.abrupt('return', { title: 'SUCCESS', content: '#' + savedBetOrder.ID.toUpperCase() + ' CREATED', status: 'success' });

						case 131:
							_context4.prev = 131;
							_context4.t2 = _context4['catch'](0);
							_context4.next = 135;
							return _SystemLog2.default.create({ title: 'New Open Bet Order Failed', content: ctx.user.username + ' created a open bet Failed ' + _context4.t2, status: 'danger' });

						case 135:
							return _context4.abrupt('return', { title: 'Unknow Error', content: 'Please try again later!', status: 'danger' });

						case 136:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, _this4, [[0, 131], [33, 44, 48, 56], [49,, 51, 55], [66, 91, 95, 103], [96,, 98, 102]]);
		}))();
	}
};
//# sourceMappingURL=index.js.map