'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _User = require('./User.Credit');

var _User2 = _interopRequireDefault(_User);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var options = { discriminatorKey: 'role' };

var UserSchema = new Schema({
	portrait: { type: String, default: '/', required: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	passcode: { type: String, required: true },
	lastOnlineAt: { type: Date, default: Date.now, required: true },
	updatedAt: { type: Date, default: Date.now, required: true },
	createdAt: { type: Date, default: Date.now, required: true },
	weekNum: { type: Number, default: 0, required: true },
	credit: _User2.default
}, options);

var User = _mongoose2.default.model('User', UserSchema);

exports.default = User;
//# sourceMappingURL=User.js.map