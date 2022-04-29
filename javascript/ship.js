class Ship {
    constructor(x, y, color, movePattern, loop, shootDirection) {

        this.x=x;
        this.y=y;
        this.w=50;
        this.h=40;

        this.img = new Image();
        if(color==="white"){
            this.img.src="./images/Space-Fighter-2.svg"
        }else {this.img.src= "./images/Space-Fighter-2-black.svg"}
         
        this.speed=2;
        this.life=1;

        this.color=color
        this.direction="right"
        this.movePattern=movePattern;
        this.moveX0X1
        if(this.movePattern==="LeftRightLoop"){
            this.moveX0X1=-1
        }
        //https://stackoverflow.com/questions/2922948/javascript-switch-vs-if-else-if-else
        switch (this.movePattern){
            case 'LeftRightLoop':
                this.moveX0X1=-1
                break
            case 'RightLeftLoop':
                this.moveX0X1=1
                break
        }

        this.loop=loop
        this.shootDirection=shootDirection
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
        //this.drawShip()
        //this.drawBullets()
    }
    shoot = () => {
        if(this.life>0 && this.visible)this.bullets.push(new Bullet(this, this.shootDirection))
        //console.log("enemy bullet 0 x:",this.bullets[0].x)
    }
    deleteBullets = () => {
        this.bullets.forEach((bullet, index)=>{
            
            if (!bullet.visible /*||
                
                bullet.y - bullet.radius > canvas.height ||
                bullet.y + bullet.radius < 0  ||
                bullet.x - bullet.radius > canvas.width ||
                bullet.x + bullet.radius < 0*/)

                this.bullets.splice(index, 1)
        })
    }

    move = (secondsPassed) => {
        //console.log("pollito bajando");
        // x0=0, x1=-1
        if(this.movePattern==="LeftRightLoop"){
            if(this.direction==="right"){
                if((this.x+ this.speed*levelSpeed)<canvas.width-this.w) {
                    this.x=this.x+ this.speed*levelSpeed
                }
                else if (this.loop){
                    this.x=canvas.width-this.w*levelSpeed
                    this.direction="left"
                }
                else this.visible=false
            }
            else if (this.direction==="left"){
                if((this.x- this.speed*levelSpeed)>0) {
                    this.x=this.x- this.speed*levelSpeed
                }
                //loop, change direction
                else if (this.loop){
                    this.x=0
                    this.direction="right"
                }
                else this.visible=false;
            }
        }
        else if (this.movePattern==="UpDown"){
            if((this.y - this.h + this.speed*levelSpeed)<canvas.height){
                this.y+= this.speed*levelSpeed/4
            }
            else this.visible=false;
        }

    }

}