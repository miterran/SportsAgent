'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = _mongoose2.default.Schema;

var options = { discriminatorKey: 'role' };

var AgentSchema = new Schema({
	Players: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
	deletedPlayers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	email: { type: String }
}, options);

var AgentClass = function () {
	function AgentClass() {
		_classCallCheck(this, AgentClass);
	}

	_createClass(AgentClass, [{
		key: 'isBonusWeek',
		get: function get() {
			return (0, _moment2.default)().isoWeek() === this.weekNum;
		}
	}]);

	return AgentClass;
}();

AgentSchema.loadClass(AgentClass);

var Agent = _User2.default.discriminator('Agent', AgentSchema);

exports.default = Agent;
//# sourceMappingURL=User.Agent.js.map