'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var TransactionSchema = new Schema({
	Agent: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	ID: { type: String, required: true },
	type: { type: String, enum: ['BetOrder', 'Iap', 'Bonus', 'CreatePlayer', 'ActionFee', 'Adjust'], required: true },
	description: { type: String, required: true },
	amount: { type: Number, required: true },
	balance: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now }
});

var Transaction = _mongoose2.default.model('Transaction', TransactionSchema);

exports.default = Transaction;
//# sourceMappingURL=Transaction.js.map