


const InputHandler = new _InputHandler();

const World = new function() {
	// this.size = new Vector(10, 10);
	
	this.objects = [];
	this.addObject = function(_object) {
		this.objects.push(_object);
	}

	this.setup = function() {
		this.update();
	}

	this.update = function() {
		Renderer.update();
		requestAnimationFrame(function () {World.update()});
	}


}




function Object({distanceFunction, position}) {
	this.position = position;
	this.distanceFunction = distanceFunction;


}

function Circle({position, radius}) {
	this.radius = radius;

	this.dFunction = function(_coord) {
		let delta = this.position.difference(_coord);
		return delta.getLength() - this.radius;
	}

	Object.call(this, {position: position, distanceFunction: this.dFunction});
}




