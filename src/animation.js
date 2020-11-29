const animateCircles = () => {
	gameData.animationID = requestAnimationFrame(animateCircles);
	clearCanvas();
	updateCircles();
	if (gameData.score === circlesData.circleArray.length) {
	  nextLevel();
	}
	if (gameData.clicksLimit === 0) {
	  endGame();
	}
};