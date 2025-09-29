/************* VARIABLES *************/
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
GAME_WIDTH = 400;
GAME_HEIGHT = 300;
const CARROT_SPRITE = new Image();
CARROT_SPRITE.src = 'carrot.png';
// enum
const ButtonStates = Object.freeze({
    NULL: "null",
    MAIN: "main",
    CPC: "cpc",
    AUTO: "auto",
    FARMER: "farmer",
    FACTORY: "factory",
});
let buttonState = ButtonStates.NULL
let carrots = 0;
let lastTime = 0;
let clickReady = true;

// Carrot generator variables/buttons
let carrotMainButton = {
    x: 5,
    y: 5,
    w: 245,
    h: 195
};

let carrotsPerClick = {
    count: 1, // number of carrots per click
    cost: 20,
    costIncrement: 0.2,
    x: 255,
    y: 5,
    w: 140,
    h: 45
};
let autoClicker = {
    count: 0,
    cost: 40,
    costIncrement: 10,
    rate: 0.01,
    x: 255,
    y: 55,
    w: 140,
    h: 45
};
let farmer = {
    count: 0,
    cost: 200,
    costIncrement: 5,
    rate: 0.1,
    x: 255,
    y: 105,
    w: 140,
    h: 45
};
let factory = {
    count: 0,
    cost: 800,
    costIncrement: 2,
    rate: 1,
    x: 255,
    y: 155,
    w: 140,
    h: 45
};

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
    ctx.fillStyle = 'green';
    // Main carrot button
    ctx.fillRect(carrotMainButton.x, carrotMainButton.y, carrotMainButton.w, carrotMainButton.h);
    ctx.drawImage(CARROT_SPRITE, 40, 20);

    // Upgrade buttons
    ctx.fillRect(carrotsPerClick.x, carrotsPerClick.y, carrotsPerClick.w, carrotsPerClick.h);
    ctx.fillRect(autoClicker.x, autoClicker.y, autoClicker.w, autoClicker.h);
    ctx.fillRect(farmer.x, farmer.y, farmer.w, farmer.h);
    ctx.fillRect(factory.x, factory.y, factory.w, factory.h);

    if (clickReady) {
        ctx.fillStyle = "rgba(166, 216, 170, 0.56)";
    } else {
        ctx.fillStyle = "rgba(7, 78, 13, 0.56)";
    }
    switch (buttonState) {
        case ButtonStates.MAIN:
            ctx.fillRect(carrotMainButton.x, carrotMainButton.y, carrotMainButton.w, carrotMainButton.h);
            break;
        case ButtonStates.CPC:
            ctx.fillRect(carrotsPerClick.x, carrotsPerClick.y, carrotsPerClick.w, carrotsPerClick.h);
            break;
        case ButtonStates.AUTO:
            ctx.fillRect(autoClicker.x, autoClicker.y, autoClicker.w, autoClicker.h);
            break;
        case ButtonStates.FARMER:
            ctx.fillRect(farmer.x, farmer.y, farmer.w, farmer.h);
            break;
        case ButtonStates.FACTORY:
            ctx.fillRect(factory.x, factory.y, factory.w, factory.h);
            break;
    }
}

