'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _periodTypes = require('../utils/lists/periodTypes');

var _periodTypes2 = _interopRequireDefault(_periodTypes);

var _sportTypes = require('../utils/lists/sportTypes');

var _sportTypes2 = _interopRequireDefault(_sportTypes);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var periodSchema = new Schema({
	name: { type: String, enum: _periodTypes2.default }
});

var LeagueSchema = new Schema({
	name: { type: String },
	region: { type: String },
	periods: [periodSchema]
});

var SportSchema = new Schema({
	name: { type: String, enum: _sportTypes2.default, required: true },
	leagues: [LeagueSchema]
});

var TableSchema = new Schema({
	name: { type: String, enum: ['standard', 'modify', 'special'] },
	sports: [SportSchema]
});

var Table = _mongoose2.default.model('Table', TableSchema);

exports.default = Table;
//# sourceMappingURL=Table.js.map