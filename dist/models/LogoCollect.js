'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var LogoCollectSchema = new Schema({
	name: { type: String },
	team: { type: String },
	sport: { type: String },
	league: { type: String },
	region: { type: String },
	detail: { type: String }
});

var LogoCollect = _mongoose2.default.model('LogoCollect', LogoCollectSchema);

exports.default = LogoCollect;
//# sourceMappingURL=LogoCollect.js.map