class Bullet{
    constructor(x, y, direction, color){
        this.x=x;
        this.y=y;
        this.h=10
        this.speed=1
        this.direction=direction;
        this.color=color;
    }
    
    draw(){
        ctx.beginPath();
        if(this.color==="white") ctx.fillStyle = "#FFF";
        else ctx.fillStyle = "#000000"
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.fill()
        ctx.stroke();
    }

    move(){
        if(this.direction==="up"){
            this.y=this.y-this.speed

        }
        else {
            this.y=this.y+this.speed

        }
        
    }

}