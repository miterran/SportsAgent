'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schema = _mongoose2.default.Schema;

var CooldownSchema = new Schema({
	usage: { type: String, unique: true, required: true },
	sec: { type: Number, required: true },
	updatedAt: { type: Date, default: Date.now }
});

var CooldownClass = function () {
	function CooldownClass() {
		_classCallCheck(this, CooldownClass);
	}

	_createClass(CooldownClass, null, [{
		key: 'isActivate',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(usage) {
				var cooldown, is;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;
								_context.next = 3;
								return this.findOne({ usage: usage });

							case 3:
								cooldown = _context.sent;
								is = (0, _moment2.default)().format('X') - (0, _moment2.default)(cooldown.updatedAt).format('X') > cooldown.sec;

								if (!is) {
									_context.next = 9;
									break;
								}

								_context.next = 8;
								return this.findOneAndUpdate({ usage: usage }, { $set: { updatedAt: (0, _moment2.default)() } }).then(function () {
									return true;
								});

							case 8:
								return _context.abrupt('return', _context.sent);

							case 9:
								return _context.abrupt('return', false);

							case 12:
								_context.prev = 12;
								_context.t0 = _context['catch'](0);
								throw new Error(__dirname + '\n' + _context.t0);

							case 15:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[0, 12]]);
			}));

			function isActivate(_x) {
				return _ref.apply(this, arguments);
			}

			return isActivate;
		}()
	}]);

	return CooldownClass;
}();

CooldownSchema.loadClass(CooldownClass);

var Cooldown = _mongoose2.default.model('Cooldown', CooldownSchema);

exports.default = Cooldown;
//# sourceMappingURL=Cooldown.js.map