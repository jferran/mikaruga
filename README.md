# MIKARUGA


## [See the Game](https://jferran.github.io/mikaruga/)
NOTE: above link will be added later

# Description

Shooting game in which there are collisions only when the spaceship and the bullets have got opposite color (black != white).
In case of collision with same color bullets, we collect the energy for a super beam.

# Main Functionalities

- Move with arrow keys
- Shoot with spacebar
- Change ship color with Ctrl key
- Shoot super beam with Shift key

# Backlog Functionalities

- Complex move pattern
- Life collection
- Shields
- Switch off music/sounds

# Proyect Structure

## main.js

- startGame()

## game.js

- Game () {
    this.myShip;
    this.level;
    this.gameLevels;
    this.shipsArr;
    this.score;
}
- gameLoop () {}
- collisionControl () {}
- colisionSpaceShipsControl () {}
- gameOver () {}

## myShip.js 

- MyShip () {
    this.x;
    this.y;
    this.w;
    this.h;
}
- draw () {}
- move () {}
- shoot () {}
- shootSuperBeam () {}
- switchColor () {}

## ship.js
- Ship() {
    this.x;
    this.y;
    this.w;
    this.h;
    this.speed;
    this.movePattern;
}
- draw () {}
- move () {}
- shoot () {}

## bullet.js
- Bullet() {
    -this.x;
    -this.y;
    -this.radius;
    -this.speed;
} 
- draw () {}
- move () {}

# States and Transitions

- Start Screen
- Game Screen
- Win Screen

# Extra Links

### Slides
[Link Slides.com](https://docs.google.com/presentation/d/1mvK1vtwlZC2SW7258xLtM9Nrcj_8L2v4jeXGGWs0ppI/edit?usp=sharing)