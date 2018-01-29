'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var options = { discriminatorKey: 'role' };

var AdminSchema = new Schema({}, options);

var Admin = _User2.default.discriminator('Admin', AdminSchema);

exports.default = Admin;
//# sourceMappingURL=User.Admin.js.map