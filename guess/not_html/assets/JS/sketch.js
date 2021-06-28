{
	let snake;
	let food;
	let imageCatagory = [];

	if (localStorage.getItem("highscore") === null)
		localStorage.setItem("highscore", "NA");

	function preload() {
		let path = "./assets/Images/Eat/";
		imageCatagory[0] = loadImage(path + "Frog.png");
		imageCatagory[1] = loadImage(path + "disassemble.png");
		imageCatagory[2] = loadImage(path + "assemble.png");
	}

	function setup() {
		const canvas = createCanvas(980, 540);
		canvas.parent("canvas");

		frameRate(15);

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
			(width - size) / 2,
			(height - size) / 2,
			size
		);

		food = new Food(imageCatagory, snake);

		instruction();
	}

	function draw() {
		if (isLooping()) {
			background(60);

			document.getElementById(
				"score"
			).innerText = `Score: ${snake.body.length}`;

			document.getElementById(
				"highscore"
			).innerText = `Your Highscore: ${localStorage.getItem(
				"highscore"
			)}`;

			food.display();

			if (!snake.move()) gameOver();
			if (snake.eat(food)) food.newLocation(snake);
		}
	}

	function keyPressed() {
		if (isLooping()) {
			let xS, yS;

			if (keyCode === UP_ARROW && snake.speedY == 0) (xS = 0), (yS = -1);
			else if (keyCode === RIGHT_ARROW && snake.speedX == 0)
				(xS = 1), (yS = 0);
			else if (keyCode === DOWN_ARROW && snake.speedY == 0)
				(xS = 0), (yS = 1);
			else if (keyCode === LEFT_ARROW && snake.speedX == 0)
				(xS = -1), (yS = 0);
			else return;

			if (snake.moved) snake.update(xS, yS);
			else {
				setTimeout(() => {
					snake.update(xS, yS);
				}, 69);
			}
		} else if (keyCode === ENTER) startIt();
	}

	function gameOver() {
		setTimeout(() => {
			alert(`Game Over!\nYour final Score is ${snake.body.length}`);
			setup();
		}, 50);
	}

	function instruction() {
		noLoop();
		background(60);

		const inst = document.getElementById("instructions");
		inst.style.display = "grid";
		inst.style.gridTemplateColumns = `repeat(3, ${width / 3 - 20}px)`;
		inst.style.gridTemplateRows = `repeat(2, ${height / 2}px)`;

		document.getElementById("score").innerText = "Instructions";
		document.getElementById("highscore").innerText = "";
	}

	function startIt() {
		document.getElementById("instructions").style.display = "none";
		loop();
	}
}