// add text on top of buttons and in info bar at a bottom
function drawText() {
    ctx.fillStyle = 'white';
    ctx.font = "12px Consolas";

    // Upgrade buttons
    ctx.fillText("Buy Carrot Per Click", carrotsPerClick.x + 5, carrotsPerClick.y + carrotsPerClick.h/2-6);
    ctx.fillText("Cost: " + carrotsPerClick.cost, carrotsPerClick.x + 5, carrotsPerClick.y + carrotsPerClick.h/2 + 12);
    ctx.fillText("Buy Auto Clicker", autoClicker.x + 5, autoClicker.y + autoClicker.h/2-6);
    ctx.fillText("Cost: " + autoClicker.cost, autoClicker.x + 5, autoClicker.y + autoClicker.h/2 + 12);
    ctx.fillText("Buy Farmer", farmer.x + 5, farmer.y + farmer.h/2-6);
    ctx.fillText("Cost: " + farmer.cost, farmer.x + 5, farmer.y + farmer.h/2 + 12);
    ctx.fillText("Buy Factory", factory.x + 5, factory.y + factory.h/2-6);
    ctx.fillText("Cost: " + factory.cost, factory.x + 5, factory.y + factory.h/2 + 12);
    
    // Info
    ctx.fillStyle = 'darkslategrey';
    ctx.font = "16px Consolas";
    ctx.fillText("Carrots: " + Math.trunc(carrots), carrotMainButton.x, carrotMainButton.y + carrotMainButton.h + 16);
    ctx.fillText("Carrots Per Click: " + carrotsPerClick.count, carrotMainButton.x, carrotMainButton.y + carrotMainButton.h + 36);
    ctx.fillText("Auto Clickers: " + autoClicker.count, carrotMainButton.x, carrotMainButton.y + carrotMainButton.h + 56);
    ctx.fillText("Farmers: " + farmer.count, carrotMainButton.x, carrotMainButton.y + carrotMainButton.h + 76);
    ctx.fillText("Factories: " + factory.count, carrotMainButton.x, carrotMainButton.y + carrotMainButton.h + 96);
}

/************* MAIN FUNCTIONS *************/

function input() {
    
    document.addEventListener("mousemove", (event)=> {
        //console.log(event.clientX + " " + event.clientY);
        // We are inside the main carrot button
        if ((event.clientX > carrotMainButton.x && event.clientX < carrotMainButton.x + carrotMainButton.w) && (event.clientY > carrotMainButton.y && event.clientY < carrotMainButton.y + carrotMainButton.h)) {
           buttonState = ButtonStates.MAIN;
        } else if ((event.clientX > carrotsPerClick.x && event.clientX < carrotsPerClick.x + carrotsPerClick.w) && (event.clientY > carrotsPerClick.y && event.clientY < carrotsPerClick.y + carrotsPerClick.h)) {
           buttonState = ButtonStates.CPC;
        } else if ((event.clientX > autoClicker.x && event.clientX < autoClicker.x + autoClicker.w) && (event.clientY > autoClicker.y && event.clientY < autoClicker.y + autoClicker.h)) {
           buttonState = ButtonStates.AUTO;
        } else if ((event.clientX > farmer.x && event.clientX < farmer.x + farmer.w) && (event.clientY > farmer.y && event.clientY < farmer.y + farmer.h)) {
           buttonState = ButtonStates.FARMER;
        } else if ((event.clientX > factory.x && event.clientX < factory.x + factory.w) && (event.clientY > factory.y && event.clientY < factory.y + factory.h)) {
           buttonState = ButtonStates.FACTORY;
        } else {
            buttonState = ButtonStates.NULL;
        }
    });

    document.addEventListener("mousedown", (event)=> {
        if (clickReady) {

            switch (buttonState) {
                case ButtonStates.MAIN:
                    carrots += carrotsPerClick.count;
                    break;
                case ButtonStates.CPC:
                    buyUpgrade(carrotsPerClick);
                    break;
                case ButtonStates.AUTO:
                    buyUpgrade(autoClicker);
                    break;
                case ButtonStates.FARMER:
                    buyUpgrade(farmer);
                    break;
                case ButtonStates.FACTORY:
                    buyUpgrade(factory);
                    break;
            }
        }
        clickReady = false;
    });

    document.addEventListener("mouseup", (event)=> {
        clickReady = true
    });

    document.addEventListener("keydown", (event)=> {

    });
    
    document.addEventListener("keyup", (event)=> {
    
    });
}

function update(deltaTime) {
    addCarrots(deltaTime);
}

function draw() {
    ctx.fillStyle = 'orange';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    drawButtons();
    drawText();
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