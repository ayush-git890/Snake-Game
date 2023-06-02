const playBoard = document.querySelector(".play-board"); //importing the .play-board class....
const scoreElement = document.querySelector(".score"); // importing the .score class....
const highScoreElement = document.querySelector(".high-score"); // importing the .high-score class....
let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let countScore = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

//2 step.... changing the food position.....randomly
const changeFoodPositon = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! press OK to replay...");
    location.reload();
}

//step 4 let's move the head on keyboard arrow click...
const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

//1 step... creating food for snake.....
const initGame = () => {
    if (gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}" ></div>`;
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPositon(); // changing the food position after eating 
        snakeBody.push([foodX, foodY]);
        countScore++;

        highScore = countScore >= highScore ? countScore : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${countScore}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];
    snakeX += velocityX; // step 4....
    snakeY += velocityY; // step 4....

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}" ></div>`;
        if (i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
}


changeFoodPositon();
setIntervalId = setInterval(initGame, 100); // here head moves in 100milliseconds.....
document.addEventListener("keydown", changeDirection);