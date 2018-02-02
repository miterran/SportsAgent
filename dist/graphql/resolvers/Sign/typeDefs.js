"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Mutation = exports.Mutation = "\n\tagentRegister (\n\t\tusername: String!\n\t\tpassword: String!\n\t\tpasscode: String!\n\t\temail: String!\n\t\tdeviceToken: String\n\t): NoteType\n\n\tlogin (\n\t\tusername: String!\n\t\tpassword: String!\n\t\tdeviceToken: String\n\t): NoteType\n\n\tplayerRegister (\n\t\tplayerUsername: String!\n\t\tplayerNickname: String!\n\t\tplayerPassword: String!\n\t\tplayerPasscode: String!\n\t\tinitial: String!\n\t\tmaxWin: String!\n\t\tminRisk: String!\n\t\tparlay: Boolean!\n\t\tbasicTeaser: Boolean!\n\t\tspecialTeaser: Boolean!\n\t\tbigTeaser: Boolean!\n\t\tsuperTeaser: Boolean!\n\t\twinReverse: Boolean!\n\t\tactionReverse: Boolean!\n\t\tparlayTeam: Int!\n\t\tbasicTeaserTeam: Int!\n\t\tspecialTeaserTeam: Int!\n\t\tbigTeaserTeam: Int!\n\t\twinReverseTeam: Int!\n\t\tactionReverseTeam: Int!\n\t\tpasscode: String!\n\t): NoteType\n\n\tforgotPassword (\n\t\temail: String!\n\t\tpasscode: String!\n\t): NoteType\n\n";

var Query = exports.Query = "\n\tcheckUsername (\n\t\tusername: String\n\t): NoteType\n\n";
//# sourceMappingURL=typeDefs.js.map