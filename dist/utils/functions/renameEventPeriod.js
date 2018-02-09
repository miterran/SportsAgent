'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var renameEventPeriod = function renameEventPeriod(period) {
	switch (period) {

		case 'Game':
			return 'Full Game';

		case '1st Half':
		case 'First Half':
		case 'FirstHalf':
			return 'First Half';

		case '2nd Half':
		case 'Second Half':
		case 'SecondHalf':
			return 'Second Half';

		case '1st Quarter':
		case 'First Quarter':
		case 'FirstQuarter':
			return 'First Quarter';

		case '2nd Quarter':
		case 'Second Quarter':
		case 'SecondQuarter':
			return 'Second Quarter';

		case '3rd Quarter':
		case 'Third Quarter':
		case 'ThirdQuarter':
			return 'Third Quarter';

		case '4th Quarter':
		case 'Fourth Quarter':
		case 'FourthQuarter':
			return 'Fourth Quarter';

		case '1st Period':
		case 'First Period':
		case 'FirstPeriod':
			return 'First Period';

		case '2nd Period':
		case 'Second Period':
		case 'SecondPeriod':
			return 'Second Period';

		case '3rd Period':
		case 'Third Period':
		case 'ThirdPeriod':
			return 'Third Period';

		case '4th Period':
		case 'Fourth Period':
		case 'FourthPeriod':
			return 'Fourth Period';

		case '1st 5 Innings':
		case 'First Five Innings':
		case 'FirstFiveInnings':
			return 'First Five Innings';

		default:
			// eslint-disable-next-line
			console.log('warning ... unknow event period type ' + period);
			return 'unknow';
	}
};

exports.default = renameEventPeriod;
//# sourceMappingURL=renameEventPeriod.js.map