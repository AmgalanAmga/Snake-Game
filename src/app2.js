const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
class SnakePart{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let speed = 7;
let squireSize = 20;
let snakeHead = {
    x: 10,
    y: 10,
}
let appleHead = {
    x: 5,
    y: 5,
}
let xHorizontal = 0;
let yVertical = 0;
let score = 0;
let tileLength = 2;
let snakeParts = [];
function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }
    gameScreen();
    appleCollision();
    drawSnake();
    drawApple();
    drawScore();
    setTimeout(drawGame, 1000 / speed);
}
function isGameOver() {
    let gameOver = false;
    if (xHorizontal === 0 && yVertical === 0) {
        return false;
    }
    if (snakeHead.x < 0) {
        gameOver = true;
    }
    else if (snakeHead.x === squireSize) {
        gameOver = true;
    }
    else if (snakeHead.y === 0) {
        gameOver = true;
    }
    else if (snakeHead.y === squireSize) {
        gameOver = true;
    }

    for (let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if (part.x === snakeHead.x && part.y === snakeHead.y ) {
            gameOver = true;
            break;
        }
    }



    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        ctx.fillStyle = gradient;
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }
    return gameOver;
}
function gameScreen() {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    for (let i = 1; i < canvas.width / squireSize; i++){
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.moveTo(squireSize * i, 0);
        ctx.lineTo(squireSize * i, canvas.height);
        ctx.moveTo(0, squireSize * i);
        ctx.lineTo(canvas.width, squireSize * i);
        ctx.stroke();
    }
}
function drawSnake() {
    ctx.fillStyle = "orange";
    for (let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * squireSize, part.y * squireSize, squireSize, squireSize)
    }
    snakeParts.push(new SnakePart(snakeHead.x, snakeHead.y));
    if (snakeParts.length > tileLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = "green";
    ctx.fillRect(snakeHead.x * squireSize, snakeHead.y * squireSize, squireSize, squireSize);
}
function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleHead.x * squireSize, appleHead.y * squireSize, squireSize, squireSize);
}
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "12px Verdana";
    ctx.fillText("Score" + score, canvas.width - 50, 15);
}
function changeSnakePosition() {
    snakeHead.x += xHorizontal;
    snakeHead.y += yVertical;
}
function appleCollision() {
    if (appleHead.x === snakeHead.x && appleHead.y === snakeHead.y) {
        appleHead.x = Math.floor(Math.random() * squireSize);
        appleHead.y = Math.floor(Math.random() * squireSize);
        score++;
        tileLength++;
    }
}
document.body.addEventListener("keydown", keyDown);
function keyDown(event) {
    // Up
    if (event.keyCode == 38) {
        if (yVertical == 1) {
            return;
        }
        yVertical = -1;
        xHorizontal = 0;
    }
    // Down
    if (event.keyCode == 40) {
        if (yVertical == -1) {
            return;
        }
        yVertical = 1;
        xHorizontal = 0;
    }
    // Left
    if (event.keyCode == 37) {
        if (xHorizontal == 1) {
            return;
        }
        yVertical = 0;
        xHorizontal = -1;
    }
    // Right
    if (event.keyCode == 39) {
        if (xHorizontal == -1) {
            return;
        }
        yVertical = 0;
        xHorizontal = 1;
    }
}
drawGame();