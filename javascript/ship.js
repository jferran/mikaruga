class Ship {
    constructor(x, y, color, movePattern, loop) {

        this.x=x;
        this.y=y;
        this.w=50;
        this.h=40;

        this.img = new Image();
        this.img.src = "./images/nave.svg"
        this.speed=1;
        this.life=1;

        this.color=color
        this.direction="right"
        this.movePattern=movePattern;
        this.loop=loop

        this.visible = true
        this.bullets = []
    }


    //

    drawShip = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
    drawBullets = () => {
        this.bullets.forEach(bullet => {
            //bullet.move()
            bullet.draw()
        })
    }
    moveBullets = () => {
        this.bullets.forEach(bullet => {
            bullet.move()
        })
    }
    draw = () => {
        if(this.visible)this.drawShip()
        //this.drawBullets()
    }
    shoot = () => {
        if(this.life>0)this.bullets.push(new Bullet(this, "down"))
        console.log("enemy bullet 0 x:",this.bullets[0].x)
    }
    deleteBullets = () => {
        this.bullets.forEach((bullet, index)=>{
            if (!bullet.visible) this.bullets.slice(index, 1)

        })
    }

    move = (secondsPassed) => {
        //console.log("pollito bajando");
        if(this.movePattern==="LeftRightLoop"){
            if(this.direction==="right"){
                if((this.x+ this.speed)<canvas.width-this.w) {
                    this.x=this.x+ this.speed
                }
                else if (this.loop){
                    this.x=canvas.width-this.w
                    this.direction="left"
                }
                else this.visible=false
            }
            else if (this.direction==="left"){
                if((this.x- this.speed)>0) {
                    this.x=this.x- this.speed
                }
                else if (this.loop){
                    this.x=0
                    this.direction="right"
                }
                else this.visible=false;
            }
        }

    }

}