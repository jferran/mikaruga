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
    }

    drawShip = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        console.log("canvas: "+canvas.height)
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
        this.x=this.x-this.speed
    }
    moveRight = () => {
        this.x=this.x+this.speed
    }
    /*
    shoot = () => {
        game.bulletsArr.push(new Bullet(this.x, this.y, "up"))
    }
    */
}