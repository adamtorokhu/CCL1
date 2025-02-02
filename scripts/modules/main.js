import { global } from "./global.js";
import { Player } from "../gameObjects/player.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { Floor } from "../gameObjects/floor.js";
import { SpikeObject } from "../gameObjects/spikeObject.js";
import { BaseGameObject } from "../gameObjects/baseGameObject.js";

const startButtons = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const gameContainer = document.getElementById("gameContainer");
const display = document.getElementById("display");
const p = document.getElementById("explain");
const h1 = document.getElementById("neon");
startButtons.addEventListener("click", startGame);
startButtons.addEventListener("touchstart", startGame);

function startGame() {
    startScreen.style.display = "none";
    gameContainer.style.display = "block";
    display.style.display = "flex";

    restartGame();
};

function updateCounter() {
    const counterDiv = document.getElementById("counter");
    counterDiv.textContent = `Attempt: ${global.currentTries}`;
}

const bestDiv = document.getElementById("best");
const controlsDiv = document.getElementById("controls");
let playerStartTime = 0;
const totalGameTime = 57;
let bestScore = 0;
let clear = false;

function progressBar() {
    let bestInterval = setInterval(() => {
        playerStartTime += 100;
        let timeSurvived = playerStartTime / 1000;
        let progress = (timeSurvived / totalGameTime) * 100;

        if (progress > bestScore) {
            bestScore = progress;
        }

        if (clear == true) {
            clearInterval(bestInterval)
            clear = false;
        }
        if (progress == 100) {
            bestDiv.innerText = `Personal Best: 100%`;
            startScreen.style.display = "block";
            gameContainer.style.display = "none";

            startButtons.innerText = "Restart Game"
            h1.innerText = "Congrats!"
            p.innerText = "Stay tuned for new levels!"
            controlsDiv.style.display = "none"
        }

        // console.log(`Time Survived: ${timeSurvived}s`);
    }, 100);
}

function updateBar() {
    if (bestScore < 101) {
        bestDiv.innerText = `Personal Best: ${bestScore.toFixed()}%`;
    }
}




function startCountdown() {
    const countdownOverlay = document.getElementById("countdownOverlay");
    const countdownText = document.getElementById("countdownText");

    let countdownValue = 3;
    countdownOverlay.style.display = "flex";
    countdownText.textContent = countdownValue;

    const interval = setInterval(() => {
        countdownValue--;
        if (countdownValue > 0) {
            countdownText.textContent = countdownValue;
        } else {
            clearInterval(interval);
            countdownOverlay.style.display = "none";
            global.moving = true;
            global.music.play();
        }
    }, 1000);
}



function gameLoop(totalRunningTime) {

    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.

    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].applyGravity();
            global.allGameObjects[i].draw();
        }
    }

    if (global.restart) {
        global.restart = false;
        clear = true;
        restartGame();
    }

    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}


//------------------------------------------------


const cellWidth = 50;
const cellHeight = 50;
const startX = 1010;
const baseY = 400;

