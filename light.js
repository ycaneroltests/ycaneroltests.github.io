let lightMovesRandomly = false;


class Light{
		constructor(){
			this.position = createVector(random(width), random(height))
			this.initialSize = width/10;
			this.size = this.initialSize
			this.lighton = true;
		}

		update(){
			if (lightMovesRandomly){
			this.position.x = noise(t) * width
			this.position.y = noise(t+50) * height
			t+=0.005;
			} else {
				if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height){
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
