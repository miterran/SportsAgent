"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Query = exports.Query = "\n\ttransactions (\n\t\tstartOfWeekNum: Int\n\t\tendOfWeekNum: Int\n\t): [TransactionType]\n";

var Mutation = exports.Mutation = "\n\tadjustAgentCredit (\n\t\tAgent: String!\n\t\tamount: Int!\n\t\tMK: String!\n\t): NoteType\n\n\tpurchaseCredit (\n\t\titem: String!\n\t\treceipt: String!\n\t\tplatform: String!\n\t): NoteType\n";
//# sourceMappingURL=typeDefs.js.map