const Map = [
    //5000
    ["s", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "p", "p", "p", "p", "p", "p", "p", "p",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "p", "p", "s",
        "s", "s", "p:-50", "p:-50", "s", "s", "s", "p:-100",
        "p:-100", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "s",
        "s", ""
    ],
    //16000
    ["", "s", "s", "", "", "", "", "",
        "", "s", "", "", "", "", "", "",
        "p", "p", "p", "p", "p", "p", "p", "p",
        "p", "", "", "", "", "", "", "",
        "", "", "", "", "", "s", "s", "p",
        "s", "s", "s", "s", "s", "p:-50", "s", "s",
        "s", "s", "s", "p:-100", "p:-100", "p:-100", "p:-100", "p:-100",
        "p:-100", "p:-100", "p:-100", "p:-100"],
    //18300
    ["s:-50"],
    //22000
    ["p:-50", "p:-50", "p:-50", "p:-50",
        "p:-50", "p:-50", "p:-50", "p:-50", "p:-50", "p:-100", "p:-100", "p:-100",
        "p:-100", "p:-100", "p:-100", "p:-100", "p:-100", "p:-100", "s", "s",
        "s", "p:-50", "p:-50", "s", "s", "s", "p", "p",],
    //22010
    ["p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200"],
    //25900
    ["s", "", "", "", "",
        "", "", "s", "", "", "", "", "",
        "", "s", "", "", "", "", "", "",
        "", "", "", "", "", "", "p", "s",
        "s", "s", "s", "s", "p:-50", "", "", "",
        "", "", "p:-100", "", "", "", "", "",
        "p:-150", "", "", "", "", "", "p:-200", "p:-200",
        "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200",
        "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200",
        "p:-200", "p:-200", "p:-200", "p:-200", "p:-150", "p:-150", "p:-150", "p:-150",
        "p:-150", "p:-150", "p:-150", "p:-150", "p:-150", "p:-150", "p:-150", "p:-200",
        "p:-200", "p:-200", "", "", "", "s", "", "",
        "", "", "", "p:-100", "p:-100", "p:-100", "p:-100", "p:-100",
        "p:-100", "p:-100", "", "", "", "s",],

    //32000
    ["s", "s", "", "", "", "", "", "", "", "s"],//below
    //32000
    ["s:-250", "s:-250", "", "", "", "", "", "s:-250", "s:-250", "", "", "", "", "p:-300", "p:-300", "p:-300", "p:-300", "p:-300", "p:-300", "p:-300", "p:-300", "p:-300"],

    //36000
    ["", "",
        "", "", "", "", "", "", "", "",
        "", "", "s", "s", "", "", "", "",
        "", "s", "s", "p", "p", "p", "p", "s",
        "s", "s", "s", "p:-50", "p:-50", "p:-50", "p:-50", "p:-50",
        "p:-50", "p:-50", "p:-50", "p:-50", "s", "s", "s", "s",
        "s", "p:-100", "p:-100", "p:-100", "p:-100", "p:-100", "", "",
        "", "", "", "p", "s", "s", "s", "s",
        "s", "p:-50", "s", "s", "s", "s", "s", "p:-100",],
    //40000
    ["s:-100"],
    //42700
    ["", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "s", "", "", "", "", "", "",
        "", "s", "s", "p", "s", "s", "s", "s",
        "s", "p:-50", "s", "s", "s", "s", "s", "p:-100",
        "s", "s", "s", "s", "p:-150", "p:-150", "s", "s",
        "s", "s", "p:-200", "p:-200", "s", "s", "s", "p:-150",
        "p:-150", "s", "s", "s", "p:-100", "p:-100", "s", "s",
        "s", "p:-50", "p:-50", "", "s", "s", "s", "s",
        "p:-100", "p:-100", "s", "s", "s", "s", "p:-150", "p:-150",
        "s", "s", "s", "s",],
    //51900
    ["p:-200", "p:-200", "p:-200", "p:-200",
        "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200",
        "p:-200", "p:-200", "p:-150", "p:-150", "p:-150", "p:-150", "p:-150", "p:-150",
        "p:-150", "p:-150", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200",],
    //53200
    ["", "s:-200", "p:-300", "p:-300", "p:-300", "p:-300", "p:-300", "p:-300", "s:-200"],
    //54700
    ["p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200",
        "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200",
        "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200", "p:-200"],
];

let spawnTimes = [5000, 16000, 18300, 22000, 22010, 25900, 32000, 32000, 36500, 40000, 42700, 51900, 53200, 54700];

function spawnObjects() {
    const tries = global.currentTries;
    Map.forEach((row, rowIndex) => {
        const spawnTime = spawnTimes[rowIndex];

        row.forEach((cell, colIndex) => {
            if (cell !== "") {
                setTimeout(() => {
                    if (global.currentTries !== tries) return;

                    const [type, yOffset] = cell.split(":");
                    const x = startX + colIndex * cellWidth;
                    const y = baseY + parseInt(yOffset || 0, 10);
                    if (type === "s") {
                        new SpikeObject(x, y, cellWidth, cellHeight);
                    } else if (type === "p") {
                        new BlockObject(x, y, cellWidth, cellHeight);
                    }
                }, spawnTime);
            }
        });
    });
};

function setupGame() {
    global.playerObject = new Player(300, 450, 75, 75);
    let floors = [
        new Floor(0, 450, 1000, 150),
        new Floor(1000, 450, 1000, 150),
    ];
    floors.forEach(floor => floor.update());

    global.moving = false;
    startCountdown();
}


function restartGame() {
    global.music.pause();
    global.music.currentTime = 0;
    global.currentTries++;
    updateCounter();
    playerStartTime = 0;
    updateBar();
    progressBar();
    global.allGameObjects = [];
    global.moving = true;
    global.restart = false;
    spawnObjects();
    setupGame();
}

requestAnimationFrame(gameLoop);