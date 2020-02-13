define({

	title: 'Ascetiq - Online',

	ttl: 120000,

	motd: '<b>Ascetiq is the first online chat that simulate the real talk</b>.<hr>',

	nick: {
		maxLen: 20,
		minLen: 2,	
	},

	key: {
		maxLen: 1024,
		minLen: 6,	
	},

	room: {
		minLen: 1,
		maxLen: 64
	},

	notifications: {
		maxOnePerMs: 3000
	}
});