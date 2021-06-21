class SnakeBody {
	constructor() {
		this.x;
		this.y;
	}
}

class Snake {
	constructor(width, height, xPos = 0, yPos = 0, area = 20) {
		this.x = xPos;
		this.y = yPos;

		this.xMax = width;
		this.yMax = height;

		this.speedX = 0;
		this.speedY = 0;

		this.size = area;
		this.body = [];
	}

	eat(food) {
		if (this.x == food.x && this.y == food.y) {
			this.body.push(new SnakeBody());
			return true;
		}

		return false;
	}

	update(newSpeedX, newSpeedY) {
		this.speedX = newSpeedX * this.size;
		this.speedY = newSpeedY * this.size;
	}

	move() {
		for (let i = this.body.length - 1; i > 0; i--) {
			this.body[i].x = this.body[i - 1].x;
			this.body[i].y = this.body[i - 1].y;
		}

		if (this.body.length != 0) {
			this.body[0].x = this.x;
			this.body[0].y = this.y;
		}

		this.x += this.speedX;
		this.y += this.speedY;

		if (this.x > this.xMax - this.size) this.x = 0;
		if (this.x < 0) this.x = this.xMax - this.size;
		if (this.y > this.yMax - this.size) this.y = 0;
		if (this.y < 0) this.y = this.yMax - this.size;

		if (this.dead()) return false;
		this.display();
		return true;
	}

	dead() {
		for (let i = 0; i < this.body.length; i++)
			if (this.x == this.body[i].x && this.y == this.body[i].y)
				return true;

		return false;
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

	display(headCol = "#0F0", bodyCol = "tomato") {
		push();
		fill(color(headCol));
		square(this.x, this.y, this.size, 5);
		this.eyes();

		fill(color(bodyCol));
		for (let i = 0; i < this.body.length; i++)
			square(this.body[i].x, this.body[i].y, this.size, 5);
		pop();
	}
}
