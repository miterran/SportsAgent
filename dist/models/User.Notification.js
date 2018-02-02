'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var NotificationSchema = new Schema({
	_id: false,
	deviceToken: { type: String },
	afterWager: { type: Boolean, default: true },
	afterPick: { type: Boolean, default: true },
	afterBetOrder: { type: Boolean, default: true }
});

exports.default = NotificationSchema;
//# sourceMappingURL=User.Notification.js.map