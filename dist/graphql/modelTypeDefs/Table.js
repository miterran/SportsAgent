"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var type = "\n\ttype TableType {\n\t\t_id: ID\n\t\tname: String\n\t\tsports: [TableSportType]\n\t}\n\n\ttype TableSportType {\n\t\t_id: ID\n\t\tname: String\n\t\tleagues: [TableLeagueType]\n\t}\n\n\ttype TableLeagueType {\n\t\t_id: ID\n\t\tname: String\n\t\tregion: String\n\t\tperiods: [TablePeriodType]\n\t}\n\n\ttype TablePeriodType {\n\t\t_id: ID\n\t\tname: String\n\t}\n";
exports.default = type;
//# sourceMappingURL=Table.js.map