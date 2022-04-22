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
        this.ship = new Ship(40, 40);
        this.bulletArr = []
        //this.shipArr = [new Ship(40, 50)]
        
        this.isGameOn=true
        this.score=0;
    }
    //todos los metodos que regulan nuestro juego, loop, colisiones, etc

    myShipShoot = () => {
        this.bulletArr.push(new Bullet(this.myShip.x+this.myShip.w/2, this.myShip.y, "up", this.myShip.color))
    }
    deleteBullets = () => {
        if(this.bulletArr[0].y-this.bulletArr[0].h<0) this.bulletArr.shift()

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
        //metodo del pollito
        this.ship.move(secondsPassed);
        
        this.score=this.score+1/60
        scoreDOM.innerText=Math.floor(this.score)

        this.bulletArr.forEach((bullet) => {
            bullet.move()
        })
        //this.deleteBullets()

      

        // 3. dibujar los elementos
        ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height)
        this.myShip.drawShip()
        this.ship.drawShip()


        
        //this.pipe.drawPipe()
        this.bulletArr.forEach(bullet => bullet.draw())

        // 4. control y recursion
        if(this.isGameOn) requestAnimationFrame(this.gameLoop)
    }




}