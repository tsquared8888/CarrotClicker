/************* VARIABLES *************/
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
GAME_WIDTH = 400;
GAME_HEIGHT = 300;
const CARROT_SPRITE = new Image();
CARROT_SPRITE.src = 'carrot.png';
let carrots = 0;
let lastTime = 0;

// Carrot generator variables
let carrotsPerClick = {
    count: 1, // number of carrots per click
    cost: 20,
    costIncrement: 0.2,
};
let autoClicker = {
    count: 0,
    cost: 40,
    costIncrement: 10,
    rate: 0.01
};
let farmer = {
    count: 0,
    cost: 200,
    costIncrement: 5,
    rate: 0.1
};
let factory = {
    count: 0,
    cost: 800,
    costIncrement: 2,
    rate: 1
};

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
    buyUpgrade(carrotsPerClick);
    carrotsPerClickCostButton.innerText = "Carrots Per Click = " + carrotsPerClick.cost;
});

// add auto clickers upgrade button
const autoClickCostButton = document.createElement('button');
autoClickCostButton.innerText = "Add Auto Clicker = " + autoClicker.cost;
document.body.appendChild(autoClickCostButton);
autoClickCostButton.addEventListener("click", () => {
    buyUpgrade(autoClicker);
    autoClickCostButton.innerText = "Add Auto Clicker = " + autoClicker.cost;

});

// add farmers upgrade button
const farmerCostButton = document.createElement('button');
farmerCostButton.innerText = "Add Farmer = " + farmer.cost;
document.body.appendChild(farmerCostButton);
farmerCostButton.addEventListener("click", () => {
    buyUpgrade(farmer);
    farmerCostButton.innerText = "Add Farmer = " + farmer.cost;
});

// add factories upgrade button
const factoryCostButton = document.createElement('button');
factoryCostButton.innerText = "Add Factory = " + factory.cost;
document.body.appendChild(factoryCostButton);
factoryCostButton.addEventListener("click", () => {
    buyUpgrade(factory);
    factoryCostButton.innerText = "Add Factory = " + factory.cost;
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
    }
}

function addCarrots(deltaTime) {
    carrots += autoClicker.count * autoClicker.rate * carrotsPerClick.count * deltaTime;
    carrots += farmer.count * farmer.rate * deltaTime;
    carrots += factory.count * factory.rate * deltaTime;
}

// draws all buttons in correct positions
function drawButtons() {
    // Main carrot button
    ctx.fillRect(5, 5, 245, 195);
    ctx.drawImage(CARROT_SPRITE, 40, 20);
    
    // Upgrade buttons
    ctx.fillRect(255, 5, 140, 45);
    ctx.fillRect(255, 55, 140, 45);
    ctx.fillRect(255, 105, 140, 45);
    ctx.fillRect(255, 155, 140, 45);
}

// add text on top of buttons and in info bar at a bottom
function drawText() {

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
    document.getElementById('ui').innerHTML = Math.trunc(carrots) + " carrots | " + carrotsPerClick.count + " carrots per click | " + autoClicker.count + " auto clickers | " + farmer.count + " farmers | " + factory.count + " factories";
}

function draw() {
    ctx.fillStyle = 'orange';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = 'green';
    drawButtons();
    ctx.fillStyle = 'grey';
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