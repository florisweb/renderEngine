
const vertexShaderText = [
	'precision mediump float;', // precision thingy?
	
	'attribute vec2 vertPosition;',
	'attribute vec3 vertColor;',
	'varying vec3 fragColor;', //output
	'void main() {',
		'fragColor = vertColor;',
		'gl_Position = vec4(vertPosition, 0.0, 1.0);',
	'}'

].join("\n");

const fragmentShaderText = [
	'precision mediump float;',
	'varying vec3 fragColor;', //input

	'void main() {',
		'gl_FragColor = vec4(fragColor, 1);',
	'}'
].join("\n");




const Renderer = new function() {
	this.camera = new Renderer_Camera();


	this.canvas = renderCanvas;
	let gl = this.canvas.getContext("webgl");
	if (!gl)
	{
		gl = this.canvas.getContext("experimental-webgl");
	}
	
	gl.viewport(0, 0, this.canvas.width, this.canvas.height);



	let vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vertexShaderText);
	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error("error compiling vertexShader", gl.getShaderInfoLog(vertexShader))
		return;
	}


	let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fragmentShaderText);
	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error("error compiling fragmentShader", gl.getShaderInfoLog(fragmentShader))
		return;
	}


	let program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error("error linking program", gl.getProgramInfoLog(program))
		return;
	}



	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error("error validating program", gl.getProgramInfoLog(program))
		return;
	}


	// buffer

	let triangleVertices = [
		// x y  	r  g  b
		0, .5, 		1, 0, 0,
		-.5, -.5, 	0, 1, 0,
		.5, -.5, 	0, 0, 1,
		-1, -1, 	1, 1, 1,
		-.8, -1, 	1, 0, 0,
		-1, -.8, 	1, 1, 1
	];


	let triangleVertexBufferObj = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObj); // makes this buffer the active buffer
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW); // draws data to active buffer, static_draw: one time draw, never again


	let positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	gl.vertexAttribPointer(
		positionAttribLocation, // attrib location
		2, // elements per attribute
		gl.FLOAT, // type of element
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT, // size of every vertex
		0, // Offset
	);

	gl.enableVertexAttribArray(positionAttribLocation);


	let colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	gl.vertexAttribPointer(
		colorAttribLocation, // attrib location
		3, // elements per attribute
		gl.FLOAT, // type of element
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT, // size of every vertex
		2 * Float32Array.BYTES_PER_ELEMENT, // Offset
	);

	gl.enableVertexAttribArray(colorAttribLocation);


	gl.clearColor(.1, .1, .1, 1); // Set color
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.useProgram(program);
		gl.drawArrays(
			gl.TRIANGLES, 
			0, 
			6 // amount of vertices
		);
	
	// main render loop
	
	this.update = function() {
		// gl.clearColor(.1, .1, .1, 1); // Set color
		// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.useProgram(program);
		// // gl.drawArrays(
		// // 	gl.TRIANGLES, 
		// // 	0, 
		// // 	6 // amount of vertices
		// // );

		
	}
}





function Renderer_Camera() {
	this.size = new Vector(500, 500); // canvas
	this.position = new Vector(0, 0); // In the center of the world
	this.zoom = .05; // percent of the camsize you can see

	
}


