//console.log("desde el js Game");
let secondsPassed;
let oldTimeStamp = +new Date() - 60 * 5;
let fps;
let frame;
let posX = 0,
  posY = 0;
let timePassed = 0;
let levelSpeed;
// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe
// https://javascript.tutorialink.com/adding-a-number-to-number-results-in-nan-in-my-program-why/

/*
let levels = [

   [ [40, 40, "black", "LeftRightLoop", true], [100, 40, "white", "LeftRightLoop", true], [160, 40, "black", "LeftRightLoop", false], [220, 40, "white", "LeftRightLoop", false]],
    [[40, 40, "black", "LeftRightLoop", true], [100, 40, "white", "LeftRightLoop", true], [160, 40, "black", "LeftRightLoop", false], [220, 40, "white", "LeftRightLoop", false]],
    [[40, 40, "black", "UpDown", true], [40, -60, "black", "UpDown", true]]
]*/

class Game {
  constructor() {
    //todas nuestras propiedades del juego
    //1. el fondo

    this.bg = new Image();
    this.bg.src = "./images/galaxyVectorCrop.svg"; //quizas lo modifiquemos luego

    this.myShip = new MyShip();

    this.level = 1;
    this.gameLevels = [];

    this.shipsArr = [];
    //this.killedShipsArr = []

    this.isGameOn = true;
    this.score = 0;
    this.killedShips = 0
    this.collectedEnergy = 0;
    levelSpeed=1;
  }
  //todos los metodos que regulan nuestro juego, loop, colisiones, etc

  gameOver = () => {
    if (this.myShip.life < 1) {
      this.isGameOn = false;
      myMusic.pause();
      canvas.style.display = "none";
      gameOverScreen.style.display = "flex";
    }
  };

  myShipShoot = () => {
    this.bulletsMyShipArr.push(new Bullet(this.myShip, "up"));
  };

  collisionControl = (spaceShip, bulletsArr) => {
    //console.log("spaceship", spaceShip.x, spaceShip.y, spaceShip.w, spaceShip.h)

    bulletsArr.forEach((bullet) => {
      if (
        bullet.visible &&
        spaceShip.visible &&
        spaceShip.x < bullet.x + bullet.radius &&
        spaceShip.x + spaceShip.w > bullet.x - bullet.radius &&
        spaceShip.y < bullet.y + bullet.radius &&
        spaceShip.h + spaceShip.y > bullet.y - bullet.radius
      ) {
        // collision detected!
        if (bullet.superBeam === false) bullet.visible = false;
        //console.log("Collision");

        if (bullet.color !== spaceShip.color) {
          spaceShip.life -= 1;
          //if enemy hitted
          if(spaceShip.superbeamWhite === undefined) {
            this.score++
            this.killedShips++
          }

          //spaceShip.visible=false;
          if (spaceShip.life < 1) spaceShip.visible = false;
        }
        //in case it's our spaceship, check for charging superbeam
        else if (
           spaceShip.superBeamWhite !== undefined ||
           spaceShip.superBeamBlack !== undefined
        ) {
          this.score++;//absorbing balls
          this.collectedEnergy++;
          if (bullet.color === "white") spaceShip.superBeamWhite++;
          else spaceShip.superBeamBlack++;
        }

      }
    });
  };
  colisionSpaceShipsControl = () => {
    this.shipsArr.forEach((ship) => {
      if (
        ship.visible &&
        this.myShip.x < ship.x + ship.w &&
        this.myShip.x + this.myShip.w > ship.x &&
        this.myShip.y < ship.y + ship.h &&
        this.myShip.h + this.myShip.y > ship.y
      ) {
        // collision detected!
        this.myShip.life--;
        ship.visible = false;
        //console.log("myship collided");
      }
    });
  };

