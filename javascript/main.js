// * GLOBAL VARIABLES
console.log("probando")
const startBtn=document.querySelector("#start-btn")
const startScreen=document.querySelector("#splash-screen")
const canvas = document.querySelector("#my-canvas")
const ctx = canvas.getContext("2d")
const gameOverScreen=document.querySelector("#gameover-screen")
const restartBtn=document.querySelector("#restart-btn")
let game;
const scoreDOM=document.querySelector("#score")


// * STATE MANAGEMENT FUNCTIONS
const startGame = () => {
    console.log("iniciando juego")
    startScreen.style.display="none"
    canvas.style.display="block"
    gameOverScreen.style.display="none"

    //empezar nuestra logica de juego
    //pero al trabajar con clases, nuestro juego sera toda una nueva clase
    //o sea, vamos a crear un nuevo objeto de lo que sera la clase Game
    game = new Game();
    console.log(game)

    window.addEventListener("keydown", keyPress)
    game.gameLoop();
}



const keyPress = (event) =>{
    if (event.code==="Space"){
        console.log("apretando barra espacio")
        game.myShipShoot();
    }
    else if(event.ctrlKey){
        game.myShip.switchColor();
        console.log("switch")
    }
    else if(event.code==="ArrowLeft"){
        game.myShip.moveLeft();
    }
    else if(event.code==="ArrowRight"){
        game.myShip.moveRight();
    }
    else if(event.code==="ArrowUp"){
        game.myShip.moveUp();
    }
    else if(event.code==="ArrowDown"){
        game.myShip.moveDown();
    }
}

// * ADD EVENT LISTENERS

startBtn.addEventListener("click", startGame)
restartBtn.addEventListener("click", startGame)




