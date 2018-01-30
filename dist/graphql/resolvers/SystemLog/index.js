'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Query = undefined;

var _SystemLog = require('../../../models/SystemLog');

var _SystemLog2 = _interopRequireDefault(_SystemLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Query = exports.Query = {
	systemLogs: function systemLogs(root, req, ctx) {
		return _SystemLog2.default.find({ status: req.status }).sort({ createdAt: 'descending' });
	}
};
//# sourceMappingURL=index.js.map