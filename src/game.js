const createCircles = () => {
	for (let i = 0; i < circlesData.numCircles; i++) {
	  const plusOrMinus = Math.random() < 0.5 ? -1 : 1;

	  const radius = Math.floor(
		circlesData.baseSize + Math.random() * circlesData.difficultySize
	  );
	  const x = Math.floor(
		Math.random() * (DOM.canvas.width - radius * 2) + radius
	  );
	  const y = Math.floor(
		Math.random() * (DOM.canvas.height - radius * 2) + radius
	  );

	  const dx = Math.floor(
		plusOrMinus *
		  (circlesData.BaseSpeed + Math.random() * circlesData.difficultySpeed)
	  );

	  const dy = Math.floor(
		plusOrMinus *
		  (circlesData.BaseSpeed + Math.random() * circlesData.difficultySpeed)
	  );

	  const text = i + 1;

	  circlesData.circleArray.push(new Circle(x, y, dx, dy, radius, text));
	}
};

const stopAnimation = (id) => cancelAnimationFrame(id);

const displayLevel = () =>
	(DOM.level.textContent = `Current level: ${gameData.currentLevel}`);

const displayNumCircles = () =>
	(DOM.label.textContent = `Number of circles: ${circlesData.numCircles}`);

const displayScore = () =>
	(DOM.score.textContent = `Current Score: ${gameData.score}`);

const displayWinScore = () =>
	(DOM.winScore.textContent = `Winning Score: ${circlesData.numCircles}`);

const displayClicks = () =>
	(DOM.clicks.textContent = `Missclicks left: ${gameData.clicksLimit}`);

const updateCircles = () =>
	circlesData.circleArray.forEach((circle) => circle.update());

const increaseLevel = () => {
	gameData.currentLevel += 1;
};

const decreaseClicks = () => {
	gameData.clicksLimit -= 1;
};

const increaseScore = () => {
	gameData.score += 1;
};

const clearCircles = () => {
	circlesData.circleArray = [];
};

const clearCanvas = () => {
	DOM.ctx.clearRect(0, 0, DOM.canvas.width, DOM.canvas.height);
};

const changeCircleColour = (circle) =>
	(circle.colour = circlesData.targetColour);

const restartCircleColour = () =>
	circlesData.circleArray.forEach(
	  (circle) => (circle.colour = circlesData.startingColour)
);

const resetScore = () => {
	gameData.score = 0;
};

const setupDifficulty = (dif) => {
	const difficulty = gameData.difficulty[dif];

	if (!gameData.gamePlaying) {
	  DOM.gameClicks.value = difficulty.clicksLimit;
	  DOM.circleSize.value = difficulty.circleSize;
	  DOM.circleSpeed.value = difficulty.circleSpeed;
	  DOM.circlesNum.value = difficulty.circlesNum;

	  setupCustomSettings();
	  displayGameInfo();
	}
};

const resetSettings = () => {
	if (!gameData.gamePlaying) {
	  DOM.startingColour.value = DOM.originalCssPrimary;
	  DOM.targetColour.value = DOM.originalCssSecondary;

	  changeCssColor("--primary-colour");
	  changeCssColor("--secondary-colour");
	  setupDifficulty("easy");
	}
};

const setupCustomSettings = () => {
	gameData.score = 0;
	gameData.currentLevel = 1;
	gameData.clicksLimit = Number(DOM.gameClicks.value);
	circlesData.difficultySize = Number(DOM.circleSize.value);
	circlesData.difficultySpeed = Number(DOM.circleSpeed.value);
	circlesData.numCircles = Number(DOM.circlesNum.value);
	circlesData.startingColour = DOM.startingColour.value;
	circlesData.targetColour = DOM.targetColour.value;
};

const displayGameInfo = () => {
	displayLevel();
	displayScore();
	displayWinScore();
	displayClicks();
	displayNumCircles();
};

const changeGameStatus = () => {
	if (gameData.gamePlaying) {
	  gameData.gamePlaying = false;
	} else {
	  gameData.gamePlaying = true;
	}

	changeBtnStatus();
	changeSettingsStatus();
};

