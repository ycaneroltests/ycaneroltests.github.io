let lightMovesRandomly = false;


class Light{
		constructor(){
			this.position = createVector(random(width), random(height))
			this.initialSize = width/10;
			// Store size in a different variable to be able to toggle later
			this.size = this.initialSize
			this.lighton = true;
		}

		update(){
			if (lightMovesRandomly){
				this.position.x = noise(t) * width
				this.position.y = noise(t+50) * height
				t+=0.005;
			} else {
				if (mouseInCanvas()){
				this.position.x = mouseX
				this.position.y = mouseY
				}
			}
			this.size = this.initialSize * this.lighton
		}

		show(){
			push();
			fill(255);
			noStroke();
			translate(this.position.x, this.position.y)
			circle(0, 0, this.size*2)
			pop();
		}

}
