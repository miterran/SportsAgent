"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Query = exports.Query = "\n\tplayerWagerLimit: PlayerWagerLimitType\n\ttable (\n\t\taction: String\n\t): TableType\n\n\tactionEvents (\n\t\taction: String\n\t\ttablePicks: [TablePickType]!\n\t): [EventType]\n\n\twagerPicks (\n\t\taction: String!\n\t\teventOddPicks: [EventOddPicksType]!\n\t): [PickType]\n";

var Mutation = exports.Mutation = "\n\tcreateBetOrder (\n\t\taction: String!\n\t\tbetType: String!\n\t\tbetAmount: Int!\n\t\tatRisk: Int!\n\t\ttoWin: Int!\n\t\tpasscode: String!\n\t\tpicks: [InPutPickType!]!\n\t): NoteType\n";

var Input = exports.Input = "\n\tinput TablePickType {\n\t\tsport: String\n\t\tleague: String\n\t\tregion: String\n\t\tperiod: String\n\t}\n\n\tinput EventOddPicksType {\n\t\tID: String\n\t\tEvent: String\n\t\tmarked: InPutMarkedType\n\t}\n\n\tinput InPutPickType {\n\t\tEvent: String\n\t\tID: String\n\t\tmarked: InPutMarkedType\n\t}\n\n\tinput InPutMarkedType {\n\t\toddLine: Int\n\t\toddPoint: Float\n\t\toddTarget: String\n\t\toddType: String\n\t\toddLineTarget: String\n\t\toddPointTarget: String\n\t}\n\n";
//# sourceMappingURL=typeDefs.js.map