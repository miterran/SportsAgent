'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = _mongoose2.default.Schema;

var NoteSchema = new Schema({
	_id: false,
	title: { type: String },
	content: { type: String },
	status: { type: String, enum: ['success', 'warning', 'danger'] }
});

var NoteClass = function () {
	function NoteClass() {
		_classCallCheck(this, NoteClass);
	}

	_createClass(NoteClass, [{
		key: 'isActivate',
		get: function get() {
			return !_lodash2.default.isEmpty(this.title);
		}
	}]);

	return NoteClass;
}();

NoteSchema.loadClass(NoteClass);

exports.default = NoteSchema;
//# sourceMappingURL=Note.js.map