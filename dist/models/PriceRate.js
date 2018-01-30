'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var PriceRateSchema = new Schema({
	item: { type: String, unique: true },
	usd: { type: Number },
	credit: { type: Number }
});

var PriceRate = _mongoose2.default.model('PriceRate', PriceRateSchema);

exports.default = PriceRate;
//# sourceMappingURL=PriceRate.js.map