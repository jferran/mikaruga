// * GLOBAL VARIABLES
console.log("probando")
const startBtn=document.querySelector("#start-btn")
const startScreen=document.querySelector("#splash-screen")
const canvas = document.querySelector("#my-canvas")
const ctx = canvas.getContext("2d")
const gameOverScreen=document.querySelector("#gameover-screen")
const restartBtn=document.querySelector("#restart-btn")
let game;
const killedShipsDOM=document.querySelector("#killed-ships")
const collectedEnergyDOM=document.querySelector("#collected-energy")
const scoreDOM=document.querySelector("#score")

let mySound;
let myMusic;


  //https://stackoverflow.com/questions/20935031/game-development-restart-the-soundaudio-element-before-it-ended-playing

// * STATE MANAGEMENT FUNCTIONS
const startGame = () => {
    //console.log("iniciando juego")
    startScreen.style.display="none"
    canvas.style.display="block"
    gameOverScreen.style.display="none"

    myMusic = new Audio("./music/01 - Cirrus (Prologue).mp3");
    
    myMusic.volume=0.01
    myMusic.play();
    
    
    //myGameArea.start();

    //empezar nuestra logica de juego
    //pero al trabajar con clases, nuestro juego sera toda una nueva clase
    //o sea, vamos a crear un nuevo objeto de lo que sera la clase Game
    game = new Game();
    //console.log(game)

    window.addEventListener("keydown", keyPress)



    game.gameLoop();
}



const keyPress = (event) =>{
    if (event.code==="Space"){
        game.myShip.shoot();
    }
    else if (event.shiftKey){
        game.myShip.shootSuperBeam();
    }
    else if(event.ctrlKey){
        game.myShip.switchColor();
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