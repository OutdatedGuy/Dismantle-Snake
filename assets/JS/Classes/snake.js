class SnakeBody {
	constructor(xPos = 0, yPos = 0, area = 20) {
		this.x = xPos;
		this.y = yPos;
		this.size = area;
	}

	rogue() {
		let direction = [
			// [-1, -1],
			[0, -1],
			// [1, -1],
			[1, 0],
			// [1, 1],
			[0, 1],
			// [-1, 1],
			[-1, 0],
		];

		let coor = random(direction);

		this.x += coor[0] * this.size;
		this.y += coor[1] * this.size;
	}
}

class Snake {
	speedX = 0;
	speedY = 0;
	body = [];
	dismantle = false;

	constructor(width, height, xPos = 0, yPos = 0, area = 20) {
		this.x = xPos;
		this.y = yPos;

		this.xMax = width;
		this.yMax = height;

		this.size = area;
	}

	eat(food) {
		if (this.x == food.x && this.y == food.y) {
			if (food.type != 0) this.dismantle = !this.dismantle;
			else this.body.push(new SnakeBody());

			return true;
		}

		return false;
	}

	teleport(part) {
		if (part.x > this.xMax - this.size) part.x = 0;
		else if (part.x < 0) part.x = this.xMax - this.size;

		if (part.y > this.yMax - this.size) part.y = 0;
		else if (part.y < 0) part.y = this.yMax - this.size;
	}

	update(newSpeedX, newSpeedY) {
		this.speedX = newSpeedX * this.size;
		this.speedY = newSpeedY * this.size;
	}

	#dead() {
		for (let i = 0; i < this.body.length; i++)
			if (this.x == this.body[i].x && this.y == this.body[i].y)
				return true;

		return false;
	}

	#moveBody(prevX, prevY) {
		if (!this.dismantle) {
			for (let i = this.body.length - 1; i > 0; i--) {
				this.body[i].x = this.body[i - 1].x;
				this.body[i].y = this.body[i - 1].y;
			}

			if (this.body.length != 0) {
				this.body[0].x = prevX;
				this.body[0].y = prevY;
			}
		} else {
			for (let i = 0; i < this.body.length; i++) {
				prevX = this.body[i].x;
				prevY = this.body[i].y;

				this.body[i].rogue();
				this.teleport(this.body[i]);

				if (this.body[i].x == this.x && this.body[i].y == this.y) {
					this.body[i].x = prevX;
					this.body[i].y = prevY;
					i--;
				}
			}
		}

		this.#display();
	}

	move() {
		let prevX = this.x;
		let prevY = this.y;

		this.x += this.speedX;
		this.y += this.speedY;

		this.teleport(this);

		if (this.#dead()) {
			this.x = prevX;
			this.y = prevY;
			this.#display();

			return false;
		}

		this.#moveBody(prevX, prevY);
		return true;
	}

	eyes() {
		var far = (3 * this.size) / 4;
		var near = this.size / 4;
		var width = (3 * this.size) / 20;
		var height = (6 * this.size) / 20;

		push();
		fill(0);
		noStroke();
		ellipseMode(CENTER);
		if (this.speedX > 0) {
			ellipse(this.x + far, this.y + near, height, width);
			ellipse(this.x + far, this.y + far, height, width);
		} else if (this.speedX < 0) {
			ellipse(this.x + near, this.y + near, height, width);
			ellipse(this.x + near, this.y + far, height, width);
		} else if (this.speedY < 0) {
			ellipse(this.x + near, this.y + near, width, height);
			ellipse(this.x + far, this.y + near, width, height);
		} else if (this.speedY > 0) {
			ellipse(this.x + near, this.y + far, width, height);
			ellipse(this.x + far, this.y + far, width, height);
		}
		pop();
	}

	#display() {
		push();
		fill(color("#0F0"));
		square(this.x, this.y, this.size, 5);
		this.eyes();

		fill(color("tomato"));
		for (let i = 0; i < this.body.length; i++)
			square(this.body[i].x, this.body[i].y, this.size, 5);
		pop();
	}
}