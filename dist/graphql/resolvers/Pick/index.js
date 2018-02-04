'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Query = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Pick = require('../../../models/Pick');

var _Pick2 = _interopRequireDefault(_Pick);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Query = exports.Query = {
	pick: function pick(root, req) {
		return _Pick2.default.findOne({ $or: [{ _id: _mongoose2.default.Types.ObjectId(req._id) }, { ID: req.ID }] }).populate('Event').populate('BetOrder').populate('Agent').populate('Player');
	},
	picks: function picks(root, req) {
		return _Pick2.default.find({ status: req.status }).populate('Event').populate('BetOrder').populate('Agent').populate('Player');
	}
};
//# sourceMappingURL=index.js.map