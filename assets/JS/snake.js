class Snake {
	constructor(xPos, yPos) {
		this.x = xPos;
		this.y = yPos;
		this.speedX = 0;
		this.speedY = 0;
		this.size = 20;
	}

	eat(foodX, foodY) {
		if (this.x == foodX && this.y == foodY) newFood();
	}

	update(newSpeedX, newSpeedY) {
		this.speedX = newSpeedX * this.size;
		this.speedY = newSpeedY * this.size;
	}

	move() {
		this.x += this.speedX;
		this.y += this.speedY;

		if (this.x > width - this.size) this.x = 0;
		if (this.x < 0) this.x = width - this.size;
		if (this.y > height - this.size) this.y = 0;
		if (this.y < 0) this.y = height - this.size;
	}

	dead() {
		for (let i = 1; i < snake.length; i++)
			if (this.x == snake[i] && this.y == snake[i]) gameOver();
	}

	display(col = "#6CBB3C") {
		push();
		fill(color(col));
		square(this.x, this.y, this.size, 5);
		pop();
	}
}
