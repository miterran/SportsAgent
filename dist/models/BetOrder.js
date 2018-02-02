'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

var _renameActionFullName = require('../utils/functions/renameActionFullName');

var _renameActionFullName2 = _interopRequireDefault(_renameActionFullName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = _mongoose2.default.Schema;

var BetOrderSchema = new Schema({
	ID: { type: String, required: true, unique: true }, // generate by unique time
	Player: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	Agent: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	Picks: [{ type: Schema.Types.ObjectId, ref: 'Pick', required: true }],
	bet: {
		action: { type: String, enum: ['straight', 'parlay', 'basicTeaser', 'specialTeaser', 'bigTeaser', 'superTeaser', 'winReverse', 'actionReverse'], required: true },
		type: { type: String, enum: ['wager', 'risk'], required: true },
		amount: { type: Number, required: true },
		toWin: { type: Number, required: true },
		atRisk: { type: Number, required: true }
	},
	resultAmount: { type: Number },
	isClosed: { type: Boolean, required: true },
	status: { type: String, enum: ['Won', 'Lost', 'Push', 'Pending', 'Cancelled', 'Review'], default: 'Pending', required: true },
	note: _Note2.default,
	updatedAt: { type: Date, default: Date.now },
	createdAt: { type: Date, default: Date.now }
});

var BetOrderClass = function () {
	function BetOrderClass() {
		_classCallCheck(this, BetOrderClass);
	}

	_createClass(BetOrderClass, [{
		key: 'closedAt',
		get: function get() {
			if (this.isClosed) return this.updatedAt;return null;
		}
	}, {
		key: 'title',
		get: function get() {
			return this.Picks.length + ' Team' + (this.Picks.length > 1 ? 's' : '') + ' ' + (0, _renameActionFullName2.default)(this.bet.action);
		}
	}, {
		key: 'overviewPoint',
		get: function get() {
			return 0;
		}
	}]);

	return BetOrderClass;
}();

BetOrderSchema.loadClass(BetOrderClass);

var BetOrder = _mongoose2.default.model('BetOrder', BetOrderSchema);

exports.default = BetOrder;
//# sourceMappingURL=BetOrder.js.map