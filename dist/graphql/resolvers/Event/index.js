'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Query = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Event = require('../../../models/Event');

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Query = exports.Query = {
	event: function event(root, req) {
		return _Event2.default.findOne({ $or: [{ _id: _mongoose2.default.Types.ObjectId(req._id) }, { ID: req.ID }] });
	}
};
//# sourceMappingURL=index.js.map