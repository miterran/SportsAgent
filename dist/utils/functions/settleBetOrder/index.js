'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _straight = require('./straight');

var _straight2 = _interopRequireDefault(_straight);

var _parlay = require('./parlay');

var _parlay2 = _interopRequireDefault(_parlay);

var _teaser = require('./teaser');

var _teaser2 = _interopRequireDefault(_teaser);

var _reverse = require('./reverse');

var _reverse2 = _interopRequireDefault(_reverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settleBetOrder = function settleBetOrder(_ref) {
	var bet = _ref.bet,
	    Picks = _ref.Picks;

	switch (bet.action) {
		case 'straight':
			return (0, _straight2.default)(bet, Picks);
		case 'parlay':
			return (0, _parlay2.default)(bet, Picks);
		case 'basicTeaser':
		case 'specialTeaser':
		case 'bigTeaser':
		case 'superTeaser':
			return (0, _teaser2.default)(bet, Picks);
		case 'actionReverse':
		case 'winReverse':
			return (0, _reverse2.default)(bet, Picks);
		default:
			return {};
	}
};

exports.default = settleBetOrder;
//# sourceMappingURL=index.js.map