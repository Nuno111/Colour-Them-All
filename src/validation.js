const validateSettings = {
	circleSizeInput: (e) =>
	  validateMinMax(
		gameData.inputLimits.circleSize.min,
		gameData.inputLimits.circleSize.max,
		e,
		gameData.difficulty.easy.circleSize
	  ),
	circleSpeedInput: (e) =>
	  validateMinMax(
		gameData.inputLimits.circleSpeed.min,
		gameData.inputLimits.circleSpeed.max,
		e,
		gameData.difficulty.easy.circleSpeed
	  ),
	clicksLimitInput: (e) =>
	  validateMinMax(
		gameData.inputLimits.clicksLimit.min,
		gameData.inputLimits.clicksLimit.max,
		e,
		gameData.difficulty.easy.clicksLimit
	  ),
};

const validateMinMax = (min, max, e, defaultValue) => {
	if (e.target.value < min || e.target.value > max) {
	  displayMessage(`Only values between ${min} and ${max} are allowed`);
	  e.target.value = defaultValue;
	}
};