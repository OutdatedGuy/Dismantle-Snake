{
	let width = 980,
		height = 540;
	const size = 20;
	let frames = 15;

	if (window.innerWidth < 1000) {
		width = window.innerWidth * 0.9;
		width -= width % size;
	}
	if (window.innerHeight < 700) {
		height = (window.innerHeight - 120) * 0.9;
		height -= height % size;
	}
	if (window.innerWidth < 700) frames = 10;

	let snake, food;
	let draw,
		isPlaying = false;

	if (localStorage.getItem("highscore") === null)
		localStorage.setItem("highscore", "NA");

	function setup() {
		const canvas = document.getElementById("canvas");
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";

		document.onkeydown = keyPressed;

		const soundCatagory = [
			new Audio("./assets/Sounds/eat.mp3"),
			new Audio("./assets/Sounds/break.mp3"),
			new Audio("./assets/Sounds/gameover.mp3"),
		];
		soundCatagory[1].volume = 0.2;

		let startPosX = (width - size) / 2;
		let startPosY = (height - size) / 2;

		if (((width / 20) % 10) % 2 == 0) startPosX -= size / 2;
		if (((height / 20) % 10) % 2 == 0) startPosY -= size / 2;

		snake = new Snake(
			width,
			height,
			soundCatagory,
			document.getElementById("snake"),
			startPosX,
			startPosY,
			size
		);

		instruction();
	}
	setup();

	function game() {
		document.getElementById(
			"score"
		).innerText = `Score: ${snake.body.length}`;
		document.getElementById(
			"highscore"
		).innerText = `Your Highscore: ${localStorage.getItem("highscore")}`;

		if (!snake.move()) gameOver();
		if (snake.eat(food)) food.newLocation(snake);
	}

	function keyPressed(e) {
		if (isPlaying) {
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
		} else if (e.keyCode === 13) startIt();
	}

	function gameOver() {
		setTimeout(() => {
			alert(`Game Over!\nYour final Score is ${snake.body.length}`);

			clearInterval(draw);
			isPlaying = false;

			document.getElementById("food").className = "";
			document.getElementById("snake").innerHTML = "";

			setup();
		}, 40);
	}

	function instruction() {
		const inst = document.getElementById("instructions");
		inst.style.display = "grid";
		inst.style.gridTemplateColumns = `repeat(3, ${width / 3 - 20}px)`;
		inst.style.gridTemplateRows = `repeat(2, ${height / 2}px)`;

		document.getElementById("score").innerText = "Instructions";
		document.getElementById("highscore").innerText = "";
	}

	function startIt() {
		document.getElementById("instructions").style.display = "none";
		draw = setInterval(game, 1000 / frames);
		isPlaying = true;
		food = new Food(snake, document.getElementById("food"));
	}

	/**
	 * Mobile swipping mode
	 */
	var supportTouch = $.support.touch,
		scrollEvent = "touchmove scroll",
		touchStartEvent = supportTouch ? "touchstart" : "mousedown",
		touchStopEvent = supportTouch ? "touchend" : "mouseup",
		touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
	$.event.special.swipeupdown = {
		setup: function () {
			var thisObject = this;
			var $this = $(thisObject);
			$this.bind(touchStartEvent, function (event) {
				var data = event.originalEvent.touches
						? event.originalEvent.touches[0]
						: event,
					start = {
						time: new Date().getTime(),
						coords: [data.pageX, data.pageY],
						origin: $(event.target),
					},
					stop;

				function moveHandler(event) {
					if (!start) {
						return;
					}
					var data = event.originalEvent.touches
						? event.originalEvent.touches[0]
						: event;
					stop = {
						time: new Date().getTime(),
						coords: [data.pageX, data.pageY],
					};

					// prevent scrolling
					event.preventDefault();
				}
				$this
					.bind(touchMoveEvent, moveHandler)
					.one(touchStopEvent, function (event) {
						$this.unbind(touchMoveEvent, moveHandler);
						if (start && stop) {
							if (
								stop.time - start.time < 1000 &&
								Math.abs(start.coords[1] - stop.coords[1]) >
									30 &&
								Math.abs(start.coords[0] - stop.coords[0]) < 75
							) {
								start.origin
									.trigger("swipeupdown")
									.trigger(
										start.coords[1] > stop.coords[1]
											? "swipeup"
											: "swipedown"
									);
							}
						}
						start = stop = undefined;
					});
			});
		},
	};
	$.each(
		{
			swipedown: "swipeupdown",
			swipeup: "swipeupdown",
		},
		function (event, sourceEvent) {
			$.event.special[event] = {
				setup: function () {
					$(this).bind(sourceEvent, $.noop);
				},
			};
		}
	);

	$("body").on("swipeup", function () {
		if (snake.speedY == 0) swipped(0, -1);
	});
	$("body").on("swiperight", () => {
		if (snake.speedX == 0) swipped(1, 0);
	});
	$("body").on("swipedown", function () {
		if (snake.speedY == 0) swipped(0, 1);
	});
	$("body").on("swipeleft", () => {
		if (snake.speedX == 0) swipped(-1, 0);
	});

	function swipped(xS, yS) {
		if (isPlaying) {
			if (snake.moved) snake.update(xS, yS);
			else {
				setTimeout(() => {
					snake.update(xS, yS);
				}, 69);
			}
		}
	}
}
