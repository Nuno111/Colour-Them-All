const gameData = {
	gamePlaying: false,
	score: undefined,
	currentLevel: undefined,
	animationID: undefined,
	clicksLimit: undefined,
	difficulty: {
	  easy: {
		circleSize: 90,
		circleSpeed: 1,
		clicksLimit: 15,
		circlesNum: 5,
	  },
	  medium: {
		circleSize: 70,
		circleSpeed: 2,
		clicksLimit: 10,
		circlesNum: 7,
	  },
	  insane: {
		circleSize: 60,
		circleSpeed: 8,
		clicksLimit: 10,
		circlesNum: 10,
	  },
	},
	inputLimits: {
	  circleSize: {
		min: 0,
		max: 140,
	  },

	  circleSpeed: {
		min: 0,
		max: 50,
	  },

	  clicksLimit: {
		min: 0,
		max: 100,
	  },
	},
};