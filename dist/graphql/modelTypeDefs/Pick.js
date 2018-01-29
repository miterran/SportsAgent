"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var type = "\n\ttype PickType {\n\t\t_id: ID\n\t\tID: String\n\t\tPlayer: UserPlayerType\n\t\tAgent: UserAgentType\n\t\tBetOrder: BetOrderType\n\t\tEvent: EventType\n\t\tmarked: MarkedType\n\t\tisClosed: Boolean\n\t\tstatus: String\n\t\tnote: NoteType,\n\t\tupdatedAt: Date\n\t\tclosedAt: Date\n\t\tcreatedAt: Date\n\t}\n\n\ttype MarkedType {\n\t\toddLine: Int\n\t\toddPoint: Float\n\t\toddTarget: String\n\t\toddType: String\n\t\toddLineTarget: String\n\t\toddPointTarget: String\n\t}\n";
exports.default = type;
//# sourceMappingURL=Pick.js.map