'use strict';

var _determinePickResult = require('../../utils/functions/determinePickResult');

var _determinePickResult2 = _interopRequireDefault(_determinePickResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mockPick1 = {
	'Event': {
		'sport': 'Basketball',
		'score': {
			'home': 126,
			'away': 101
		}
	},
	'marked': {
		'oddType': 'Spread',
		'oddTarget': 'Home',
		'oddPoint': -7.5
	}
};

var mockPick2 = {
	'Event': {
		'sport': 'Hockey',
		'score': {
			'home': 10,
			'away': 10
		}
	},
	'marked': {
		'oddType': 'Spread',
		'oddTarget': 'Home',
		'oddPoint': 0
	}
};

var mockPick3 = {
	'Event': {
		'sport': 'Soccer',
		'score': {
			'home': 10,
			'away': 10
		}
	},
	'marked': {
		'oddType': 'Spread',
		'oddTarget': 'Home',
		'oddPoint': 0
	}
};

var mockPick6 = {
	'Event': {
		'sport': 'Hockey',
		'score': {
			'home': 8,
			'away': 7
		}
	},
	'marked': {
		'oddType': 'MLine',
		'oddTarget': 'Home',
		'oddPoint': null
	}
};

var mockPick7 = {
	'Event': {
		'sport': 'Hockey',
		'score': {
			'home': 8,
			'away': 8
		}
	},
	'marked': {
		'oddType': 'MLine',
		'oddTarget': 'Home',
		'oddPoint': null
	}
};

var mockPick8 = {
	'Event': {
		'sport': 'Hockey',
		'score': {
			'home': 9,
			'away': 8
		}
	},
	'marked': {
		'oddType': 'Spread',
		'oddTarget': 'Home',
		'oddPoint': -1
	}
};

var mockPick9 = {
	'Event': {
		'sport': 'Hockey',
		'score': {
			'home': 2,
			'away': 2
		}
	},
	'marked': {
		'oddType': 'Total',
		'oddTarget': 'Over',
		'oddPoint': 4
	}
};

test('determineResult', function () {
	expect((0, _determinePickResult2.default)(mockPick1)).toBe('Won');
	expect((0, _determinePickResult2.default)(mockPick2)).toBe('Push');
	expect((0, _determinePickResult2.default)(mockPick3)).toBe('Push');
	expect((0, _determinePickResult2.default)(mockPick6)).toBe('Won');
	expect((0, _determinePickResult2.default)(mockPick7)).toBe('Lost');
	expect((0, _determinePickResult2.default)(mockPick8)).toBe('Push');
	expect((0, _determinePickResult2.default)(mockPick9)).toBe('Push');
});
//# sourceMappingURL=index.test.js.map