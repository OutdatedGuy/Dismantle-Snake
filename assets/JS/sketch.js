let snake;
let food;
let catagory = [];

function preload() {
	let path = "./assets/Images/";
	catagory[0] = loadImage(path + "Frog.png");
	catagory[1] = loadImage(path + "disassemble.png");
	catagory[2] = loadImage(path + "assemble.png");
}

function setup() {
	const canvas = createCanvas(980, 540);
	canvas.position(
		(window.innerWidth - width) / 2,
		(window.innerHeight - height) / 2
	);

	frameRate(15);

	let size = 20;
	snake = new Snake(width, height, (width - 20) / 2, (height - 20) / 2, size);

	food = new Food(catagory, snake);
}

function draw() {
	background(60);

	food.display(catagory);

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
	background(255, 0, 0);
	noLoop();
}
