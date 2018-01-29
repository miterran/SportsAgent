'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _periodTypes = require('../utils/lists/periodTypes');

var _periodTypes2 = _interopRequireDefault(_periodTypes);

var _sportTypes = require('../utils/lists/sportTypes');

var _sportTypes2 = _interopRequireDefault(_sportTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = _mongoose2.default.Schema;

var isOddPointHasQuarter = function isOddPointHasQuarter(point) {
	return Math.abs(point) % 1 === 0.25 || Math.abs(point) % 1 === 0.75;
};

var initialOdd = {
	awayMoneyLine: null,
	homeMoneyLine: null,
	awaySpreadPoint: null,
	awaySpreadLine: null,
	homeSpreadPoint: null,
	homeSpreadLine: null,
	totalOverPoint: null,
	totalOverLine: null,
	totalUnderPoint: null,
	totalUnderLine: null,
	drawLine: null
};

var EventSchema = new Schema({
	ID: { type: String, required: true },
	uniqueID: { type: String, required: true, unique: true },
	provider: { type: String, required: true },
	bookmaker: { type: String, required: true },
	sport: { type: String, enum: _sportTypes2.default, required: true },
	period: { type: String, enum: _periodTypes2.default, required: true },
	league: { type: String, required: true },
	region: { type: String },
	matchTime: { type: Date, required: true },
	isPicked: { type: Boolean, default: false, required: true },
	team: {
		home: { type: String, required: true },
		homeROT: { type: String, required: true },
		homePitcher: { type: String },
		away: { type: String, required: true },
		awayROT: { type: String, required: true },
		awayPitcher: { type: String }
	},
	score: {
		home: { type: Number },
		away: { type: Number }
	},
	odd: {
		awayMoneyLine: { type: Number },
		homeMoneyLine: { type: Number },
		awaySpreadPoint: { type: Number },
		awaySpreadLine: { type: Number },
		homeSpreadPoint: { type: Number },
		homeSpreadLine: { type: Number },
		totalOverPoint: { type: Number },
		totalOverLine: { type: Number },
		totalUnderPoint: { type: Number },
		totalUnderLine: { type: Number },
		drawLine: { type: Number }
	},
	cutOffAt: { type: Date, required: true },
	isFinished: { type: Boolean, default: false, required: true },
	status: { type: String, enum: ['Pending', 'Finished', 'Cancelled', 'Postponed', 'Review'], default: 'Pending', required: true },
	updatedAt: { type: Date, default: Date.now, required: true }
});
//	await Event.find({ isPicked: { $exists: false }, cutOffAt: { $lt: moment() } })

var EventClass = function () {
	function EventClass() {
		_classCallCheck(this, EventClass);
	}

	_createClass(EventClass, [{
		key: 'teamLogo',
		get: function get() {
			//		const url = 'http://192.168.1.10:8080/'
			var url = 'https://sportsagentapp.herokuapp.com/';
			return {
				away: url + 'images/teamlogos/' + this.team.away.split(' ').join('_') + '.png',
				home: url + 'images/teamlogos/' + this.team.home.split(' ').join('_') + '.png',
				default: url + 'images/teamlogos/' + this.sport + '.png'
			};
		}
	}, {
		key: 'title',
		get: function get() {
			return (this.sport + ' - ' + (this.region ? this.region + ' - ' : '') + this.league).toUpperCase();
		}
	}, {
		key: 'finishedAt',
		get: function get() {
			if (this.isFinished) return this.updatedAt;return null;
		}
	}, {
		key: 'isOddExpired',
		get: function get() {
			return (0, _moment2.default)().isAfter((0, _moment2.default)(this.cutOffAt));
		}
	}, {
		key: 'actionOdd',
		get: function get() {
			return this.oddWithAction;
		}
	}, {
		key: 'isActionOddActivate',
		get: function get() {
			var actionOdds = Object.values(this.oddWithAction);
			actionOdds.shift();
			return !_lodash2.default.isEmpty(_lodash2.default.compact(Object.values(actionOdds)));
		}
	}, {
		key: 'action',
		set: function set(action) {
			var _odd = this.odd,
			    awayMoneyLine = _odd.awayMoneyLine,
			    homeMoneyLine = _odd.homeMoneyLine,
			    awaySpreadPoint = _odd.awaySpreadPoint,
			    awaySpreadLine = _odd.awaySpreadLine,
			    homeSpreadPoint = _odd.homeSpreadPoint,
			    homeSpreadLine = _odd.homeSpreadLine,
			    totalOverPoint = _odd.totalOverPoint,
			    totalOverLine = _odd.totalOverLine,
			    totalUnderPoint = _odd.totalUnderPoint,
			    totalUnderLine = _odd.totalUnderLine,
			    drawLine = _odd.drawLine;


			var isMoneyActivate = awayMoneyLine !== 0 && awayMoneyLine !== null && homeMoneyLine !== 0 && homeMoneyLine !== null;
			var isSpreadActivate = awaySpreadLine !== 0 && awaySpreadLine !== null && homeSpreadLine !== 0 && homeSpreadLine !== null;
			var isTotalActivate = totalOverLine !== 0 && totalOverLine !== null && totalUnderLine !== 0 && totalUnderLine !== null;
			var isDrawActivate = drawLine !== 0 && drawLine !== null;

			switch (action) {
				case 'straight':
					this.oddWithAction = this.odd;
					return;
				case 'actionReverse':
				case 'winReverse':
				case 'parlay':
					if (this.sport !== 'Fighting' && this.sport !== 'ESports') {
						this.oddWithAction = {
							awayMoneyLine: isMoneyActivate ? awayMoneyLine : null,
							homeMoneyLine: isMoneyActivate ? homeMoneyLine : null,
							awaySpreadPoint: isSpreadActivate ? isOddPointHasQuarter(awaySpreadPoint) ? null : awaySpreadPoint : null,
							awaySpreadLine: isSpreadActivate ? isOddPointHasQuarter(awaySpreadPoint) ? null : awaySpreadLine : null,
							homeSpreadPoint: isSpreadActivate ? isOddPointHasQuarter(homeSpreadPoint) ? null : homeSpreadPoint : null,
							homeSpreadLine: isSpreadActivate ? isOddPointHasQuarter(homeSpreadPoint) ? null : homeSpreadLine : null,
							totalOverPoint: isTotalActivate ? isOddPointHasQuarter(totalOverPoint) ? null : totalOverPoint : null,
							totalOverLine: isTotalActivate ? isOddPointHasQuarter(totalOverPoint) ? null : totalOverLine : null,
							totalUnderPoint: isTotalActivate ? isOddPointHasQuarter(totalUnderPoint) ? null : totalUnderPoint : null,
							totalUnderLine: isTotalActivate ? isOddPointHasQuarter(totalUnderPoint) ? null : totalUnderLine : null,
							drawLine: isDrawActivate ? drawLine : null
						};
						return;
					}
					this.oddWithAction = initialOdd;
					return;
				case 'basicTeaser':
					if (this.period === 'Full Game') {
						if (this.sport === 'Basketball' && (this.league === 'NBA' || this.league === 'NCAAB' || this.league === 'WNBA')) {
							this.oddWithAction = {
								awayMoneyLine: null,
								homeMoneyLine: null,
								awaySpreadPoint: isSpreadActivate ? awaySpreadPoint + 4 : null,
								awaySpreadLine: null,
								homeSpreadPoint: isSpreadActivate ? homeSpreadPoint + 4 : null,
								homeSpreadLine: null,
								totalOverPoint: isTotalActivate ? totalOverPoint - 4 : null,
								totalOverLine: null,
								totalUnderPoint: isTotalActivate ? totalUnderPoint + 4 : null,
								totalUnderLine: null,
								drawLine: null
							};
							return;
						}
						if (this.sport === 'Football' && (this.league === 'NFL' || this.league === 'NCAAF' || this.league === 'CFL')) {
							this.oddWithAction = {
								awayMoneyLine: null,
								homeMoneyLine: null,
								awaySpreadPoint: isSpreadActivate ? awaySpreadPoint + 6 : null,
								awaySpreadLine: null,
								homeSpreadPoint: isSpreadActivate ? homeSpreadPoint + 6 : null,
								homeSpreadLine: null,
								totalOverPoint: isTotalActivate ? totalOverPoint - 6 : null,
								totalOverLine: null,
								totalUnderPoint: isTotalActivate ? totalUnderPoint + 6 : null,
								totalUnderLine: null,
								drawLine: null
							};
							return;
						}
					}
					this.oddWithAction = initialOdd;
					return;
				case 'specialTeaser':
					if (this.period === 'Full Game') {
						if (this.sport === 'Basketball' && (this.league === 'NBA' || this.league === 'NCAAB' || this.league === 'WNBA')) {
							this.oddWithAction = {
								awayMoneyLine: null,
								homeMoneyLine: null,
								awaySpreadPoint: isSpreadActivate ? awaySpreadPoint + 4.5 : null,
								awaySpreadLine: null,
								homeSpreadPoint: isSpreadActivate ? homeSpreadPoint + 4.5 : null,
								homeSpreadLine: null,
								totalOverPoint: isTotalActivate ? totalOverPoint - 4.5 : null,
								totalOverLine: null,
								totalUnderPoint: isTotalActivate ? totalUnderPoint + 4.5 : null,
								totalUnderLine: null,
								drawLine: null
							};
							return;
						}
						if (this.sport === 'Football' && (this.league === 'NFL' || this.league === 'NCAAF' || this.league === 'CFL')) {
							this.oddWithAction = {
								awayMoneyLine: null,
								homeMoneyLine: null,
								awaySpreadPoint: isSpreadActivate ? awaySpreadPoint + 6.5 : null,
								awaySpreadLine: null,
								homeSpreadPoint: isSpreadActivate ? homeSpreadPoint + 6.5 : null,
								homeSpreadLine: null,
								totalOverPoint: isTotalActivate ? totalOverPoint - 6.5 : null,
								totalOverLine: null,
								totalUnderPoint: isTotalActivate ? totalUnderPoint + 6.5 : null,
								totalUnderLine: null,
								drawLine: null
							};
							return;
						}
					}
					this.oddWithAction = initialOdd;
					return;
				case 'bigTeaser':
					if (this.period === 'Full Game') {
						if (this.sport === 'Basketball' && (this.league === 'NBA' || this.league === 'NCAAB' || this.league === 'WNBA')) {
							this.oddWithAction = {
								awayMoneyLine: null,
								homeMoneyLine: null,
								awaySpreadPoint: isSpreadActivate ? awaySpreadPoint + 5 : null,
								awaySpreadLine: null,
								homeSpreadPoint: isSpreadActivate ? homeSpreadPoint + 5 : null,
								homeSpreadLine: null,
								totalOverPoint: isTotalActivate ? totalOverPoint - 5 : null,
								totalOverLine: null,
								totalUnderPoint: isTotalActivate ? totalUnderPoint + 5 : null,
								totalUnderLine: null,
								drawLine: null
							};
							return;
						}
						if (this.sport === 'Football' && (this.league === 'NFL' || this.league === 'NCAAF' || this.league === 'CFL')) {
							this.oddWithAction = {
								awayMoneyLine: null,
								homeMoneyLine: null,
								awaySpreadPoint: isSpreadActivate ? awaySpreadPoint + 7 : null,
								awaySpreadLine: null,
								homeSpreadPoint: isSpreadActivate ? homeSpreadPoint + 7 : null,
								homeSpreadLine: null,
								totalOverPoint: isTotalActivate ? totalOverPoint - 7 : null,
								totalOverLine: null,
								totalUnderPoint: isTotalActivate ? totalUnderPoint + 7 : null,
								totalUnderLine: null,
								drawLine: null
							};
							return;
						}
					}
					this.oddWithAction = initialOdd;
					return;
				case 'superTeaser':
					if (this.period === 'Full Game') {
						if (this.sport === 'Basketball' && (this.league === 'NBA' || this.league === 'NCAAB' || this.league === 'WNBA')) {
							this.oddWithAction = {
								awayMoneyLine: null,
								homeMoneyLine: null,
								awaySpreadPoint: isSpreadActivate ? awaySpreadPoint + 7 : null,
								awaySpreadLine: null,
								homeSpreadPoint: isSpreadActivate ? homeSpreadPoint + 7 : null,
								homeSpreadLine: null,
								totalOverPoint: isTotalActivate ? totalOverPoint - 7 : null,
								totalOverLine: null,
								totalUnderPoint: isTotalActivate ? totalUnderPoint + 7 : null,
								totalUnderLine: null,
								drawLine: null
							};
							return;
						}
						if (this.sport === 'Football' && (this.league === 'NFL' || this.league === 'NCAAF' || this.league === 'CFL')) {
							this.oddWithAction = {
								awayMoneyLine: null,
								homeMoneyLine: null,
								awaySpreadPoint: isSpreadActivate ? awaySpreadPoint + 10 : null,
								awaySpreadLine: null,
								homeSpreadPoint: isSpreadActivate ? homeSpreadPoint + 10 : null,
								homeSpreadLine: null,
								totalOverPoint: isTotalActivate ? totalOverPoint - 10 : null,
								totalOverLine: null,
								totalUnderPoint: isTotalActivate ? totalUnderPoint + 10 : null,
								totalUnderLine: null,
								drawLine: null
							};
							return;
						}
					}
					this.oddWithAction = initialOdd;
					return;
				default:
					this.oddWithAction = initialOdd;
					return;
			}
		}
	}], [{
		key: 'deleteExpiredUnpickEvents',
		value: function deleteExpiredUnpickEvents() {
			return this.deleteMany({ isPicked: { $exists: false }, cutOffAt: { $lt: (0, _moment2.default)() } });
		}
	}]);

	return EventClass;
}();

EventSchema.loadClass(EventClass);

var Event = _mongoose2.default.model('Event', EventSchema);

exports.default = Event;
//# sourceMappingURL=Event.js.map