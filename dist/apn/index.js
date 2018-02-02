'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _apn = require('apn');

var _apn2 = _interopRequireDefault(_apn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
	token: {
		key: _path2.default.join(__dirname, '/cert_notifications.p8'),
		keyId: _config2.default.APPLE_KEY_ID,
		teamId: _config2.default.APPLE_TEAM_ID
	},
	production: false
};

exports.default = new _apn2.default.Provider(options);
//# sourceMappingURL=index.js.map