'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
var envVarsSchema = _joi2.default.object({
	NODE_ENV: _joi2.default.string().allow(['development', 'production', 'test', 'provision']).default('development'),
	PORT: _joi2.default.number().default(8080),
	MONGOOSE_DEBUG: _joi2.default.boolean().when('NODE_ENV', {
		is: _joi2.default.string().equal('development'),
		then: _joi2.default.boolean().default(true),
		otherwise: _joi2.default.boolean().default(false)
	}),
	JWT_SECRET: _joi2.default.string().required().description('JWT Secret required to sign'),
	MONGO_URL: _joi2.default.string().required().description('Mongo DB host url'),
	JSONODD_API_KEY: _joi2.default.string().required().description('JSON ODD API KEY'),
	PICKMON_UID: _joi2.default.string().required().description('PICKMON UID'),
	PICKMON_KEY: _joi2.default.string().required().description('PICKMON KEY'),
	HOSTURL: _joi2.default.string().required().description('HOSTURL'),
	WSURL: _joi2.default.string().required().description('WSURL'),
	GMAIL: _joi2.default.string().required().description('GMAIL'),
	GPASSWORD: _joi2.default.string().required().description('GPASSWORD'),
	MK: _joi2.default.string().required().description('MK'),
	APPLE_KEY_ID: _joi2.default.string().required().description('G29A9K8D5P'),
	APPLE_TEAM_ID: _joi2.default.string().required().description('36Z53Z94LV'),
	APN_TOPIC: _joi2.default.string().required().description('org.reactjs.native.example.SportsAgentApp')
}).unknown().required();

var _Joi$validate = _joi2.default.validate(process.env, envVarsSchema),
    error = _Joi$validate.error,
    envVars = _Joi$validate.value;

if (error) {
	throw new Error('Config validation error: ' + error.message);
}

var config = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	mongooseDebug: envVars.MONGOOSE_DEBUG,
	jwtSecret: envVars.JWT_SECRET,
	mongoURL: envVars.MONGO_URL,
	jsonOddApiKey: envVars.JSONODD_API_KEY,
	pickMon_UID: envVars.PICKMON_UID,
	pickMon_Key: envVars.PICKMON_KEY,
	HOSTURL: envVars.HOSTURL,
	WSURL: envVars.WSURL,
	GMAIL: envVars.GMAIL,
	GPASSWORD: envVars.GPASSWORD,
	MK: envVars.MK,
	APPLE_KEY_ID: envVars.APPLE_KEY_ID,
	APPLE_TEAM_ID: envVars.APPLE_TEAM_ID,
	APN_TOPIC: envVars.APN_TOPIC
};

exports.default = config;
//# sourceMappingURL=config.js.map