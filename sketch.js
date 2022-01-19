const flock = [];
let t = 0;

function setup() {
	createCanvas(min(1000, windowWidth), min(windowHeight, 600));
	const nboid = width*height/10000
	for (let i=0; i<nboid; i++){
	flock.push(new Boid());}
	light = new Light();
	
	randomMovementCheckbox = createCheckbox('Random movement', false);
	randomMovementCheckbox.changed(toggleLightRandom);

	boidShapeRadio = createRadio();
	boidShapeRadio.option('fish');
	boidShapeRadio.option('triangle');
	boidShapeRadio.option('circle');
	textAlign(CENTER);
	boidShapeRadio.selected('fish')
}

function draw() {
	background(0, 100, 240);

	boidShape = boidShapeRadio.value();

	light.update()
	light.show()

	for (let boid of flock){
		boid.flock(flock)
		boid.update()
		boid.show()
	}

}

function mouseClicked(){
	light.lighton = !light.lighton;
}

function touches(){
light.lighton = !light.lighton;

}

function toggleLightRandom(){
	if (this.checked()){
		lightMovesRandomly = true;
		light.lighton = true;
	} else {
lightMovesRandomly = false;
	}
}
