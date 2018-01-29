'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _graphqlTools = require('graphql-tools');

var _rootResolvers = require('./rootResolvers');

var _rootResolvers2 = _interopRequireDefault(_rootResolvers);

var _rootTypeDefs = require('./rootTypeDefs');

var _rootTypeDefs2 = _interopRequireDefault(_rootTypeDefs);

var _scalar = require('./scalar');

var _scalar2 = _interopRequireDefault(_scalar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = (0, _graphqlTools.makeExecutableSchema)({
	typeDefs: _rootTypeDefs2.default,
	resolvers: _lodash2.default.merge(_rootResolvers2.default, _scalar2.default)
});

exports.default = schema;
//# sourceMappingURL=schema.js.map