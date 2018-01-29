'use strict';

test('two plus two is four', function () {
	expect(2 + 2).toBe(4);
});

// import config from '../config';
// import Event from './Event';
// import moment from 'moment';
// import mongoose from 'mongoose';
// import bluebird from 'bluebird';
// mongoose.Promise = bluebird;

// beforeAll(done => mongoose.connect(config.mongoURL, { useMongoClient: true }).then(() => done()));

// afterAll(done => mongoose.disconnect().then(() => done()));

// describe('test Event Model', () => {

// 	beforeEach( async done => {
// 		// const newEvent = new Event({
// 		// 	ID: '1219170135AM_715_716_BASKETBALL_FULLGAME',
// 		// 	sport: 'Basketball',
// 		// 	period: 'Full Game',
// 		// 	league: 'NBA',
// 		// 	region: null,
// 		// 	matchTime: moment('2017-12-19T17:35:00.000+16:00'),
// 		// 	team: {
// 		// 		home: 'Dallas Mavericks',
// 		// 		homeROT: '716',
// 		// 		homePitcher: null,
// 		// 		away: 'Phoenix Suns',
// 		// 		awayROT: '715',
// 		// 		awayPitcher: null
// 		// 	},
// 		// 	odd: {
// 		// 		source: {
// 		// 			provider: 'jsonOdd',
// 		// 			bookmaker: '3',
// 		// 			ID: '1498737',
// 		// 		},
// 		// 		default: {
// 		// 			awayMoneyLine: 250,
// 		// 			homeMoneyLine: -275,
// 		// 			awaySpreadPoint: 7,
// 		// 			awaySpreadLine: -105,
// 		// 			homeSpreadPoint: -7,
// 		// 			homeSpreadLine: -105,
// 		// 			totalOverPoint: 209.5,
// 		// 			totalOverLine: -107,
// 		// 			totalUnderPoint: 209.5,
// 		// 			totalUnderLine: -103,
// 		// 			drawLine: null,
// 		// 		},
// 		// 		updatedAt: moment(),
// 		// 		cutOffAt: moment('2017-12-19T17:35:00.000+16:00')
// 		// 	},
// 		// 	score: {
// 		// 		source: {
// 		// 			provider: 'jsonOdd',
// 		// 			ID: '1498737',
// 		// 		},
// 		// 		home: null,
// 		// 		away: null,
// 		// 		updatedAt: moment()
// 		// 	},
// 		// 	status: 'Pending',
// 		// 	updatedAt: moment(),
// 		// 	createdAt: moment(),
// 		// 	expireAt: moment('2017-12-19T17:35:00.000+16:00').add(3, 'd'),
// 		// })
// 		// await newEvent.save()
// 		// done()
// 	});


// 	// test('find and test event', async () => {
// 	// 	const result = await Event.findOne({ ID: '1219170135AM_715_716_BASKETBALL_FULLGAME' })
// 	// 	result.odd.build = { action: 'basicTeaser', sport: result.sport, period: result.period }
// 	// 	expect(result.ID).toBe('1219170135AM_715_716_BASKETBALL_FULLGAME')
// 	// 	expect(result.odd.afterBuild).toMatchSnapshot()
// 	// 	expect(result).toMatchSnapshot()
// 	// 	result.odd.build = { action: 'straight', sport: result.sport, period: result.period }
// 	// 	expect(result.odd.afterBuild).toMatchSnapshot()
// 	// 	expect(result).toMatchSnapshot()
// 	// });

// 	afterEach(async done => {
// 		await Event.findOneAndRemove({ ID: '1219170135AM_715_716_BASKETBALL_FULLGAME' });
// 		done();
// 	});

// });
//# sourceMappingURL=index.test.js.map