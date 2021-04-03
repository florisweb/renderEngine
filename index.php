<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<style>
			body {
				padding: 0;
				margin: 0;
			}

			#renderCanvas {
				border: 1px solid red;
				width: 100vw;
			}
		</style>
	</head>
	<body>
		<canvas id='renderCanvas' width="500" height='500'></canvas>
		<script src='js/vector.js'></script>
		<script src='js/renderer.js'></script>
		<script src='js/inputHandler.js'></script>
		<script src='js/world.js'></script>
		
		<script>


			// let obj = new Circle({position: new Vector(0, 5), radius: 2});
			// World.addObject(obj);
			let obj2 = new Circle({position: new Vector(6, 0), radius: 2});
			World.addObject(obj2);

			// let length = 1;
			// let obj3 = new Object({position: new Vector(0, 5), distanceFunction: function (_coord) {
			// 	// let delta = _coord.difference(this.position);
			// 	let delta = this.position.difference(_coord);
			// 	// console.log(_coord.value);
			// 	// let angle = delta.getAngle();

			// 	// if (delta[0] > length) return delta.add(new Vector(length, 0)).getLength();
			// 	// if (delta[0] < 0) 
			// 	return delta.getLength() - 2;
			// 	// return delta.value[1];//.getLength() - Math.sin(angle) * 3;

			// }});
			// World.addObject(obj3);

			World.setup();
		</script>

	</body>
</html>