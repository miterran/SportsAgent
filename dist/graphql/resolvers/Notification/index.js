'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Subscription = undefined;

var _pubsub = require('../../pubsub');

var Subscription = exports.Subscription = {
	notificationAdded: {
		subscribe: function subscribe() {
			return _pubsub.pubsub.asyncIterator('NEW');
		}
	}
}; //import { withFilter } from 'graphql-subscriptions';
//# sourceMappingURL=index.js.map