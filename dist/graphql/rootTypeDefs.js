'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _modelTypeDefs = require('./modelTypeDefs');

var _modelTypeDefs2 = _interopRequireDefault(_modelTypeDefs);

var _typeDefs = require('./resolvers/Sign/typeDefs');

var Sign = _interopRequireWildcard(_typeDefs);

var _typeDefs2 = require('./resolvers/User/typeDefs');

var User = _interopRequireWildcard(_typeDefs2);

var _typeDefs3 = require('./resolvers/Action/typeDefs');

var Action = _interopRequireWildcard(_typeDefs3);

var _typeDefs4 = require('./resolvers/BetOrder/typeDefs');

var BetOrder = _interopRequireWildcard(_typeDefs4);

var _typeDefs5 = require('./resolvers/Setting/typeDefs');

var Setting = _interopRequireWildcard(_typeDefs5);

var _typeDefs6 = require('./resolvers/Event/typeDefs');

var Event = _interopRequireWildcard(_typeDefs6);

var _typeDefs7 = require('./resolvers/Transaction/typeDefs');

var Transaction = _interopRequireWildcard(_typeDefs7);

var _typeDefs8 = require('./resolvers/LogoCollect/typeDefs');

var LogoCollect = _interopRequireWildcard(_typeDefs8);

var _typeDefs9 = require('./resolvers/PriceRate/typeDefs');

var PriceRate = _interopRequireWildcard(_typeDefs9);

var _typeDefs10 = require('./resolvers/SystemLog/typeDefs');

var SystemLog = _interopRequireWildcard(_typeDefs10);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var type = '\n\ttype BooleanType {\n\t\tboolean: Boolean\n\t}\n';
//import * as Notification from './resolvers/Notification/typeDefs';


var schemaType = '\n\tscalar Date\n\tschema {\n\t\tquery: RootQuery\n\t\tmutation: RootMutation\n\t}\n';
//		subscription: RootSubscription
var rootQuery = '\n\ttype RootQuery {\n\t\t' + Sign.Query + '\n\t\t' + User.Query + '\n\t\t' + Action.Query + '\n\t\t' + BetOrder.Query + '\n\t\t' + Event.Query + '\n\t\t' + Transaction.Query + '\n\t\t' + LogoCollect.Query + '\n\t\t' + PriceRate.Query + '\n\t\t' + SystemLog.Query + '\n\t}\n';
var rootMutation = '\n\ttype RootMutation {\n\t\t' + Sign.Mutation + '\n\t\t' + Action.Mutation + '\n\t\t' + Setting.Mutation + '\n\t\t' + User.Mutation + '\n\t\t' + Transaction.Mutation + '\n\t}\n';
// const rootSubscription = `
// 	type RootSubscription {
// 	}
// `;

// 		${
// //			Notification.Subscription
// 		}

var rootTypes = [schemaType, rootQuery, rootMutation].concat(_modelTypeDefs2.default).concat(BetOrder.type)
//	.concat(Notification.type)
.concat(Action.Input).concat(PriceRate.Input).concat(type);

exports.default = rootTypes;
//# sourceMappingURL=rootTypeDefs.js.map