  loadLevel = (level) => {
    if (this.shipsArr.length === 0 /*&& level < this.gameLevels.length*/) {
      //this.shipsArr=this.gameLevels[level].slice(0)
    /*
      this.shipsArr = this.gameLevels[level].map((a) => {
        return { ...a };
      });
*/
      //this.shipsArr=JSON.parse(JSON.stringify(this.gameLevels[level]))

      //this.shipsArr=structuredClone(this.gameLevels[level]);
      //this.shipsArr=deepCopy(this.gameLevels[level])

      if(level===1){
          this.shipsArr=[
            new Ship(40, 40, "black", "LeftRightLoop", true, "down"),
            new Ship(100, 40, "white", "LeftRightLoop", true, "down"),
            new Ship(160, 40, "black", "LeftRightLoop", true, "down"),
            new Ship(220, 40, "white", "LeftRightLoop", true, "down"),
          ]
      }
      else if (level===2){
        this.shipsArr=[
          new Ship(150, -40, "black", "UpDown", true, "left"),
          new Ship(canvas.width-190, -40, "white", "UpDown", true, "right"),
          
          new Ship(150, 0, "white", "UpDown", true, "left"),
          new Ship(canvas.width-190, 0, "black", "UpDown", true, "right"),

          new Ship(150, 40, "white", "UpDown", true, "left"),
          new Ship(canvas.width-190, 40, "black", "UpDown", true, "right"),
          
          new Ship(150, 80, "black", "UpDown", true, "left"),
          new Ship(canvas.width-190, 80, "white", "UpDown", true, "right"),
          
          new Ship(150, 120, "black", "UpDown", true, "left"),
          new Ship(canvas.width-190, 120, "white", "UpDown", true, "right"),
          
          new Ship(150, 160, "white", "UpDown", true, "left"),
          new Ship(canvas.width-190, 160, "black", "UpDown", true, "right"),
          //this.level===1
        ]
    }
      if(level===3){
        this.shipsArr=[
          new Ship(40, 40, "black", "LeftRightLoop", true, "down"),
          new Ship(100, 40, "white", "LeftRightLoop", true, "down"),
          new Ship(160, 40, "black", "LeftRightLoop", true, "down"),
          new Ship(220, 40, "white", "LeftRightLoop", true, "down"),

          new Ship(40, 100, "black", "LeftRightLoop", true, "down"),
            new Ship(100, 100, "white", "LeftRightLoop", true, "down"),
            new Ship(160, 100, "black", "LeftRightLoop", true, "down"),
            new Ship(220, 100, "white", "LeftRightLoop", true, "down"),
        ]
    }
      else if (level===4){
        this.shipsArr=[
          new Ship(40, 40, "black", "UpDown", true, "right"),
          new Ship(40, -60, "white", "UpDown", true, "right"),

          new Ship(canvas.width-80, 40, "black", "UpDown", true, "left"),
          new Ship(canvas.width-80, -60, "white", "UpDown", true, "left"),

          new Ship(40, 80, "black", "UpDown", true, "right"),
          new Ship(40, 130, "white", "UpDown", true, "right"),

          new Ship(canvas.width-80, 80, "black", "UpDown", true, "left"),
          new Ship(canvas.width-80, 130, "white", "UpDown", true, "left")
          //this.level===1
        ]
    }
      else if (level===5){
          this.shipsArr=[
            new Ship(40, 40, "black", "LeftRightLoop", true, "down"),
            new Ship(40, 100, "black", "LeftRightLoop", true, "down"),

            new Ship(80, 100, "white", "LeftRightLoop", true, "down"),
            new Ship(80, 40, "white", "LeftRightLoop", true, "down"),
            
            new Ship(120, 40, "black", "LeftRightLoop", true, "down"),
            new Ship(120, 100, "black", "LeftRightLoop", true, "down"),

            new Ship(160, 40, "white", "LeftRightLoop", true, "down"),
            new Ship(160, 100, "white", "LeftRightLoop", true, "down"),

            new Ship(200, 40, "black", "LeftRightLoop", true, "down"),
            new Ship(200, 100, "black", "LeftRightLoop", true, "down"),

            new Ship(240, 40, "white", "LeftRightLoop", true, "down"),
            new Ship(240, 100, "white", "LeftRightLoop", true, "down"),

            new Ship(280, 40, "black", "LeftRightLoop", true, "down"),
            new Ship(280, 100, "black", "LeftRightLoop", true, "down"),

            new Ship(320, 40, "white", "LeftRightLoop", true, "down"),

            new Ship(320, 100, "white", "LeftRightLoop", true, "down"),

          ]
      }
      else if (level===6){
        this.shipsArr=[
          new Ship(40, 40, "black", "UpDown", true, "right"),
          new Ship(40, -60, "black", "UpDown", true, "right"),

          new Ship(canvas.width-80, 40, "white", "UpDown", true, "left"),
          new Ship(canvas.width-80, -60, "white", "UpDown", true, "left"),

          new Ship(40, 80, "black", "UpDown", true, "right"),
          new Ship(40, 130, "black", "UpDown", true, "right"),

          new Ship(canvas.width-80, 80, "white", "UpDown", true, "left"),
          new Ship(canvas.width-80, 130, "white", "UpDown", true, "left"),
          
          new Ship(40, 40, "black", "LeftRightLoop", true, "down"),
          new Ship(100, 40, "white", "LeftRightLoop", true, "down"),
          new Ship(160, 40, "black", "LeftRightLoop", true, "down"),
          new Ship(220, 40, "white", "LeftRightLoop", true, "down"),

          new Ship(40, 100, "black", "LeftRightLoop", true, "down"),
            new Ship(100, 100, "white", "LeftRightLoop", true, "down"),
            new Ship(160, 100, "black", "LeftRightLoop", true, "down"),
            new Ship(220, 100, "white", "LeftRightLoop", true, "down"),
        ]
    }

      
      //console.log("lvl:", level);
      //this.shipsArr=this.gameLevels[level].map(a => {return {...a}})
      this.level++;
      if (this.level>6){
        this.level=1;
        levelSpeed*=1.15;
      }
      //if (this.level===this.gameLevels.length) this.level=0
    } 
      //this.shipsArr=this.gameLevels[level].slice()
      //console.log(this.gameLevels)
    
  };

