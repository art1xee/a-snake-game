//board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

//snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;
//snake body

let snakeBody = [];

//food
let foodX;
let foodY;
//game over
let gameOver = false;

//score apples
let score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000 / 10); //100 milliseconds
}

function update() {
    //! btw check string a 85-96
    if (gameOver) {
        return;
    };

    //styling a board
    context.fillStyle = "#0D120E";
    context.fillRect(0, 0, board.width, board.height);

    //styling a food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //if our snake eat food we add 1 square to his body and increase the score by 1
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        score++;
        placeFood();
    };

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    };
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    };

    //here we styling a body of our snake
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    //styling a score
    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText("Score: " + score, 10, 20);
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == foodX && snakeY == foodY) {
            context.fillStyle = "red";
        } else {
            context.fillStyle = "lime";
        };
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    };

    //game over conditions
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        alert("Game Over");
    };

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        };
    };
};


function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    };
};


function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

//we add a button which reload our website (for conveniences)    
let reload = () => {
    location.reload();
};