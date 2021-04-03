

window.angle = .4;

const Renderer = new function() {
	this.canvas = renderCanvas;
	let ctx = this.canvas.getContext("2d");
	ctx.constructor.prototype.circle = function(x, y, size) {
		if (size < 0) return;
		this.ellipse(
			x, 
			y, 
			size,
			size,
			0,
			0,
			2 * Math.PI
		);
	};

	this.camera = new Renderer_Camera();

	this.rayCount = 100;

	this.update = function() {
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		let angleStep = Math.PI * 2 / this.rayCount;

		// {
		// 	let pos = this.camera.worldPosToCanvPos(this.camera.position);
		// 	ctx.fillStyle = '#0f0';
		// 	ctx.fillRect(pos.value[0], pos.value[1], 10, 10);
		// 	ctx.fill();
		// }

		for (let a = 0; a < 2 * Math.PI; a += angleStep)
		{
			let rayResult = this.castRay(a);
			let pos = this.camera.worldPosToCanvPos(rayResult.position);

			ctx.fillStyle = '#f00';
			ctx.beginPath();
			ctx.fillRect(pos.value[0], pos.value[1], 5, 5);
			ctx.closePath();
			ctx.fill();
		}
	}

	this.castRay = function(_angle) {
		return doRayStep(this.camera.position.copy(), _angle, 5);
	}
	const maxSize = 10;
	function doRayStep(_position, _angle, _steps) {
		let minDistance = Infinity;
		for (let i = 0; i < World.objects.length; i++)
		{
			let d = Math.abs(World.objects[i].distanceFunction(_position));
			if (d > minDistance) continue;
			minDistance = d;
		}


		if (_angle / Math.PI / 2 * Renderer.rayCount == window.angle) {
			let pos = Renderer.camera.worldPosToCanvPos(_position);
			ctx.fillStyle = '#0f0';
			ctx.beginPath();
			ctx.fillRect(pos.value[0], pos.value[1], 8, 8);
			ctx.closePath();
			ctx.fill();

			ctx.strokeStyle = '#00f';
			ctx.beginPath();
			ctx.circle(pos.value[0], pos.value[1], minDistance / Renderer.camera.zoom);
			ctx.closePath();
			ctx.stroke();
		}


		if (_steps < 0 || minDistance < .01 || minDistance > maxSize) return {
			length: minDistance,
			position: _position
		}

		let delta = new Vector(1, 0).setAngle(_angle, minDistance);
		let newPos = _position.add(delta);
		let recursiveResult = doRayStep(newPos, _angle, _steps - 1);
		return {
			length: recursiveResult.length + minDistance,
			position: recursiveResult.position
		}
	}
}





function Renderer_Camera() {
	this.size = new Vector(500, 500); // world

	this.zoom = 1 / 25; // percent of the camsize you can see
	this.position = new Vector(0, 0); // In the center of the world


	this.getWorldProjectionSize = function() {
		return this.size.copy().scale(this.zoom);
	}

	this.worldPosToCanvPos = function(_position) {
		let rPos = this.position.difference(_position);
		let pos = rPos.scale(1 / this.zoom);
		pos.value[0] /= this.size.value[0];
		pos.value[1] /= this.size.value[1];

		return new Vector(
			Renderer.canvas.width * (.5 + pos.value[0]),
			Renderer.canvas.height * (.5 + pos.value[1]),
		);
	}

	// this.canvPosToWorldPos = function(_position) {
	// 	let rPos = _position.copy().scale(this.zoom).add(this.getWorldProjectionSize().scale(-.5));
	// 	return this.position.copy().add(rPos); 
	// }
}