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

var _Pick = require('../../models/Pick');

var _Pick2 = _interopRequireDefault(_Pick);

var _SystemLog = require('../../models/SystemLog');

var _SystemLog2 = _interopRequireDefault(_SystemLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var axiosJsonOdd = _axios2.default.create({ headers: { 'JsonOdds-API-Key': _config2.default.jsonOddApiKey } });

var jsonOdd = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
		var pickJsonOddIDs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret;

		return regeneratorRuntime.wrap(function _callee2$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						// eslint-disable-next-line
						console.log('update json odd score');
						_context3.prev = 1;
						_context3.next = 4;
						return _Pick2.default.find({ status: 'Pending' }, 'Event').populate({ path: 'Event', match: { isPicked: true, provider: 'jo', status: 'Pending', matchTime: { $lt: (0, _moment2.default)().subtract(10, 'm') } }, select: 'ID' }).then(function (picks) {
							return _lodash2.default.uniqBy(_lodash2.default.compact(picks.map(function (pick) {
								return pick.Event;
							})), 'ID');
						}).map(function (event) {
							return event.ID;
						});

					case 4:
						pickJsonOddIDs = _context3.sent;

						if (!_lodash2.default.isEmpty(pickJsonOddIDs)) {
							_context3.next = 7;
							break;
						}

						return _context3.abrupt('return');

					case 7:
						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context3.prev = 10;
						_loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
							var pickJsonOddID, latestJsonOddScore, status, update;
							return regeneratorRuntime.wrap(function _loop$(_context2) {
								while (1) {
									switch (_context2.prev = _context2.next) {
										case 0:
											pickJsonOddID = _step.value;
											_context2.next = 3;
											return axiosJsonOdd.get('https://jsonodds.com/api/results/' + pickJsonOddID).then(function () {
												var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res) {
													return regeneratorRuntime.wrap(function _callee$(_context) {
														while (1) {
															switch (_context.prev = _context.next) {
																case 0:
																	if (!(res.data.length === 1)) {
																		_context.next = 2;
																		break;
																	}

																	return _context.abrupt('return', res.data[0]);

																case 2:
																	if (!(res.data.length > 1)) {
																		_context.next = 6;
																		break;
																	}

																	_context.next = 5;
																	return _SystemLog2.default.create({ title: 'json odd score result has 2 object', content: 'https://jsonodds.com/api/results/' + pickJsonOddID, status: 'warning' });

																case 5:
																	return _context.abrupt('return', {});

																case 6:
																	if (!_lodash2.default.isEmpty(res.data)) {
																		_context.next = 10;
																		break;
																	}

																	_context.next = 9;
																	return _SystemLog2.default.create({ title: 'json odd score result empty ', content: 'https://jsonodds.com/api/results/' + pickJsonOddID, status: 'warning' });

																case 9:
																	return _context.abrupt('return', {});

																case 10:
																case 'end':
																	return _context.stop();
															}
														}
													}, _callee, undefined);
												}));

												return function (_x) {
													return _ref2.apply(this, arguments);
												};
											}());

										case 3:
											latestJsonOddScore = _context2.sent;

											if (!_lodash2.default.isEmpty(latestJsonOddScore)) {
												_context2.next = 6;
												break;
											}

											return _context2.abrupt('return', 'continue');

										case 6:
											status = '';
											_context2.t0 = latestJsonOddScore.FinalType;
											_context2.next = _context2.t0 === 'NotFinished' ? 10 : _context2.t0 === 'Finished' ? 12 : _context2.t0 === 'Postponed' ? 14 : _context2.t0 === 'Abandoned' ? 16 : _context2.t0 === 'Canceled' ? 16 : _context2.t0 === 'Retired' ? 16 : 18;
											break;

										case 10:
											status = 'Pending';
											return _context2.abrupt('break', 22);

										case 12:
											status = 'Finished';
											return _context2.abrupt('break', 22);

										case 14:
											status = 'Postponed';
											return _context2.abrupt('break', 22);

										case 16:
											status = 'Cancelled';
											return _context2.abrupt('break', 22);

										case 18:
											_context2.next = 20;
											return _SystemLog2.default.create({ title: 'update json odd score has Review', content: '' + JSON.stringify(latestJsonOddScore), status: 'warning' });

										case 20:
											status = 'Review';
											return _context2.abrupt('break', 22);

										case 22:
											update = {
												score: {
													away: Number(latestJsonOddScore.AwayScore),
													home: Number(latestJsonOddScore.HomeScore)
												},
												isFinished: latestJsonOddScore.Final,
												status: status,
												updatedAt: (0, _moment2.default)()
											};
											_context2.next = 25;
											return _Event2.default.findOneAndUpdate({ ID: pickJsonOddID, provider: 'jo', status: 'Pending' }, { $set: update });

										case 25:
										case 'end':
											return _context2.stop();
									}
								}
							}, _loop, undefined);
						});
						_iterator = pickJsonOddIDs[Symbol.iterator]();

					case 13:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context3.next = 21;
							break;
						}

						return _context3.delegateYield(_loop(), 't0', 15);

					case 15:
						_ret = _context3.t0;

						if (!(_ret === 'continue')) {
							_context3.next = 18;
							break;
						}

						return _context3.abrupt('continue', 18);

					case 18:
						_iteratorNormalCompletion = true;
						_context3.next = 13;
						break;

					case 21:
						_context3.next = 27;
						break;

					case 23:
						_context3.prev = 23;
						_context3.t1 = _context3['catch'](10);
						_didIteratorError = true;
						_iteratorError = _context3.t1;

					case 27:
						_context3.prev = 27;
						_context3.prev = 28;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 30:
						_context3.prev = 30;

						if (!_didIteratorError) {
							_context3.next = 33;
							break;
						}

						throw _iteratorError;

					case 33:
						return _context3.finish(30);

					case 34:
						return _context3.finish(27);

					case 35:
						_context3.next = 41;
						break;

					case 37:
						_context3.prev = 37;
						_context3.t2 = _context3['catch'](1);
						_context3.next = 41;
						return _SystemLog2.default.create({ title: 'update json odd score Failed', content: '' + _context3.t2, status: 'danger' });

					case 41:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee2, undefined, [[1, 37], [10, 23, 27, 35], [28,, 30, 34]]);
	}));

	return function jsonOdd() {
		return _ref.apply(this, arguments);
	};
}();

exports.default = jsonOdd;
//# sourceMappingURL=jsonOdd.js.map