<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<style>
			body {
				padding: 0;
				margin: 0;
				position: fixed;
			}

			#renderCanvas {
				border: 1px solid red;
				width: 100vw;
				max-width: 100vh;
			}
		</style>
	</head>
	<body>
		<canvas id='renderCanvas' width="500" height='500'></canvas>
		<script src='js/vector.js?a=1'></script>
		<script src='js/renderer.js?a=2'></script>
		<script src='js/inputHandler.js?a=5'></script>
		<script src='js/world.js?a=4'></script>
		
		<script>


			let obj = new Circle({position: new Vector(0, 5), radius: 2.5});
			World.addObject(obj);
			let obj2 = new Circle({position: new Vector(6, 0), radius: 2});
			World.addObject(obj2);

			// let length = 1;
			// let size = new Vector(2, 2);
			// let obj3 = new Object({position: new Vector(0, 5), distanceFunction: function (_coord) {
			// 	let delta = _coord.difference(this.position);
			// 	return delta.getLength() - 5;

			// }});
			// World.addObject(obj3);

			World.setup();
		</script>

	</body>
</html>