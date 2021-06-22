let snake;
let food;
let imageCatagory = [];
const soundCatagory = [
	new Audio("./assets/Sounds/eat.mp3"),
	new Audio("./assets/Sounds/break.mp3"),
	new Audio("./assets/Sounds/gameover.mp3"),
];
soundCatagory[2].volume = 1;

const element = document.getElementById("score");

function preload() {
	let path = "./assets/Images/";
	imageCatagory[0] = loadImage(path + "Frog.png");
	imageCatagory[1] = loadImage(path + "disassemble.png");
	imageCatagory[2] = loadImage(path + "assemble.png");
}

function setup() {
	createCanvas(980, 540);

	frameRate(15);

	let size = 20;
	snake = new Snake(
		width,
		height,
		(width - size) / 2,
		(height - size) / 2,
		size,
		soundCatagory
	);

	food = new Food(imageCatagory, snake);
}

function draw() {
	background(60);

	element.innerText = `Score: ${snake.body.length}`;

	food.display(imageCatagory);

	if (!snake.move()) gameOver();
	if (snake.eat(food)) food.newLocation(snake);
}

function keyPressed() {
	if (keyCode === UP_ARROW && snake.speedY == 0) snake.update(0, -1);
	else if (keyCode === RIGHT_ARROW && snake.speedX == 0) snake.update(1, 0);
	else if (keyCode === DOWN_ARROW && snake.speedY == 0) snake.update(0, 1);
	else if (keyCode === LEFT_ARROW && snake.speedX == 0) snake.update(-1, 0);
}

function gameOver() {
	alert(`Game Over!
Your final Score is ${snake.body.length}`);
	setup();
}
