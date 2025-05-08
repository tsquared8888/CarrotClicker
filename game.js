/************* VARIABLES *************/
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let carrots = 0;
GAME_WIDTH = 400;
GAME_HEIGHT = 300;

/************* BUTTONS *************/
// Need buttons outside input or it gets triggered indefinitely

// carrot button
const carrotButton = document.createElement('button');
carrotButton.innerText = "Click me!";
document.body.appendChild(carrotButton);
carrotButton.addEventListener("click", () => {
    carrots += 1;
    console.log("You have " + carrots + " carrots");
});


/************* CREATION FUNCTIONS *************/

/************* SUPPORT FUNCTIONS *************/

/************* MAIN FUNCTIONS *************/

function input() {
    
    document.addEventListener("keydown", (event)=> {

    });
    
    document.addEventListener("keyup", (event)=> {
    
    });
}

function update(deltaTime) {

}

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = 'white';
}

function gameLoop(timestamp) {
    lastTime = timestamp;
    var deltaTime = (timestamp - lastTime)/100; 
    input();
    update(deltaTime);
    draw();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);