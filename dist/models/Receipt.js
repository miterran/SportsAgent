'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ReceiptSchema = new Schema({
	Agent: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	ID: { type: String, required: true },
	platform: { type: String, enum: ['ios', 'android'], required: true },
	data: { type: String, required: true },
	credit: { type: Number, required: true },
	usd: { type: Number, required: true },
	item: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
});

var Receipt = _mongoose2.default.model('Receipt', ReceiptSchema);

exports.default = Receipt;
//# sourceMappingURL=Receipt.js.map