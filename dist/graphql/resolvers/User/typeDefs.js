"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Query = exports.Query = "\n\tuser: UserType\n\n\tagent: UserAgentType\n\t\n\tplayer: UserPlayerType\n\n\tagentPlayers: [UserPlayerType]\n\n\tagentPlayer ( Player: String ): UserPlayerType\n\n";

var Mutation = exports.Mutation = "\n\tswitchPlayerActivate ( Player: String!, isActivate: Boolean! ): NoteType\n\n\tplayerMutation ( \n\t\tPlayer: String!\n\t\tnewNickname: String\n\t\tnewPassword: String\n\t\tnewPasscode: String\n\t\tnewInitial: String\n\t\tnewMaxWin: String\n\t\tnewMinRisk: String\n\t\tisSetNewWagerLimit: Boolean\n\t\tnewParlay: Boolean\n\t\tnewParlayTeam: Int\n\t\tnewBasicTeaser: Boolean\n\t\tnewBasicTeaserTeam: Int\n\t\tnewSpecialTeaser: Boolean\n\t\tnewSpecialTeaserTeam: Int\n\t\tnewBigTeaser: Boolean\n\t\tnewBigTeaserTeam: Int\n\t\tnewSuperTeaser: Boolean\n\t\tnewWinReverse: Boolean\n\t\tnewWinReverseTeam: Int\n\t\tnewActionReverse: Boolean\n\t\tnewActionReverseTeam: Int\n\t\tpasscode: String!\n\t): NoteType\n";
//# sourceMappingURL=typeDefs.js.map