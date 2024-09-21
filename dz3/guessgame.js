const game = (function() {
	const DEFAULT_LIVES = 3;
	const DEFAULT_POINTS = 0;

	let lives = null;
	let points = null;

	let a = null;
	let b = null;

	let correctNumber = null;

	const getCorrectNumber = () => correctNumber;
	const setCorrectNumber = (val) => { correctNumber = val; }

	const getLives = () => lives;
	const setLives = (val) => { lives = val; }

	const getPoints = () => points;
	const setPoints = (val) => { points = val; }

	const reset = () => { lives = DEFAULT_LIVES; points = DEFAULT_POINTS; a = null; b = null; }

	const getA = () => a;
	const setA = (val) => { a = val; }

	const getB = () => b;
	const setB = (val) => { b = val; }

	const isGuessCorrect = (val) => val === correctNumber;

	return { getLives, setLives, getPoints, setPoints, reset, getA, setA, getB, setB, getCorrectNumber, setCorrectNumber, isGuessCorrect}
})();

const ui = (function() {
	const livesDisplay = document.getElementById("guessgame__lives");
	const pointsDisplay = document.getElementById("guessgame__points");
	const choosingPart = document.getElementById("guessgame__choosing");
	const playingPart = document.getElementById("guessgame__playing");
	const messageElement = document.getElementById("guessgame__msg");

	const updateLives = (val) => { livesDisplay.textContent = val; }
	const updatePoints = (val) => { pointsDisplay.textContent = val; }

	const showChoosingPart = () => { choosingPart.style.display = "block" };
	const hideChoosingPart = () => { choosingPart.style.display = "none" };

	const showPlayingPart = () => { 
		playingPart.style.display = "block";
		document.getElementById("guessgame__playing__a").textContent = game.getA();	
		document.getElementById("guessgame__playing__b").textContent = game.getB();	

	};
	const hidePlayingPart = () => { playingPart.style.display = "none" };

	let timeout = null;
	const displayMessage = (message) => {
		clearTimeout(timeout);
		messageElement.textContent = message
		timeout = setTimeout(() => {
			messageElement.textContent = "";
		}, 1500);
	};

	return { updateLives, updatePoints, showChoosingPart, hideChoosingPart, showPlayingPart, hidePlayingPart, displayMessage }
})();


game.reset();
console.log(game.getLives());
ui.hidePlayingPart();
ui.updateLives(game.getLives());
ui.updatePoints(game.getPoints());

const inputAElement = document.getElementById("guessgame__a");
const inputBElement = document.getElementById("guessgame__b");

document.getElementById("guessgame__start").addEventListener("click", () => {
	console.log(inputAElement.value);
	console.log(inputBElement.value);
	if (!inputAElement.value || !inputBElement.value){
		ui.displayMessage("one of values is missing!");
		return;
	}
	if (isNaN(inputAElement.value)) {
		ui.displayMessage("a is not a number!");
		return;
	}
	if (isNaN(inputBElement.value)) {
		ui.displayMessage("b is not a number!");
		return;
	}


	const a = Number(inputAElement.value);
	const b = Number(inputBElement.value);

	if (a === b) {
		ui.displayMessage("a cannot be the same number as b");
		return;
	}

	if (a > b) {
		game.setA(b);
		game.setB(a);
} else {
		game.setA(a);
		game.setB(b);
	}

	const randomValue = Math.floor(Math.random() * (game.getB()+1-game.getA()) + game.getA());
	game.setCorrectNumber(randomValue);
	console.log("correct number is" + randomValue);

	ui.displayMessage("");

	ui.hideChoosingPart();
	ui.showPlayingPart();
});

const guessButton = document.getElementById("guessgame__guessbtn");

guessButton.addEventListener("click", () => {
	guessButton.disabled = true;
	setTimeout(() => { guessButton.disabled = false; }, 1500);

	const userInpt = document.getElementById("guessgame__guess").value;

	if (userInpt === "" || isNaN(userInpt)) {
		ui.displayMessage("should be a number");
		return;
	}

	console.log(userInpt);
	const correct = game.isGuessCorrect(Number(userInpt));

	if (!correct) {
		if (game.getLives() === 1) {
			game.reset();

			ui.displayMessage("you lost!");
			ui.hidePlayingPart();
			ui.showChoosingPart();

			ui.updateLives(game.getLives());
			ui.updatePoints(game.getPoints());
		} else {
			ui.displayMessage("incorrect!");
			game.setLives(game.getLives() - 1);
			ui.updateLives(game.getLives());
		}

} else {
		ui.displayMessage("correct");

		game.setPoints(game.getPoints() + 1);
		ui.updatePoints(game.getPoints());

		ui.hidePlayingPart();
		ui.showChoosingPart();
	}
});

const restartButton = document.getElementById("guessgame__restart");

restartButton.addEventListener("click", () => {
	game.reset();

	ui.displayMessage("progress reset!");
	ui.updateLives(game.getLives());
	ui.updatePoints(game.getPoints());
	ui.hidePlayingPart();
	ui.showChoosingPart();
});
