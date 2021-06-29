{
	const width = 980,
		height = 540;

	let snake, food;
	let draw,
		isPlaying = false;

	if (localStorage.getItem("highscore") === null)
		localStorage.setItem("highscore", "NA");

	function setup() {
		const canvas = document.getElementById("canvas");
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";

		document.onkeydown = keyPressed;

		const soundCatagory = [
			new Audio("./assets/Sounds/eat.mp3"),
			new Audio("./assets/Sounds/break.mp3"),
			new Audio("./assets/Sounds/gameover.mp3"),
		];
		soundCatagory[1].volume = 0.2;

		let size = 20;
		snake = new Snake(
			width,
			height,
			soundCatagory,
			document.getElementById("snake"),
			(width - size) / 2,
			(height - size) / 2,
			size
		);

		instruction();
	}
	setup();

	function game() {
		document.getElementById(
			"score"
		).innerText = `Score: ${snake.body.length}`;
		document.getElementById(
			"highscore"
		).innerText = `Your Highscore: ${localStorage.getItem("highscore")}`;

		if (!snake.move()) gameOver();
		if (snake.eat(food)) food.newLocation(snake);
	}

	function keyPressed(e) {
		if (isPlaying) {
			let xS, yS;

			if ((e.keyCode == 38 || e.keyCode == 87) && snake.speedY == 0)
				(xS = 0), (yS = -1);
			else if ((e.keyCode == 39 || e.keyCode == 68) && snake.speedX == 0)
				(xS = 1), (yS = 0);
			else if ((e.keyCode == 40 || e.keyCode == 83) && snake.speedY == 0)
				(xS = 0), (yS = 1);
			else if ((e.keyCode == 37 || e.keyCode == 65) && snake.speedX == 0)
				(xS = -1), (yS = 0);
			else return;

			if (snake.moved) snake.update(xS, yS);
			else {
				setTimeout(() => {
					snake.update(xS, yS);
				}, 69);
			}
		} else if (e.keyCode === 13) startIt();
	}

	function gameOver() {
		setTimeout(() => {
			alert(`Game Over!\nYour final Score is ${snake.body.length}`);

			clearInterval(draw);
			isPlaying = false;

			document.getElementById("food").className = "";
			document.getElementById("snake").innerHTML = "";

			setup();
		}, 40);
	}

	function instruction() {
		const inst = document.getElementById("instructions");
		inst.style.display = "grid";
		inst.style.gridTemplateColumns = `repeat(3, ${width / 3 - 20}px)`;
		inst.style.gridTemplateRows = `repeat(2, ${height / 2}px)`;

		document.getElementById("score").innerText = "Instructions";
		document.getElementById("highscore").innerText = "";
	}

	function startIt() {
		document.getElementById("instructions").style.display = "none";
		draw = setInterval(game, 1000 / 15);
		isPlaying = true;
		food = new Food(snake, document.getElementById("food"));
	}
}
