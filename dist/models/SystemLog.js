'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = _mongoose2.default.Schema;

var SystemLogSchema = new Schema({
	title: { type: String },
	content: { type: String },
	status: { type: String, enum: ['success', 'warning', 'danger'] },
	createdAt: { type: Date, default: Date.now }
});

var SystemLogClass = function SystemLogClass() {
	_classCallCheck(this, SystemLogClass);
};

SystemLogSchema.loadClass(SystemLogClass);

var SystemLog = _mongoose2.default.model('SystemLog', SystemLogSchema);

exports.default = SystemLog;
//# sourceMappingURL=SystemLog.js.map