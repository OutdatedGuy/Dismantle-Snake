let snake = [];

function setup() {
	const canvas = createCanvas(980, 540);
	canvas.position(
		(window.innerWidth - width) / 2,
		(window.innerHeight - height) / 2
	);

	snake[0] = new Snake((width - 20) / 2, (height - 20) / 2);
	frameRate(15);
}

function draw() {
	background(60);
	snake[0].move();
	snake[0].display("#0F0");
}

function keyPressed() {
	if (keyCode === UP_ARROW && snake[0].speedY == 0) snake[0].update(0, -1);
	else if (keyCode === RIGHT_ARROW && snake[0].speedX == 0)
		snake[0].update(1, 0);
	else if (keyCode === DOWN_ARROW && snake[0].speedY == 0)
		snake[0].update(0, 1);
	else if (keyCode === LEFT_ARROW && snake[0].speedX == 0)
		snake[0].update(-1, 0);
}
