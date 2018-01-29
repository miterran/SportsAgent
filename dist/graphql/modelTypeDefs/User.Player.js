"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var type = "\n\ttype UserPlayerType {\n\t\t_id: ID\n\t\tnickname: String\n\t\tisActivate: Boolean\n\t\tisDeleted: Boolean\n\t\tAgent: ID\n\t\twagerLimit: PlayerWagerLimitType\n\t\trole: String\n\t\tusername: String\n\t\tportrait: String\n\t\tlastOnlineAt: Date\n\t\tupdatedAt: Date\n\t\tcreatedAt: Date\n\t\tweekNum: Int\n\t\tcredit: UserCreditType\n\t}\n\n\ttype PlayerWagerLimitType {\n\t\tstraight: Boolean\n\t\tparlay: Boolean\n\t\tbasicTeaser: Boolean\n\t\tspecialTeaser: Boolean\n\t\tbigTeaser: Boolean\n\t\tsuperTeaser: Boolean\n\t\tactionReverse: Boolean\n\t\twinReverse: Boolean\n\t\tmaxWin: Int\n\t\tminRisk: Int\n\t\tstraightTeam: Int\n\t\tparlayTeam: Int\n\t\tbasicTeaserTeam: Int\n\t\tspecialTeaserTeam: Int\n\t\tbigTeaserTeam: Int\n\t\tsuperTeaserTeam: Int\n\t\tactionReverseTeam: Int\n\t\twinReverseTeam: Int\n\t\tupdatedAt: Date\n\t}\n\n";
exports.default = type;
//# sourceMappingURL=User.Player.js.map