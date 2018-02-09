"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Query = exports.Query = "\n\tevent ( \n\t\t_id: String\n\t\tID: String\n\t): EventType\n\n\tevents ( \n\t\tsport: String\n\t\tleague: String\n\t\tisFinished: Boolean\n\t\tisPicked: Boolean\n\t\tstatus: String\n\t): [EventType]\n\n\treviewEvents: [EventType]\n";

var Mutation = exports.Mutation = "\n\tmanuallyUpdateEventResult (\n\t\t_id: String\n\t\tID: String\n\t\tMK: String!\n\t\tawayScore: Int!\n\t\thomeScore: Int!\n\t\tstatus: String!\n\t): EventType\n";
//# sourceMappingURL=typeDefs.js.map