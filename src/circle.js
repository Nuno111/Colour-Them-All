class Circle {
	
	constructor(x, y, dx, dy, radius, text) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.colour = circlesData.startingColour;
		this.textColour = circlesData.targetColour;
		this.text = text;
	}

	update = () => {
		if (this.x + this.radius > DOM.canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > DOM.canvas.height || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	}

	draw = () => {
		const circle = new Path2D();
		circle.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		DOM.ctx.fillStyle = this.colour;
		DOM.ctx.fill(circle);
		this.id = circle;
	}
}