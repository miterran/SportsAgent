'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = _mongoose2.default.Schema;

var CreditSchema = new Schema({
	_id: false,
	initial: { type: Number, min: 0, max: 100000, default: 0, required: true },
	balance: { type: Number, default: 0, required: true },
	pending: { type: Number, default: 0, required: true },
	updatedAt: { type: Date, default: Date.now, required: true }
});

var CreditClass = function () {
	function CreditClass() {
		_classCallCheck(this, CreditClass);
	}

	_createClass(CreditClass, [{
		key: 'available',
		get: function get() {
			return this.initial + this.balance - this.pending;
		}
	}]);

	return CreditClass;
}();

var Credit = CreditSchema.loadClass(CreditClass);

exports.default = Credit;
//# sourceMappingURL=User.Credit.js.map