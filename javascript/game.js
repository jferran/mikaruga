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
        
        this.shipsArr = [new Ship(40, 40, "black"), new Ship(100, 40, "white"), new Ship(160, 40, "black"), new Ship(220, 40, "white")]
        //this.bulletsEnemyArr = []
        //this.bulletsMyShipArr = []
        
        
        this.isGameOn=true
        this.score=0;
    }
    //todos los metodos que regulan nuestro juego, loop, colisiones, etc

    myShipShoot = () => {
        this.bulletsMyShipArr.push(new Bullet(this.myShip, "up"))
    }
    /*
    deleteBulletsShip = () => {
        if(this.bulletsEnemyArr.length>0 && this.bulletsEnemyArr[0].y>canvas.height) this.bulletsEnemyArr.shift()
        if(this.bulletsMyShipArr.length>0 && this.bulletsMyShipArr[0].y+this.bulletsMyShipArr[0].h<0) this.bulletsMyShipArr.shift()
    }*/

    collisionControl = (spaceShip, bulletsArr) => {
        //console.log("spaceship", spaceShip.x, spaceShip.y, spaceShip.w, spaceShip.h)

        bulletsArr.forEach((bullet)=>{
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
            }
        })
    }

    gameLoop = (timeStamp) => {
        //console.log(timeStamp)
            
        // Calculate the number of seconds passed since the last frame
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;


        // Calculate fps
        fps = Math.round(1 / secondsPassed);

        // 1. borrar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)


        
        // 2. acciones o movimiento de los elementos
        
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

        this.shipsArr.forEach((ship)=>{
            this.collisionControl(this.myShip, ship.bullets)
            this.collisionControl(ship, this.myShip.bullets)
        })

        this.myShip.deleteBullets()

      
        // 3. dibujar los elementos
        ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height)
        
        this.myShip.drawBullets()
        //this.ship.drawShip()
        this.myShip.draw()
        this.myShip.drawLife()

        this.shipsArr.forEach((ship) => {
            ship.draw();
            ship.drawBullets();
        })

        // 4. control y recursion
        if(this.isGameOn) requestAnimationFrame(this.gameLoop)
    }




}