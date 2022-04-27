class MyShip {
    constructor() {
        this.w=50;
        this.h=40;
        this.x=(canvas.width-this.w)/2;
        this.y=canvas.height-this.h;
        

        this.img = new Image();
        this.img.src = "./images/nave.svg"
        this.speed=20;
        this.life=20
        this.superBeamWhite=0
        this.superBeamBlack=0


        this.visible=true

        //true = black, false = white
        this.color="black"
        this.bullets = []
    }

    drawLife = () => {
        this.heart = new Image();
        this.heart.src = "/images/1646656079PixelArt-Heart-1.svg"

        //ctx.fillStyle = "blue";
        //ctx.drawImage(this.heart, 10, 10, 20, 20)
        let offset=10
        for (let i=0; i<this.life; i++){
            //ctx.fillRect(i+10, 10, 11, 20);
            ctx.drawImage(this.heart, i+10+offset, 10, 20, 20)
            offset+=20
        }
    }

    drawBeamsCharge = () => {
        ctx.fillStyle = "black";
        for (let i=0, offset=10; i<this.superBeamBlack; i++, offset+=20){
            ctx.fillRect(i+10+offset, 35, 11, 20);
        }
        ctx.fillStyle = "white";
        for (let i=0, offset=10; i<this.superBeamWhite; i++, offset+=20){
            ctx.fillRect(i+10+offset, 60, 11, 20);
        }
    }

    drawShip = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        //console.log("canvas: "+canvas.height)
    }
    drawBullets = () => {
        this.bullets.forEach(bullet => {
            bullet.draw()
            //bullet.move()
        })
    }
    moveBullets = () => {
        this.bullets.forEach(bullet => {
            bullet.move()
        })
    }
/*
    move = () => {
        this.drawShip()
        this.drawBullets()
    }
*/
    draw = () => {
        this.drawShip()
        //this.drawBullets()
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
        //console.log("my bullet x:",this.bullets[0].x)
    }
    shootSuperBeam = () => {
        this.bullets.push(new Bullet(this, "up", true))
        if(this.color==="white")this.superBeamWhite=0
        else this.superBeamBlack=0
    }
    deleteBullets = () => {
        this.bullets.forEach((bullet, index)=>{
            if (!bullet.visible) this.bullets.slice(index, 1)
        })
    }
    /*
    shoot = () => {
        game.bulletsArr.push(new Bullet(this.x, this.y, "up"))
    }
    */
}