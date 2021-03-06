let maxForce = 1
let maxSpeed = 3;
let minSpeed = 0.01;
let boidShape = 'fish';
let size = 6;

class Boid {
	constructor(){
		this.position = createVector(random(width), random(height));
		this.velocity = p5.Vector.random2D();
		this.velocity.setMag(random(0.5, 1.5))
		this.acceleration = createVector();
		this.size= size * random(1,2)
		// Colors are in HSB space
		this.colors = [random(0, 360), random(90, 100), random(90, 100)]
	}

	flock(boids){
		let perceptionRadius = 40;
		let total = 0;
		let alignment = createVector();
		let cohesion = createVector();
		let avoidance = createVector();
		for (let other of boids){
			let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
				if ( other != this && d < perceptionRadius ){
					alignment.add(other.velocity);
					cohesion.add(other.position);
					let avoidDiff = p5.Vector.sub(this.position, other.position).div(d**2).mult(5*this.size);
					avoidance.add(avoidDiff);
					total++;
				}
		}

		// Avoid the light
		let d = dist(this.position.x, this.position.y, light.position.x, light.position.y)
		let avoidDiff = p5.Vector.sub(this.position, light.position).div(d**2).mult(light.size/5)
		let avoidLight = avoidDiff;

		if (total>0){
			cohesion.div(total)
			cohesion.sub(this.position);
			cohesion.limit(maxForce);
			alignment.div(total)
			// alignment.setMag(maxSpeed)
			alignment.sub(this.velocity);
			alignment.limit(maxForce);
			avoidance.limit(maxForce*3);

		}
		this.acceleration.add(alignment)
		this.acceleration.add(cohesion)
		this.acceleration.add(avoidance)
		if (!fishFriendlyLight){
			this.acceleration.add(avoidLight)
		}
	}

	isOffscreen(){ //Handling what happens at the edges
			if (this.position.x > width-0){ this.position.x-=width}
			if (this.position.y > height-0){ this.position.y-=height}
			if (this.position.x < 0){this.position.x+=width}
			if (this.position.y < 0){this.position.y+=height}
		}

	show(){
			noStroke()
			let d = dist(this.position.x, this.position.y, light.position.x, light.position.y)
			let color = this.colors
			let shadowx = light.position.x - this.position.x
			let shadowy = light.position.y - this.position.y
			let xoffset = shadowx*0.1
			let yoffset = shadowy*0.1
			let shadowToLight = light.size - sqrt(shadowx**2 + shadowy**2)
			let shadowDropoff = map(shadowToLight, 100, -50, 1, 0)
			let colorDropoff = map(light.size-d, light.size*1.3, -50, 1, 0, true)
			// Draw the shadow
			fill(0, shadowDropoff);
			this.drawBoid(boidShape, this.position.x - xoffset,
									 this.position.y - yoffset,
									 this.velocity, this.size*1.2);
			// Draw non-illuminated fish
			fill(0)
			this.drawBoid(boidShape, this.position.x, this.position.y, this.velocity, this.size)

			// Draw the fish color, with alpha value based on distance to light
			// When the fish is far from the light, the non-illuminted version will be seen
			fill(color[0], color[1], color[2], shadowDropoff)
			this.drawBoid(boidShape, this.position.x, this.position.y, this.velocity, this.size)

			// Switch the fill back to black to handle wrapping
			fill(0)
			if (this.position.x < this.size * 3) {
				this.drawBoid(boidShape, this.position.x+width, this.position.y, this.velocity, this.size)
			} else {
			if (this.position.x > width - this.size * 3) {
				this.drawBoid(boidShape, this.position.x-width, this.position.y, this.velocity, this.size)
				}
			}
			if (this.position.y < this.size * 3) {
				this.drawBoid(boidShape, this.position.x, this.position.y+height, this.velocity, this.size)
			} else {
			if (this.position.y > height - this.size * 3) {
				this.drawBoid(boidShape, this.position.x, this.position.y-height, this.velocity, this.size)
				}
			}
		}
	drawBoid(boidShape, posx, posy, vel, size){
		if (boidShape=='triangle'){
			this.drawTriangle(posx, posy, vel, size)
		} else{
			if(boidShape == 'fish'){
			this.drawFish(posx, posy, vel, size)
			} else{
				this.drawPoint(posx, posy, size)
			}

		}
	}


	drawPoint(posx, posy, size){
		push();
		translate(posx, posy);
		ellipse(0, 0, size)
		pop();

	}

	drawTriangle(posx, posy, vel, size){
		push();
		translate(posx, posy);
		rotate(atan2(vel.y, vel.x));
		rotate(PI/2)
		let s = size
		triangle(s*-0.5, s*1,
				 s* 0.5, s*1,
				 0     , s*-2 )
		pop();
	}

	drawFish(posx, posy, vel, size){
			noStroke()
			let s = size
			let p1 = {x:      0, y: 2*s}
			let p2 = {x:    2*s, y:-2*s}
			let p3 = {x:   -2*s, y:-2*s}
			let p4 = {x: -0.5*s, y: 2.5*s}
			let p5 = {x:  0.5*s, y: 2.5*s}
			push();
			translate(posx, posy)
			beginShape()
		rotate(atan2(vel.y, vel.x));
		rotate(PI/2)
			vertex(p1.x, p1.y)
			bezierVertex(
                  p2.x, p2.y,
				  p3.x, p3.y,
			      p1.x, p1.y);
			vertex(p4.x, p4.y)
			vertex(p5.x, p5.y)
			endShape();

			pop();
	}
	update(){
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.velocity.limit(maxSpeed)
		if (this.velocity.mag < minSpeed) {
			this.velocity.setMag(minSpeed)
		}
		this.isOffscreen();
		this.acceleration.mult(0)
	}
}
