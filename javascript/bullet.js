class Bullet {
  constructor(ship, direction, superBeam) {
    this.x = ship.x + ship.w / 2;
    this.y = ship.y;

    //this.h=10
    this.radius = 10;
    this.superBeam = false;

    if (superBeam) {
      this.superBeam = true;
      if (ship.color === "white") this.radius += ship.superBeamWhite * 3;
      else {
        this.radius += ship.superBeamBlack * 3;
      }
    }

    this.speed = 200;
    this.direction = direction;
    this.color = ship.color;
    this.visible = true;
    //mySound.play()
    new Audio("../music/laser-gun-19sf.mp3").play();
  }

  draw() {
    if (this.visible) {
      ctx.beginPath();
      if (this.color === "white") {
          ctx.fillStyle = "#FFF";
          ctx.strokeStyle = "black";  
        }
      else {
          ctx.fillStyle = "#000000";
          ctx.strokeStyle = "white";
        }
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.lineWidth = 1;
      
      ctx.stroke();

    }
  }

  move(secondsPassed) {
    timePassed += secondsPassed
    if (this.direction === "up") {
        console.log("secPB", secondsPassed)
      this.y = this.y - this.speed*secondsPassed;
    } else if (this.direction === "down"){
      this.y = this.y + this.speed*secondsPassed;
    } else if(this.direction === "right"){
        this.x = this.x+this.speed*secondsPassed
    }
    else{
        this.x=this.x-this.speed*secondsPassed

    }

    if (
      this.y - this.radius * 2 > canvas.height ||
      this.y + this.radius * 2 < 0 ||
      this.x - this.radius * 2 > canvas.width ||
      this.x + this.radius * 2 < 0
    ) {
      this.visible = false;
    }
  }
}
