class MyShip {
    constructor() {
        this.w=50;
        this.h=40;
        this.x=(canvas.width-this.w)/2;
        this.y=canvas.height-this.h;
        

        this.img = new Image();
        this.img.src = "./images/nave.svg"
        this.speed=20;
        //this.jumpSpeed=30

        //true = black, false = white
        this.color="black"
        this.bullets = []
    }

    drawShip = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        console.log("canvas: "+canvas.height)
    }
    drawBullets = () => {
        this.bullets.forEach(bullet => {
            bullet.draw()
            bullet.move()
        })
    }
    draw = () => {
        this.drawShip()
        this.drawBullets()

    }

    switchColor = () => {
        if(this.color==="black"){
            this.color="white"
            this.img.src="./images/naveWhite.svg"
            
        }
        else{
            this.color="black"
            this.img.src = "./images/nave.svg"
        }
    }

    moveLeft = () => {
        if(this.x-this.speed>0)
            this.x=this.x-this.speed
        else this.x=0
    }
    moveRight = () => {
        if(this.x+this.speed<canvas.width-this.w)
            this.x=this.x+this.speed
        else this.x=canvas.width-this.w
    }
    moveUp = () => {
        if(this.y-this.speed>0)
            this.y-=this.speed
        else this.y=0
    }
    moveDown = () => {
        if(this.y+this.speed<canvas.height-this.h)
            this.y+=this.speed
        else this.y=canvas.height-this.h
    }

    shoot = () => {
        this.bullets.push(new Bullet(this, "up"))
        console.log("my bullet x:",this.bullets[0].x)
    }
    /*
    shoot = () => {
        game.bulletsArr.push(new Bullet(this.x, this.y, "up"))
    }
    */
}