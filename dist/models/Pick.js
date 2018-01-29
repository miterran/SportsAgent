'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = _mongoose2.default.Schema;

var PickSchema = new Schema({
	ID: { type: String, required: true }, // singlePickID
	Player: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	Agent: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	BetOrder: { type: Schema.Types.ObjectId, ref: 'BetOrder', required: true },
	Event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
	marked: {
		oddLine: { type: Number },
		oddPoint: { type: Number },
		oddTarget: { type: String, enum: ['Home', 'Away', 'Over', 'Under', null] },
		oddType: { type: String, enum: ['MLine', 'Spread', 'Total', 'Draw'] },
		oddLineTarget: { type: String, enum: ['awayMoneyLine', 'homeMoneyLine', 'awaySpreadLine', 'homeSpreadLine', 'totalOverLine', 'totalUnderLine', 'drawLine', null] },
		oddPointTarget: { type: String, enum: ['awaySpreadPoint', 'homeSpreadPoint', 'totalOverPoint', 'totalUnderPoint', null] }
	},
	isClosed: { type: Boolean, required: true },
	status: { type: String, enum: ['Pending', 'Won', 'Won Half', 'Lost', 'Lost Half', 'Push', 'Closed', 'Cancelled', 'Postponed', 'Review'], default: 'Pending' },
	note: _Note2.default,
	updatedAt: { type: Date, default: Date.now },
	createdAt: { type: Date, default: Date.now }
});

var PickClass = function () {
	function PickClass() {
		_classCallCheck(this, PickClass);
	}

	_createClass(PickClass, [{
		key: 'closedAt',
		get: function get() {
			if (this.isClosed) return this.updatedAt;return null;
		}
		// get overviewPoint () {
		// 	switch(this.status){
		// 		case 'Won Half':
		// 		case 'Lost Half':
		// 			return 0.5
		// 		case 'Won':
		// 		case 'Lost':
		// 		case 'Push':
		// 			return 1
		// 		default:
		// 			return null
		// 	}
		// }

	}]);

	return PickClass;
}();

PickSchema.loadClass(PickClass);

var Pick = _mongoose2.default.model('Pick', PickSchema);

exports.default = Pick;
//# sourceMappingURL=Pick.js.map