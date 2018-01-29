'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var renameActionFullName = function renameActionFullName(action) {
	switch (action) {
		case 'straight':
			return 'Straight';
		case 'parlay':
			return 'Parlay';
		case 'basicTeaser':
			return 'Basic Teaser';
		case 'specialTeaser':
			return 'Special Teaser';
		case 'bigTeaser':
			return 'Big Teaser';
		case 'superTeaser':
			return 'Super Teaser';
		case 'actionReverse':
			return 'Action Reverse';
		case 'winReverse':
			return 'Win Reverse';
		default:
			return '';
	}
};

exports.default = renameActionFullName;
//# sourceMappingURL=renameActionFullName.js.map