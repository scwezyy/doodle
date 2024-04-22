var GAME = {
    width: 400,
    height: 500,
    background: '#1fd0d1'
}

var DOODLE = {
    color: '#ffffff',
    x: 170,
    y: 300,
    width: 30,
    height: 35,
    velocity: 0,
    gravity: 0.1,
    xDirection: 50,
}

var BLOCKS = {
    color: '#000000',
    width: 70,
    height: 10,
    x: 170,
    y: 425,
    yDirection: 1,
}

var MENU_BUTTON = {
    x: 350,
    y: 45,
    radius: 25,
}

var CONTINUE_BUTTON = {
    x: 110,
    y: 180,
    width: 180,
    height: 50,
}

var RESTART_BUTTON = {
    x: 110,
    y: 250,
    width: 180,
    height: 50,
 }

 var drawStatus;
 

let scoreNumber = 0;

var platform = [];

platform[0] = {
    x: 170,
    y: 425,
}

var canvas = document.getElementById('canvas');
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");



function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

//вывод счета
function score() {
    canvasContext.fillStyle = "#FFFFFF";
    canvasContext.font = "50px Verdana";
    canvasContext.fillText('Счет: ' + scoreNumber, 20, 50);
}

function drawMenuButton() {
    canvasContext.fillStyle = BLOCKS.color;
    canvasContext.beginPath();
    canvasContext.arc(MENU_BUTTON.x, MENU_BUTTON.y, MENU_BUTTON.radius, 0, 2 * Math.PI);
    canvasContext.stroke();

    canvasContext.fillRect(MENU_BUTTON.x - 8 , MENU_BUTTON.y - 10, 5 ,20)
   canvasContext.fillRect(MENU_BUTTON.x + 3 , MENU_BUTTON.y - 10, 5 ,20)
}

function drawContinueButton() {
    canvasContext.fillStyle = BLOCKS.color;
    
    canvasContext.fillRect(CONTINUE_BUTTON.x, CONTINUE_BUTTON.y, CONTINUE_BUTTON.width, CONTINUE_BUTTON.height);

    canvasContext.fillStyle = "white";
    canvasContext.fillText("Continue", 130, 220, 145, 60);
}

function drawRestartButton() {

    canvasContext.fillStyle = BLOCKS.color;
 
    canvasContext.fillRect(RESTART_BUTTON.x, RESTART_BUTTON.y, RESTART_BUTTON.width, RESTART_BUTTON.height);
 
    canvasContext.fillStyle = "white";
 
    canvasContext.fillText("Restart", 130, 290, 135, 50);
 
 } 



 function isOnMenuButton(event) {
    if (((event.x >= MENU_BUTTON.x - MENU_BUTTON.radius) && (event.x <= MENU_BUTTON.x + MENU_BUTTON.radius)) &&
        ((event.y >= MENU_BUTTON.y - MENU_BUTTON.radius) && (event.y <= MENU_BUTTON.y + MENU_BUTTON.radius))) {
        return true;
    }
 }

 function openMenu(event) {
    if (isOnMenuButton(event)) {
       cancelAnimationFrame(drawStatus);
       window.addEventListener("click", closeMenu);
       cancelEventListeners();
        drawMenu();
    }
 }

 function isOnContinueButton(event) {
    if (((event.x >= CONTINUE_BUTTON.x) && (event.x <= CONTINUE_BUTTON.x + CONTINUE_BUTTON.width))
    && ((event.y >= CONTINUE_BUTTON.y) && (event.y <= CONTINUE_BUTTON.y + CONTINUE_BUTTON.height))) {
        return true;
    }
 }

 function isOnRestartButton(event) {
    if (((event.x >= RESTART_BUTTON.x) && (event.x <= RESTART_BUTTON.x + RESTART_BUTTON.width)) &&
    ((event.y >= RESTART_BUTTON.y) && (event.y <= RESTART_BUTTON.y + RESTART_BUTTON.height))) {
        return true;
    }
 }

 function closeMenu(event) {
    if (isOnContinueButton(event)) {
        window.removeEventListener("click", closeMenu);
        initEventsListners();
         play();
    }

    if (isOnRestartButton(event)) {
        DOODLE.x = 170;
        DOODLE.y = 250;
        scoreNumber = 0;

        window.removeEventListener("click", closeMenu);
        initEventsListners();
        play();
    }
 }

 function cancelEventListeners() {
    window.removeEventListener("mousemove", onCanvasMouseMove);
    window.removeEventListener("keydown", onCanvasKeyDown);
    window.removeEventListener("click", openMenu);
}
  


function drawDOODLE() {
    canvasContext.fillStyle = DOODLE.color;
    canvasContext.fillRect(DOODLE.x, DOODLE.y, DOODLE.width, DOODLE.height);
}


function drawBLOCKS(x, y) {
    canvasContext.fillStyle = BLOCKS.color;



    for (var i = 0; i < platform.length; i++) {
        canvasContext.fillRect(platform[i].x, platform[i].y, BLOCKS.width, BLOCKS.height);

        platform[i].y++;

        if (platform[i].x + BLOCKS.width > GAME.width) {
            platform[i].x = GAME.width - BLOCKS.width
        }

        if (platform[i].y == 430) {
            platform.push({
                x: Math.floor(Math.random() * GAME.width),
                y: 350,
            });
        }
    }
}


function updateBLOCKS() {
    BLOCKS.y += BLOCKS.yDirection
}

function updateDOODLE() {
    DOODLE.velocity += DOODLE.gravity;
    DOODLE.y += DOODLE.velocity;


    let doodleBottom = DOODLE.y + DOODLE.height;
    let doodleLeft = DOODLE.x;
    let doodleRight = DOODLE.x + DOODLE.width;
    for (let i = 0; i < platform.length; i++) {
        let platformTop = platform[i].y;
        let platformBottom = platform[i].y + BLOCKS.height;
        let platformLeft = platform[i].x;
        let platformRight = platform[i].x + BLOCKS.width;
        if (doodleBottom >= platformTop &&
            doodleBottom <= platformBottom &&
            doodleLeft <= platformRight &&
            doodleRight >= platformLeft &&
            DOODLE.velocity > 0) {
            jump();
        }
    }

}

function jump() {
    DOODLE.velocity = -5;
    scoreNumber += 1;
}

function lose() {
    if (DOODLE.y > GAME.height) {
        location.reload();
    }
}

function initEventsListners() {
    window.addEventListener('keydown', onCanvasKeyDown);
    window.addEventListener('mousemove', onCanvasMouseMove);
    window.addEventListener("click", openMenu);
}

function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        DOODLE.x -= DOODLE.xDirection;
        clampDoodlePosition();
    }
    if (event.key === "ArrowRight") {
        DOODLE.x += DOODLE.xDirection;
        clampDoodlePosition();
    }
}

function onCanvasMouseMove(event) {
    DOODLE.x = event.clientX;
    clampDoodlePosition();
}

function clampDoodlePosition() {
    if (DOODLE.x < 0) {
        DOODLE.x = 0;
    }
    if (DOODLE.x + DOODLE.width > GAME.width) {
        DOODLE.x = GAME.width - DOODLE.width;
    }
}

 function drawMenu() {
    drawContinueButton();
    drawRestartButton();
 }


function play() {
    drawBackground();
    score();
    drawDOODLE();
    drawBLOCKS();
    updateBLOCKS();
    updateDOODLE();
    lose();
    drawMenuButton();
    drawStatus = requestAnimationFrame(play);
}

initEventsListners();
play();




