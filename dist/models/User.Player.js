'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = _mongoose2.default.Schema;

var options = { discriminatorKey: 'role' };

var PlayerSchema = new Schema({
	nickname: { type: String, required: true },
	isActivate: { type: Boolean, default: true, required: true },
	isDeleted: { type: Boolean, default: false, required: true },
	Agent: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	wagerLimit: {
		straight: { type: Boolean, default: true, required: true },
		parlay: { type: Boolean, default: true, required: true },
		basicTeaser: { type: Boolean, default: true, required: true },
		specialTeaser: { type: Boolean, default: true, required: true },
		bigTeaser: { type: Boolean, default: true, required: true },
		superTeaser: { type: Boolean, default: true, required: true },
		actionReverse: { type: Boolean, default: true, required: true },
		winReverse: { type: Boolean, default: true, required: true },
		maxWin: { type: Number, min: 0, max: 100000, default: 200, required: true },
		minRisk: { type: Number, min: 10, max: 100000, default: 10, required: true },
		straightTeam: { type: Number, enum: [1], default: 1, required: true },
		parlayTeam: { type: Number, enum: [2, 3, 4, 5, 6, 7, 8], default: 6, required: true },
		basicTeaserTeam: { type: Number, enum: [2, 3, 4, 5, 6, 7, 8], default: 6, required: true },
		specialTeaserTeam: { type: Number, enum: [2, 3, 4, 5, 6, 7, 8], default: 6, required: true },
		bigTeaserTeam: { type: Number, enum: [2, 3, 4, 5, 6, 7, 8], default: 6, required: true },
		superTeaserTeam: { type: Number, enum: [3], default: 3, required: true },
		actionReverseTeam: { type: Number, enum: [2, 3, 4], default: 2, required: true },
		winReverseTeam: { type: Number, enum: [2, 3, 4], default: 2, required: true },
		updatedAt: { type: Date, default: Date.now, required: true }
	}
	// actionsOverview: {
	// 	straight: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	parlay: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	basicTeaser: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	specialTeaser: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	bigTeaser: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	superTeaser: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	actionReverse: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	winReverse: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// },
	// oddsOverview:{
	// 	'MLine': {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	'Spread': {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	Total: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	Draw: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	}
	// },
	// sportsOverview: {
	// 	Basketball: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	Football: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	Baseball: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	Hockey: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	Soccer: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	Fighting: {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// 	'ESports': {
	// 		Won: { type: Number, default: 0, required: true },
	// 		Lost: { type: Number, default: 0, required: true },
	// 		Push: { type: Number, default: 0, required: true },
	// 	},
	// }
}, options);

var PlayerClass = function () {
	function PlayerClass() {
		_classCallCheck(this, PlayerClass);
	}

	_createClass(PlayerClass, null, [{
		key: 'resetWeeklyBalanceToZero',
		value: function resetWeeklyBalanceToZero() {
			return this.update({ weekNum: { $ne: (0, _moment2.default)().isoWeek() } }, { $set: { weekNum: (0, _moment2.default)().isoWeek(), 'credit.balance': 0 } }, { multi: true });
		}
	}]);

	return PlayerClass;
}();

PlayerSchema.loadClass(PlayerClass);

var Player = _User2.default.discriminator('Player', PlayerSchema);

exports.default = Player;
//# sourceMappingURL=User.Player.js.map