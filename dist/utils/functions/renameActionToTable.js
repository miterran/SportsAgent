'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var renameActionToTable = function renameActionToTable(action) {
	switch (action) {
		case 'parlay':
		case 'actionReverse':
		case 'winReverse':
			return 'special';
		case 'basicTeaser':
		case 'specialTeaser':
		case 'bigTeaser':
		case 'superTeaser':
			return 'modify';
		case 'straight':
		default:
			return 'standard';
	}
};

exports.default = renameActionToTable;
//# sourceMappingURL=renameActionToTable.js.map