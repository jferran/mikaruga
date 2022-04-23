console.log("desde el js Game")
let secondsPassed;
let oldTimeStamp = +new Date() - (60*5);
let fps;
let frame;
let posX = 0, posY = 0;
let timePassed = 0;
// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe
// https://javascript.tutorialink.com/adding-a-number-to-number-results-in-nan-in-my-program-why/

class Game {
    
    constructor(){
        //todas nuestras propiedades del juego
        //1. el fondo

        this.bg = new Image()
        this.bg.src = "./images/bg.png" //quizas lo modifiquemos luego

        this.myShip = new MyShip();
        //this.ship = new Ship(40, 40, "black");
        this.shipsArr = [new Ship(40, 40, "black"), new Ship(100, 40, "white"), new Ship(160, 40, "black"), new Ship(220, 40, "white")]
        this.bulletsEnemyArr = []
        this.bulletsMyShipArr = []
        //this.shipArr = [new Ship(40, 50)]
        
        this.isGameOn=true
        this.score=0;
    }
    //todos los metodos que regulan nuestro juego, loop, colisiones, etc

    myShipShoot = () => {
        this.bulletsMyShipArr.push(new Bullet(this.myShip, "up"))
    }
    deleteBulletsShip = () => {
        if(this.bulletsEnemyArr.length>0 && this.bulletsEnemyArr[0].y>canvas.height) this.bulletsEnemyArr.shift()
        if(this.bulletsMyShipArr.length>0 && this.bulletsMyShipArr[0].y+this.bulletsMyShipArr[0].h<0) this.bulletsMyShipArr.shift()
    }

    collisionControl = (spaceShip, bulletsArr) => {
        //console.log("spaceship", spaceShip.x, spaceShip.y, spaceShip.w, spaceShip.h)

        bulletsArr.forEach((bullet, index)=>{
            //console.log("bullet", bullet.x, bullet.y, 20, 20)
            if (bullet.visible && bullet.color!==spaceShip.color &&
                spaceShip.x < bullet.x + bullet.radius &&
                spaceShip.x + spaceShip.w > bullet.x - bullet.radius &&
                spaceShip.y < bullet.y + bullet.radius &&
                spaceShip.h + spaceShip.y > bullet.y - bullet.radius ) {
                // collision detected!
                bullet.visible=false;
                console.log("Collision");
               
                spaceShip.life-=1
                if (spaceShip.life<1) spaceShip.visible=false
                
               
            } else {
                //console.log("no collision")
                // no collision
                //this.color("blue");
            }

/*
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.h + rect1.y > rect2.y) {
        // collision detected!
        this.color("green");
    } 


*/


        })
    }

    gameLoop = (timeStamp) => {
        //console.log("juego andando")
        //console.log(timeStamp)
            
        // Calculate the number of seconds passed since the last frame
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;


        // Calculate fps
        fps = Math.round(1 / secondsPassed);

        // 1. borrar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)


        
        // 2. acciones o movimiento de los elementos
        
        //this.ship.move(secondsPassed);
        
        this.score=this.score+1/60
        scoreDOM.innerText=Math.floor(this.score)

        this.shipsArr.forEach((ship, index) => {
            
            //this.bulletsEnemyArr.push(new Bullet(ship.x+ship.w/2, ship.y, "down", ship.color))
            ship.deleteBullets()

            if((timeStamp*10+index)%2===0){
                ship.shoot()
            }
                ship.move();
                ship.moveBullets()
        })
        this.myShip.moveBullets()


/*
        if(timeStamp*10%2===0)
        this.bulletsEnemyArr.push(new Bullet(this.ship.x+this.ship.w/2, this.ship.y, "down", this.ship.color))
  */      

        /*
        this.bulletsMyShipArr.forEach((bullet) => {
            bullet.move()
        })  

        this.bulletsEnemyArr.forEach((bullet) => {
            bullet.move()
        })
*/

//        this.collisionControl(this.myShip, this.bulletsEnemyArr)

//        this.shipsArr.forEach((enemy)=>this.collisionControl(enemy, this.bulletsMyShipArr))
        this.shipsArr.forEach((ship)=>{
            this.collisionControl(this.myShip, ship.bullets)
            this.collisionControl(ship, this.myShip.bullets)
        })


//        this.deleteBulletsShip()


        this.myShip.deleteBullets()

      

        // 3. dibujar los elementos
        ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height)
        this.myShip.draw()
        this.myShip.drawBullets()

        
        
        //this.ship.drawShip()

        this.shipsArr.forEach((ship) => {
            ship.draw();
            ship.drawBullets();
        })

        
        //this.pipe.drawPipe()
 //       this.bulletsEnemyArr.forEach(bullet => bullet.draw())
 //       this.bulletsMyShipArr.forEach(bullet => bullet.draw())

        // 4. control y recursion
        if(this.isGameOn) requestAnimationFrame(this.gameLoop)
    }




}