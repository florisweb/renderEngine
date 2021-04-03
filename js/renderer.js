
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

	this.rayCount = 300;

	this.cursorPos = new Vector(0, 0);
	this.update = function() {
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		let angleStep = Math.PI * 2 / this.rayCount;

		for (let a = 0; a < 2 * Math.PI; a += angleStep)
		{
			let rayResult = this.castRay(a, this.camera.position);
			let pos = this.camera.worldPosToCanvPos(rayResult.position);

			ctx.fillStyle = '#000';
			ctx.globalAlpha = 1 - sigmoid(rayResult.length / 20);
			ctx.beginPath();
			ctx.fillRect(pos.value[0], pos.value[1], 3, 3);
			ctx.closePath();
			ctx.fill();
		}
		ctx.globalAlpha = 1;

		// {
		// 	let angle = this.camera.position.difference(this.cursorPos).getAngle();
		// 	let rayResult = this.castRay(angle, this.camera.position, true);
		// 	let pos = this.camera.worldPosToCanvPos(rayResult.position);

		// 	ctx.fillStyle = '#00f';
		// 	ctx.beginPath();
		// 	ctx.fillRect(pos.value[0], pos.value[1], 10, 10);
		// 	ctx.closePath();
		// 	ctx.fill();
		// }
	}

	this.castRay = function(_angle, _startPosition = this.camera.position, _debug) {
		return doRayStep(_startPosition.copy(), _angle, 15, _debug);
	}

	function doRayStep(_position, _angle, _steps, _debug) {
		let minDistance = Infinity;
		for (let i = 0; i < World.objects.length; i++)
		{
			let d = Math.abs(World.objects[i].distanceFunction(_position.copy()));
			if (d > minDistance) continue;
			minDistance = d;
		}


		if (_debug) {
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

		//  || minDistance < .1
		if (_steps < 0) return {
			length: minDistance,
			position: _position
		}

		let delta = new Vector(1, 0).setAngle(_angle, minDistance);
		let newPos = _position.copy().add(delta);
		let recursiveResult = doRayStep(newPos, _angle, _steps - 1, _debug);
		return {
			length: recursiveResult.length + minDistance,
			position: recursiveResult.position
		}
	}
}





function Renderer_Camera() {
	this.size = new Vector(500, 500); // canvas
	this.position = new Vector(0, 0); // In the center of the world
	this.zoom = .05; // percent of the camsize you can see

	this.getWorldProjectionSize = function() {
		return this.size.copy().scale(this.zoom);
	}

	this.worldPosToCanvPos = function(_position) {
		let rPos = this.position.copy().add(this.getWorldProjectionSize().scale(-.5)).difference(_position);
		return rPos.scale(1 / this.zoom);
	}
	
	this.canvPosToWorldPos = function(_position) {
		let rPos = _position.copy().scale(this.zoom).add(this.getWorldProjectionSize().scale(-.5));
		return this.position.copy().add(rPos); 
	}
}




function sigmoid(_x) {
	return 1 / (1 + Math.pow(Math.E, -_x))
}