  gameLoop = (timeStamp) => {
    // 1. borrar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. acciones o movimiento de los elementos
    this.gameOver();
    this.loadLevel(this.level);

    //this.score = this.score + 1 / 60;
    scoreDOM.innerText = this.score;
    killedShipsDOM.innerText = this.killedShips;
    collectedEnergyDOM.innerText=this.collectedEnergy;

    this.shipsArr.forEach((ship, index) => {
      //this.bulletsEnemyArr.push(new Bullet(ship.x+ship.w/2, ship.y, "down", ship.color))
      ship.deleteBullets();

      if (Math.floor(Math.random() * 90) === 4) {
      //if ((timeStamp * 10 + index) % 2 === 0) {
        ship.shoot();
      }
      ship.move();
      ship.moveBullets();
    });

    this.myShip.moveBullets();

    this.shipsArr.forEach((ship) => {
      this.collisionControl(this.myShip, ship.bullets);
      this.collisionControl(ship, this.myShip.bullets);
    });
    this.colisionSpaceShipsControl();

    this.myShip.deleteBullets();

    this.shipsArr.forEach((ship, index) => {
      if (!ship.visible && ship.bullets.length === 0)
        this.shipsArr.splice(index, 1);
    });

    // 3. dibujar los elementos
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);

    this.myShip.drawBullets();
    //this.ship.drawShip()
    this.myShip.drawLife();
    this.myShip.drawBeamsCharge();
    this.myShip.draw();

    this.shipsArr.forEach((ship) => {
      ship.draw();
      ship.drawBullets();
    });

    // 4. control y recursion
    if (this.isGameOn) requestAnimationFrame(this.gameLoop);
  };
}