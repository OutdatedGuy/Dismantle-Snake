class Food {
	x;
	y;
	type = 0;
	num = 1;

	constructor(foodTypes, snake) {
		this.xMax = snake.xMax;
		this.yMax = snake.yMax;

		this.size = snake.size;
		this.catagory = foodTypes;

		this.newLocation(snake);
	}

	newLocation(snake) {
		this.x = int(random(1, this.xMax / this.size - 2)) * this.size;
		this.y = int(random(1, this.yMax / this.size - 2)) * this.size;

		for (let i = 0; i < snake.body.length; i++) {
			if (this.x == snake.body[i].x && this.y == snake.body[i].y) {
				this.newLocation(snake);
				return;
			}
		}

		if (this.x == snake.x && this.y == snake.y) {
			this.newLocation(snake);
			return;
		}

		if (this.num % 7 == 0 && snake.dismantle) this.type = 2;
		else if (this.num % 5 == 0 && !snake.dismantle) this.type = 1;
		else this.type = 0;

		this.num++;
	}

	display() {
		image(this.catagory[this.type], this.x, this.y, this.size, this.size);
	}
}
