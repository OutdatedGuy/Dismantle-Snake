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

		let item = Math.floor(Math.random() * direction.length);
		let coor = direction[item];

		this.x += coor[0] * this.size;
		this.y += coor[1] * this.size;
	}
}

class Snake {
	speedX = 0;
	speedY = 0;
	body = [];
	dismantle = false;
	catagory = [];
	moved = true;

	constructor(width, height, sounds, element, xPos = 0, yPos = 0, area = 20) {
		this.x = xPos;
		this.y = yPos;

		this.xMax = width;
		this.yMax = height;

		this.size = area;
		this.catagory = sounds;
		this.element = element;
	}

	/**
	 * Returns boolean true if food is eaten.
	 */
	eat(food) {
		if (this.x == food.x && this.y == food.y) {
			if (food.type != 0) this.dismantle = !this.dismantle;
			else this.body.push(new SnakeBody(food.x, food.y));

			this.catagory[0].play();
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

	/**
	 * Updates speed of head.
	 */
	update(newSpeedX, newSpeedY) {
		this.speedX = newSpeedX * this.size;
		this.speedY = newSpeedY * this.size;

		this.moved = false;
		console.log("Yess")
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

			this.catagory[1].play();
		}

		this.#display();
	}

	/**
	 * Updates the position of Snake.
	 * If snake dies after moving, boolean false is returned.
	 */
	move() {
		let prevX = this.x;
		let prevY = this.y;

		this.x += this.speedX;
		this.y += this.speedY;

		this.teleport(this);

		if (this.#dead()) {
			this.x = prevX;
			this.y = prevY;
			this.catagory[2].play();
			this.#display();

			return false;
		}

		this.moved = true;
		this.#moveBody(prevX, prevY);
		return true;
	}

	#eyes() {
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
		let body = "";
		body = `<div class="snake" style="top: ${this.y}px; left: ${this.x}px;"></div>`;

		for (let i = 0; i < snake.body.length; i++)
			body += `<div class="snake body" style="top: ${snake.body[i].y}px; left: ${snake.body[i].x}px;"></div>`;

		this.element.innerHTML = body;
	}
}
