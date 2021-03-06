const flock = [];
let t = 0;

function setup() {
	createCanvas(min(1000, windowWidth), min(windowHeight*0.85, 600));
	const nboid = width*height/10000
	for (let i=0; i<nboid; i++){
	flock.push(new Boid());}
	light = new Light();

	randomMovementCheckbox = createCheckbox('Random movement', false);
	randomMovementCheckbox.changed(toggleLightRandom);

	fishFriendlyLightCheckbox = createCheckbox('Fish friendly light', false);
	fishFriendlyLightCheckbox.changed(toggleFishFriendlyLight);

	boidShapeRadio = createRadio();
	boidShapeRadio.option('fish');
	boidShapeRadio.option('triangle');
	boidShapeRadio.option('circle');
	textAlign(CENTER);
	boidShapeRadio.selected('fish')
	noCursor()
}

function draw() {
	colorMode(RGB)
	background(0, 140, 255);

	// Use HSB for the rest
	colorMode(HSB)

	boidShape = boidShapeRadio.value();

	light.update()
	light.show()

	for (let boid of flock){
		boid.flock(flock)
		boid.update()
		boid.show()
	}

}

function mouseInCanvas(){
return	 (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height)
}

// Built-in p5 function
function mouseClicked(){
	if (mouseInCanvas()){
	light.lighton = !light.lighton;
		if (light.lighton && !lightMovesRandomly){
			noCursor()
		} else {cursor()}
	}
}

// Built-in p5 function
// for touchscreen
function touches(){
light.lighton = !light.lighton;

}


// Built-in p5 function
function mouseWheel(event){
	newLightSize = light.initialSize + event.delta;
	if (newLightSize < 500 && newLightSize > 10 && mouseInCanvas()){
	light.initialSize = newLightSize
	}
	return false
}

function toggleLightRandom(){
	if (this.checked()){
		lightMovesRandomly = true;
		light.lighton = true;
		// Bring back the cursor if user is not controlling the light position
		cursor()
	} else {
lightMovesRandomly = false;
		// Remove cursor when user takes control of the light
		noCursor()
	}
}

function toggleFishFriendlyLight(){
	if (this.checked()){
		fishFriendlyLight = true;
	} else {
		fishFriendlyLight = false;
	}
}
