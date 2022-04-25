class Bullet{
    constructor(ship, direction){
        this.x=ship.x+ship.w/2;
        this.y=ship.y;
        
        //this.h=10
        this.radius=10
        
        this.speed=1
        this.direction=direction;
        this.color=ship.color;
        this.visible=true;
    }
    
    draw(){
        if(this.visible){
            ctx.beginPath();
            if(this.color==="white") ctx.fillStyle = "#FFF";
            else ctx.fillStyle = "#000000"
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill()
            ctx.stroke();
        }
    }

    move(){
        if(this.direction==="up"){
            this.y=this.y-this.speed
        }
        else {
            this.y=this.y+this.speed
        }
        
        if (this.y - this.radius*2 > canvas.height ||
            this.y + this.radius*2 < 0 ||
            this.x - this.radius*2 > canvas.width ||
            this.x + this.radius*2 < 0
            ){
                this.visible=false}
    }

}