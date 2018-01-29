'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { Kind } from 'graphql/language';
var resolverScalar = {
	Date: new _graphql.GraphQLScalarType({
		name: 'Date',
		description: 'Date custom scalar type',
		parseValue: function parseValue(value) {
			return (0, _moment2.default)(value); // value from the client
		},
		serialize: function serialize(value) {
			return (0, _moment2.default)(value); // value sent to the client
		},
		parseLiteral: function parseLiteral(ast) {
			return (0, _moment2.default)(ast).format();
		}
	})
};
exports.default = resolverScalar;
//# sourceMappingURL=scalar.js.map