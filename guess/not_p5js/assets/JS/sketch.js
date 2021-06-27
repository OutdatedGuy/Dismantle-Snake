const width = 980,
	height = 540;

const soundCatagory = [
	new Audio("./assets/Sounds/eat.mp3"),
	new Audio("./assets/Sounds/break.mp3"),
	new Audio("./assets/Sounds/gameover.mp3"),
];
soundCatagory[1].volume = 0.2;

const score = document.getElementById("score");
let snake, food;

function setup() {
	const canvas = document.getElementById("canvas");
	canvas.style.width = width + "px";
	canvas.style.height = height + "px";

	document.onkeydown = keyPressed;

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

	food = new Food(snake, document.getElementById("food"));
}
setup();

let draw = setInterval(game, 1000 / 15);
function game() {
	score.innerText = `Score: ${snake.body.length}`;

	if (!snake.move()) gameOver();
	if (snake.eat(food)) food.newLocation(snake);
}

function keyPressed(e) {
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
}

function gameOver() {
	setTimeout(() => {
		alert(`Game Over!\nYour final Score is ${snake.body.length}`);
		setup();
	}, 50);
}
