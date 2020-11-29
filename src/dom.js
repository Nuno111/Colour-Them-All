const DOM = {
	canvas: document.querySelector("canvas"),
	gameBoard: document.querySelector(".game-board"),
	settings: document.querySelectorAll(".setting"),
	ctx: document.querySelector("canvas").getContext("2d"),
	circlesNum: document.querySelector(".circles"),
	gameClicks: document.querySelector(".clicks-limit"),
	circleSize: document.querySelector(".circle-size"),
	circleSpeed: document.querySelector(".circle-speed"),
	easy: document.querySelector(".easy"),
	medium: document.querySelector(".medium"),
	insane: document.querySelector(".insane"),
	cssPrimaryColour: getComputedStyle(document.documentElement)
	  .getPropertyValue("--primary-colour")
	  .trim(),
	cssSecondaryColour: getComputedStyle(document.documentElement)
	  .getPropertyValue("--secondary-colour")
	  .trim(),
	level: document.querySelector(".level"),
	label: document.querySelector(".label-circles"),
	score: document.querySelector(".score"),
	winScore: document.querySelector(".win-score"),
	clicks: document.querySelector(".clicks"),
	startingColour: document.querySelector(".starting-colour"),
	targetColour: document.querySelector(".target-colour"),
	endCurrent: document.querySelector(".end-current"),
	root: document.documentElement,
	originalCssPrimary: getComputedStyle(document.documentElement)
	  .getPropertyValue("--primary-colour")
	  .trim(),
	originalCssSecondary: getComputedStyle(document.documentElement)
	  .getPropertyValue("--secondary-colour")
	  .trim(),
	allowFontChange: document.querySelector(".allow-font-change"),
	resetBtn: document.querySelector(".reset-settings"),
	startBtn: document.querySelector(".start"),
	buttons: document.querySelectorAll(".btn"),
};

const setUpDOM = () => {
	DOM.canvas.width = DOM.gameBoard.clientWidth;
	DOM.canvas.height = DOM.canvas.clientHeight;
	DOM.canvas.addEventListener("click", handleClick);
	DOM.startingColour.addEventListener("change", changeCssColor);
	DOM.targetColour.addEventListener("change", changeCssColor);
	DOM.circlesNum.addEventListener("change", updateCircleQty);
	DOM.allowFontChange.addEventListener("click", () => {
		changeCssColor("--primary-colour");
		changeCssColor("--secondary-colour");
	});
	DOM.gameClicks.addEventListener("change", (e) =>
		validateSettings.clicksLimitInput(e)
	);
	DOM.circleSize.addEventListener("change", (e) => {
		validateSettings.circleSizeInput(e);
	});	
	DOM.circleSpeed.addEventListener("change", (e) => {
		validateSettings.circleSpeedInput(e);
	});
	DOM.endCurrent.addEventListener("click", () => {
		if (DOM.endCurrent.classList.contains("btn-active")) {
		endGame();
		}
	});
	DOM.resetBtn.addEventListener("click", () => {
		if (DOM.resetBtn.classList.contains("btn-active")) {
		resetSettings();
		}
	});
	DOM.startBtn.addEventListener("click", () => {
		if (DOM.startBtn.classList.contains("btn-active")) {
		startGame();
		}
	});
	DOM.easy.addEventListener("click", () => {
		if (DOM.easy.classList.contains("btn-active")) {
		setupDifficulty("easy");
		}
	});
	DOM.medium.addEventListener("click", () => {
		if (DOM.medium.classList.contains("btn-active")) {
		setupDifficulty("medium");
		}
	});
	DOM.insane.addEventListener("click", () => {
		if (DOM.insane.classList.contains("btn-active")) {
		setupDifficulty("insane");
		}
	});
}