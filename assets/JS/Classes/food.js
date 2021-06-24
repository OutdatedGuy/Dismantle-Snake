class Food {
	x;
	y;
	type = 0;
	num = 1;

	constructor(snake, element) {
		this.xMax = snake.xMax;
		this.yMax = snake.yMax;

		this.size = snake.size;
		this.element = element;

		this.#setSize();
		this.newLocation(snake);
	}

	/**
	 * Sets the value of width and height for food.
	 */
	#setSize() {
		this.element.style.width = this.size + "px";
		this.element.style.height = this.size + "px";
	}

	/**
	 * Sets the postion of food by top and left properties.  
	 * Type of food is represented by class name.
	 */
	#setPosition(left, top, type) {
		this.element.style.top = top + "px";
		this.element.style.left = left + "px";

		this.element.className = `type${type}`;
	}

	/**
	 * Choses a new random location for food.  
	 * Food location does not overlap with snake.
	 */
	newLocation(snake) {
		this.x =
			Math.floor(Math.random() * (this.xMax / this.size)) * this.size;
		this.y =
			Math.floor(Math.random() * (this.yMax / this.size)) * this.size;

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
		this.#setPosition(this.x, this.y, this.type);
	}
}
