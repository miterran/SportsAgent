'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Mutation = exports.Query = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Event = require('../../../models/Event');

var _Event2 = _interopRequireDefault(_Event);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = exports.Query = {
	event: function event(root, req) {
		return _Event2.default.findOne({ $or: [{ _id: _mongoose2.default.Types.ObjectId(req._id) }, { ID: req.ID }] });
	},
	reviewEvents: function reviewEvents(root, req) {
		return _Event2.default.find({ $or: [{ status: 'Review', isPicked: true }, { isPicked: true, isFinished: false, matchTime: { $lte: (0, _moment2.default)().add(3, 'h') } }] });
	}
};

var Mutation = exports.Mutation = {
	manuallyUpdateEventResult: function manuallyUpdateEventResult(root, _ref, ctx) {
		var _this = this;

		var _id = _ref._id,
		    ID = _ref.ID,
		    MK = _ref.MK,
		    awayScore = _ref.awayScore,
		    homeScore = _ref.homeScore,
		    status = _ref.status;
		return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			var score, newEvent;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							score = { away: awayScore, home: homeScore };

							if (!(MK !== _config2.default.MK)) {
								_context.next = 3;
								break;
							}

							return _context.abrupt('return', { title: 'Not Authenticated', content: 'Please try again.', status: 'danger' });

						case 3:
							_context.next = 5;
							return _Event2.default.findOneAndUpdate({ $or: [{ _id: _mongoose2.default.Types.ObjectId(_id) }, { ID: ID }] }, { $set: { score: score, status: status, isFinished: true } }, { new: true });

						case 5:
							newEvent = _context.sent;
							return _context.abrupt('return', newEvent);

						case 7:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}))();
	}
};
//# sourceMappingURL=index.js.map