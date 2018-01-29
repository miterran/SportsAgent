"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var type = "\n\ttype EventType {\n\t\t_id: ID\n\t\tID: String\n\t\ttitle: String\n\t\tprovider: String\n\t\tbookmaker: String\n\t\tsport: String\n\t\tperiod: String\n\t\tleague: String\n\t\tregion: String\n\t\tmatchTime: Date\n\t\tteam: TeamType\n\t\tscore: ScoreType\n\t\tactionOdd: OddType\n\t\tcutOffAt: Date\n\t\tisFinished: Boolean\n\t\tisPicked: Boolean\n\t\tstatus: String\n\t\tupdatedAt: Date\n\t\tteamLogo: LogoType\n\t\tisOddExpired: Boolean\n\t\tisActionOddActivate: Boolean\n\t}\n\n\ttype TeamType {\n\t\thome: String\n\t\thomeROT: String\n\t\thomePitcher: String\n\t\taway: String\n\t\tawayROT: String\n\t\tawayPitcher: String\n\t}\n\n\ttype ScoreType {\n\t\thome: Int\n\t\taway: Int\n\t}\n\n\ttype OddType {\n\t\tawayMoneyLine: Int\n\t\thomeMoneyLine: Int\n\t\tawaySpreadPoint: Float\n\t\tawaySpreadLine: Int\n\t\thomeSpreadPoint: Float\n\t\thomeSpreadLine: Int\n\t\ttotalOverPoint: Float\n\t\ttotalOverLine: Int\n\t\ttotalUnderPoint: Float\n\t\ttotalUnderLine: Int\n\t\tdrawLine: Int\n\t}\n\n\ttype LogoType {\n\t\taway: String\n\t\thome: String\n\t\tdefault: String\n\t}\n";
exports.default = type;
//# sourceMappingURL=Event.js.map