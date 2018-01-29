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

var ProviderSchema = new Schema({
	name: { type: String, required: true },
	options: [{}],
	api: { type: String, default: '/' },
	isActivate: { type: Boolean, default: false }
});

var ProviderClass = function () {
	function ProviderClass() {
		_classCallCheck(this, ProviderClass);
	}

	_createClass(ProviderClass, null, [{
		key: 'isActivate',
		value: function isActivate(name) {
			return this.findOne({ name: name }).then(function (provider) {
				return provider.isActivate;
			}).catch(function (e) {
				throw new Error(__dirname + '\n' + e);
			});
		}
	}]);

	return ProviderClass;
}();

ProviderSchema.loadClass(ProviderClass);

var Provider = _mongoose2.default.model('Provider', ProviderSchema);

exports.default = Provider;
//# sourceMappingURL=Provider.js.map