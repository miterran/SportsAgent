'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var determinePickResult = function determinePickResult(_ref) {
	var _ref$Event = _ref.Event,
	    sport = _ref$Event.sport,
	    _ref$Event$score = _ref$Event.score,
	    homeScore = _ref$Event$score.home,
	    awayScore = _ref$Event$score.away,
	    _ref$marked = _ref.marked,
	    oddType = _ref$marked.oddType,
	    oddTarget = _ref$marked.oddTarget,
	    oddPoint = _ref$marked.oddPoint;

	switch (true) {
		case sport === 'Soccer' && oddType === 'Spread' && oddTarget === 'Home' && homeScore + oddPoint - awayScore === 0.25:
		case sport === 'Soccer' && oddType === 'Spread' && oddTarget === 'Away' && awayScore + oddPoint - homeScore === 0.25:
		case sport === 'Soccer' && oddType === 'Total' && oddTarget === 'Over' && homeScore + awayScore - oddPoint === 0.25:
		case sport === 'Soccer' && oddType === 'Total' && oddTarget === 'Under' && oddPoint - homeScore + awayScore === 0.25:
			return 'Won Half';
		case sport === 'Soccer' && oddType === 'Spread' && oddTarget === 'Home' && homeScore + oddPoint - awayScore === -0.25:
		case sport === 'Soccer' && oddType === 'Spread' && oddTarget === 'Away' && awayScore + oddPoint - homeScore === -0.25:
		case sport === 'Soccer' && oddType === 'Total' && oddTarget === 'Over' && homeScore + awayScore - oddPoint === -0.25:
		case sport === 'Soccer' && oddType === 'Total' && oddTarget === 'Under' && oddPoint - homeScore + awayScore === -0.25:
			return 'Lost Half';
		case oddType === 'MLine' && oddTarget === 'Home' && homeScore > awayScore:
		case oddType === 'MLine' && oddTarget === 'Away' && awayScore > homeScore:
		case oddType === 'Spread' && oddTarget === 'Home' && homeScore + oddPoint > awayScore:
		case oddType === 'Spread' && oddTarget === 'Away' && awayScore + oddPoint > homeScore:
		case oddType === 'Total' && oddTarget === 'Over' && homeScore + awayScore > oddPoint:
		case oddType === 'Total' && oddTarget === 'Under' && homeScore + awayScore < oddPoint:
		case oddType === 'Draw' && homeScore === awayScore:
			return 'Won';
		case sport === 'Soccer' && oddType === 'MLine' && homeScore === awayScore:
		case sport === 'Hockey' && oddType === 'MLine' && homeScore === awayScore:
		case oddType === 'MLine' && oddTarget === 'Home' && homeScore < awayScore:
		case oddType === 'MLine' && oddTarget === 'Away' && awayScore < homeScore:
		case oddType === 'Spread' && oddTarget === 'Home' && homeScore + oddPoint < awayScore:
		case oddType === 'Spread' && oddTarget === 'Away' && awayScore + oddPoint < homeScore:
		case oddType === 'Total' && oddTarget === 'Over' && homeScore + awayScore < oddPoint:
		case oddType === 'Total' && oddTarget === 'Under' && homeScore + awayScore > oddPoint:
		case oddType === 'Draw' && homeScore !== awayScore:
			return 'Lost';
		case sport !== 'Soccer' && oddType === 'MLine' && homeScore === awayScore:
		case sport !== 'Hockey' && oddType === 'MLine' && homeScore === awayScore:
		case oddType === 'Spread' && oddTarget === 'Home' && homeScore + oddPoint === awayScore:
		case oddType === 'Spread' && oddTarget === 'Away' && awayScore + oddPoint === homeScore:
		case oddType === 'Total' && homeScore + awayScore === oddPoint:
			return 'Push';
		default:
			return 'Review';
	}
};
exports.default = determinePickResult;
//# sourceMappingURL=determinePickResult.js.map