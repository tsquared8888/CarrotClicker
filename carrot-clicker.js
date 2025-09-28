/************* VARIABLES *************/
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let carrots = 0;
GAME_WIDTH = 400;
GAME_HEIGHT = 300;
let lastTime = 0;

// Carrot generator variables
let carrotsPerClick = {
    count: 1, // 
    cost: 20,
    costIncrement: 0.2,
};
let autoClicker = {
    count: 0,
    cost: 40,
    costIncrement: 10
};
let farmer = {
    count: 0,
    cost: 200,
    costIncrement: 5
};
let factory = {
    count: 0,
    cost: 800,
    costIncrement: 2
};

// Costs for adding generators
let autoClickCost = 40;
let farmerCost = 200;
let factoryCost = 800;

// Rates
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
    carrots += carrotsPerClick.count;
});

// carrots per click upgrade button
const carrotsPerClickCostButton = document.createElement('button');
carrotsPerClickCostButton.innerText = "Carrots Per Click = " + carrotsPerClick.cost;
document.body.appendChild(carrotsPerClickCostButton);
carrotsPerClickCostButton.addEventListener("click", () => {
    //carrotsPerClickCost = 
    buyUpgrade(carrotsPerClick);
    //carrotsPerClick += 1;
    carrotsPerClickCostButton.innerText = "Carrots Per Click = " + carrotsPerClick.cost;
});

// add auto clickers upgrade button
const autoClickCostButton = document.createElement('button');
autoClickCostButton.innerText = "Add Auto Clicker = " + autoClicker.cost;
document.body.appendChild(autoClickCostButton);
autoClickCostButton.addEventListener("click", () => {
    //autoClickCost = 
    buyUpgrade(autoClicker);
    //autoClickers += 1;
    autoClickCostButton.innerText = "Add Auto Clicker = " + autoClicker.cost;
    //console.log("auto clickers: " + autoClickers);

});

// add farmers upgrade button
const farmerCostButton = document.createElement('button');
farmerCostButton.innerText = "Add Farmer = " + farmer.cost;
document.body.appendChild(farmerCostButton);
farmerCostButton.addEventListener("click", () => {
    //farmerCost = 
    buyUpgrade(farmer);
    //farmers += 1;
    farmerCostButton.innerText = "Add Farmer = " + farmer.cost;
    //console.log("farmers: " + farmers);
});

// add factories upgrade button
const factoryCostButton = document.createElement('button');
factoryCostButton.innerText = "Add Factory = " + factory.cost;
document.body.appendChild(factoryCostButton);
factoryCostButton.addEventListener("click", () => {
    //factoryCost = 
    buyUpgrade(factory);
    //factories += 1;
    factoryCostButton.innerText = "Add Factory = " + factory.cost;
    //console.log("factories: " + factories);
});


/************* CREATION FUNCTIONS *************/

/************* SUPPORT FUNCTIONS *************/

// Handles removing carrots and increasing cost of upgrades.
// Lower cost Modifier = higher rate of price increase
function buyUpgrade(generator) {
    if (carrots >= generator.cost) {
        carrots -= generator.cost;
        generator.cost += Math.trunc(generator.cost/generator.costIncrement);
        generator.count += 1;
        //console.log(cost);
    }
}

function addCarrots(deltaTime) {
    carrots += autoClicker.count * autoClicker.rate * carrotsPerClick * deltaTime;
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
    //addCarrots(deltaTime);
    document.getElementById('ui').innerHTML = Math.trunc(carrots) + " carrots | " + carrotsPerClick.count + " carrots per click | " + autoClicker.count + " auto clickers | " + farmer.count + " farmers | " + factory.count + " factories";
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