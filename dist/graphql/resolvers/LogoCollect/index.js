'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Query = undefined;

var _LogoCollect = require('../../../models/LogoCollect');

var _LogoCollect2 = _interopRequireDefault(_LogoCollect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Query = exports.Query = {
	logos: function logos(root, req) {
		return _LogoCollect2.default.find(req);
	}
};
//# sourceMappingURL=index.js.map