const nextLevel = () => {
	stopAnimation(gameData.animationID);
	resetScore();
	increaseLevel();
	updateDifficulty();
	clearCircles();
	createCircles();
	animateCircles();
	displayGameInfo();
};

const updateDifficulty = () => {
	if (gameData.currentLevel % 3 === 0) {
	  circlesData.difficultySpeed += 1;
	}

	if (gameData.currentLevel % 5 === 0) {
	  circlesData.numCircles += 2;
	}

	if (circlesData.difficultySize <= 35) {
	  circlesData.difficultySize = 70;
	}

	circlesData.difficultySize -= 5;
};

const clickedCircle = (e) => {
	const mouseX = e.offsetX;
	const mouseY = e.offsetY;
	return circlesData.circleArray.some((circle) => {
	  if (
		DOM.ctx.isPointInPath(circle.id, mouseX, mouseY) &&
		circle.colour === circlesData.startingColour
	  ) {
		changeCircleColour(circle);
		increaseScore();
		displayScore();
		return true;
	  } else if (
		DOM.ctx.isPointInPath(circle.id, mouseX, mouseY) &&
		circle.colour === circlesData.targetColour
	  ) {
		return true;
	  } else {
		return false;
	  }
	});
};

const endGame = () => {
	if (gameData.gamePlaying) {
	  stopAnimation(gameData.animationID);
	  clearCircles();
	  clearCanvas();
	  displayMessage(
		`Congratulations you were able to reach level ${gameData.currentLevel}.`
	  );
	  changeGameStatus();
	}
};

const startGame = () => {
	if (!gameData.gamePlaying) {
	  setupCustomSettings();
	  displayGameInfo();
	  changeGameStatus();
	  clearCircles();
	  createCircles();
	  animateCircles();
	}
};

const handleClick = (e) => {
	if (gameData.gamePlaying) {
	  if (!clickedCircle(e)) {
		restartCircleColour();
		resetScore();
		decreaseClicks();
		displayClicks();
	  }
	} else {
	  displayMessage("You must click the start game button first.");
	}
};

const changeSettingsStatus = () => {
	if (gameData.gamePlaying) {
	  DOM.settings.forEach((setting) => {
		setting.disabled = true;
	  });
	} else {
	  DOM.settings.forEach((setting) => {
		setting.disabled = false;
	  });
	}
};

const changeBtnStatus = () => {
	DOM.buttons.forEach((button) => {
	  button.classList.toggle("btn-active");
	});
};

const changeCssColor = (property) => {
	switch (property) {
		case "--secondary-colour":
			if (DOM.allowFontChange.checked) {
				DOM.root.style.setProperty("--secondary-colour", DOM.targetColour.value);
				updateCssColor("--secondary-colour");
			} else {
				DOM.root.style.setProperty("--secondary-colour", DOM.originalCssSecondary);
				updateCssColor("--secondary-colour");
				circlesData.startingColour = DOM.targetColour.value;
			}
			break;
		default:
			if (DOM.allowFontChange.checked) {
				DOM.root.style.setProperty("--primary-colour", DOM.startingColour.value);
				updateCssColor("--primary-colour");
			} else {
				DOM.root.style.setProperty("--primary-colour", DOM.originalCssPrimary);
				updateCssColor("--primary-colour");
				circlesData.startingColour = DOM.startingColour.value;
			}

	}
}
const updateCssColor = (property) => {
	switch (property) {
		case "--secondary-colour":
			DOM.cssSecondaryColour = getComputedStyle(document.documentElement)
				.getPropertyValue(property)
				.trim();
			break
		default:
			DOM.cssPrimaryColour = getComputedStyle(document.documentElement)
				.getPropertyValue(property)
				.trim();
	}
};

const updateCircleQty = () => {
	circlesData.numCircles = Number(DOM.circlesNum.value);
	displayNumCircles();
	displayWinScore();
};

const displayMessage = (text) => {
	clearCanvas();
	DOM.ctx.font = "40px Arial";
	DOM.ctx.strokeStyle = circlesData.targetColour;
	DOM.ctx.textAlign = "center";
	DOM.ctx.strokeText(text, DOM.canvas.width / 2, DOM.canvas.height / 2);
};