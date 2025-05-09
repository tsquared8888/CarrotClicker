/************* VARIABLES *************/
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let carrots = 0;
GAME_WIDTH = 400;
GAME_HEIGHT = 300;
let lastTime = 0;

// Number of generators
let autoClickers = 0;
let farmers = 0;
let factories = 0;

// Costs for adding generators
let carrotsPerClickCost = 20;
let autoClickCost = 40;
let farmerCost = 200;
let factoryCost = 800;

// Rates
let carrotsPerClick = 1; // add 1 each upgrade
let autoClickRate = 0.01; // add 0.01 each upgrade
let farmerRate = 5; // add 5 each upgrade
let factoryRate = 25 // add 25 each upgrade

/************* BUTTONS *************/
// Need buttons outside input or it gets triggered indefinitely

// carrot button
const carrotButton = document.createElement('button');
carrotButton.innerText = "Carrot";
document.body.appendChild(carrotButton);
carrotButton.addEventListener("click", () => {
    carrots += carrotsPerClick;
});

const carrotsPerClickCostButton = document.createElement('button');
carrotsPerClickCostButton.innerText = "Carrots Per Click = " + carrotsPerClickCost;
document.body.appendChild(carrotsPerClickCostButton);
carrotsPerClickCostButton.addEventListener("click", () => {
    if (carrots >= carrotsPerClickCost) {
        carrots -= carrotsPerClickCost;
        carrotsPerClick += 1;
        carrotsPerClickCost *= 4;
        carrotsPerClickCostButton.innerText = "Carrots Per Click = " + carrotsPerClickCost;
    }
});

const autoClickCostButton = document.createElement('button');
autoClickCostButton.innerText = "Carrots Per Click = " + autoClickCost;
document.body.appendChild(autoClickCostButton);
autoClickCostButton.addEventListener("click", () => {
    if (carrots >= autoClickCost) {
        carrots -= autoClickCost;
        autoClickers += 1;
        autoClickCost +=  (2 * autoClickCost);
        autoClickCostButton.innerText = "Add Auto Clicker = " + autoClickCost;
        console.log("auto clickers: " + autoClickers);
    }
});


/************* CREATION FUNCTIONS *************/

/************* SUPPORT FUNCTIONS *************/
function addCarrots(deltaTime) {
    carrots += autoClickers * autoClickRate * carrotsPerClick * deltaTime;
}

/************* MAIN FUNCTIONS *************/

function input() {
    
    document.addEventListener("keydown", (event)=> {

    });
    
    document.addEventListener("keyup", (event)=> {
    
    });
}

function update(deltaTime) {
    addCarrots(deltaTime);
    document.getElementById('ui').innerHTML = Math.trunc(carrots) + " carrots";
}

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = 'white';
}

function gameLoop(timestamp) {
    var deltaTime = (timestamp - lastTime)/100; 
    input();
    update(deltaTime);
    draw();
    lastTime = timestamp;
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);