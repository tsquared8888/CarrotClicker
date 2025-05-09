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
let autoClickCost = 40;
let farmerCost = 200;
let factoryCost = 800;

// Rates
let carrotsPerClick = 1; // add 1 each upgrade
let autoClickRate = 0.01; // add 0.01 each upgrade
let farmerRate = 0.1; // add 1 each upgrade
let factoryRate = 1 // add 5 each upgrade

// Rates Costs
let carrotsPerClickCost = 20;
let autoClickRateCost = 100;
let farmerRateCost = 500;
let factoryRateCost = 2500

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
        carrotsPerClickCost *= 5;
        carrotsPerClickCostButton.innerText = "Carrots Per Click = " + carrotsPerClickCost;
    }
});

const autoClickCostButton = document.createElement('button');
autoClickCostButton.innerText = "Add Auto Clicker = " + autoClickCost;
document.body.appendChild(autoClickCostButton);
autoClickCostButton.addEventListener("click", () => {
    if (carrots >= autoClickCost) {
        carrots -= autoClickCost;
        autoClickers += 1;
        autoClickCost += Math.trunc(autoClickCost/10);
        autoClickCostButton.innerText = "Add Auto Clicker = " + autoClickCost;
        console.log("auto clickers: " + autoClickers);
    }
});

const farmerCostButton = document.createElement('button');
farmerCostButton.innerText = "Add Farmer = " + farmerCost;
document.body.appendChild(farmerCostButton);
farmerCostButton.addEventListener("click", () => {
    if (carrots >= farmerCost) {
        carrots -= farmerCost;
        farmers += 1;
        farmerCost += Math.trunc(farmerCost/5);
        farmerCostButton.innerText = "Add Farmer = " + farmerCost;
        console.log("farmers: " + farmers);
    }
});

const factoryCostButton = document.createElement('button');
factoryCostButton.innerText = "Add Factory = " + factoryCost;
document.body.appendChild(factoryCostButton);
factoryCostButton.addEventListener("click", () => {
    if (carrots >= factoryCost) {
        carrots -= factoryCost;
        factories += 1;
        factoryCost += Math.trunc(factoryCost/2);
        factoryCostButton.innerText = "Add Factory = " + factoryCost;
        console.log("factories: " + factories);
    }
});


/************* CREATION FUNCTIONS *************/

/************* SUPPORT FUNCTIONS *************/

function addCarrots(deltaTime) {
    carrots += autoClickers * autoClickRate * carrotsPerClick * deltaTime;
    carrots += farmers * farmerRate * deltaTime;
    carrots += factories * factoryRate * deltaTime;
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