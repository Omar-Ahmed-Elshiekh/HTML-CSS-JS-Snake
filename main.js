const gameBoard = document.querySelector(".gameBoard");
const contxt = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const foodColor = "red"
const food = ["🍎","🍉","🍑","🍒","🍓","🍇","🥝","🍍"];
const unitSize = 25;

let foodIndex = 0;
let running = false;
let xVel = unitSize;
let yVel = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();
function gameStart() {
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
}

function nextTick() {
  if(running){
    setTimeout(()=>{
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75)
  }else{
    displayGameOver();
  }
}

function clearBoard() {
  contxt.fillStyle = boardBackground;
  contxt.fillRect(0,0,gameWidth,gameHeight)
}

function createFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameHeight - unitSize);
}

function drawFood() {
  contxt.font = "25px Arial";
  contxt.textAlign = "center";
  contxt.textBaseline = "middle";
  contxt.fillText(food[foodIndex], foodX + unitSize / 2, foodY + unitSize / 2);
}
function moveSnake() {
  const head = {x: snake[0].x + xVel ,
    y: snake[0].y + yVel
  };
  snake.unshift(head);
  if(snake[0].x == foodX && snake[0].y == foodY){
    score++;
    foodIndex++;
    if(foodIndex === 8) foodIndex = 0;
    scoreText.textContent = score;
    createFood();
  }else{
    snake.pop();
  }
}
function drawSnake() {
  contxt.fillStyle = snakeColor;
  snake.forEach(snakePart => {
    contxt.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);

  })
}
function changeDirection(event) {
  const keyPress = event.keyCode;
  const left = 37;
  const right = 39;
  const up = 38;
  const down = 40;
console.log(keyPress)
  const goingUp = (yVel == -unitSize);
  const goingDown = (yVel == unitSize);
  const goingLeft = (xVel == -unitSize);
  const goingRight = (xVel == unitSize);

  switch(true){
    case(keyPress == left && !goingRight):
    xVel = -unitSize;
    yVel = 0;
    break;
    case(keyPress == up && !goingDown):
    xVel = 0;
    yVel = -unitSize;
    break;
    case(keyPress == right && !goingLeft):
    xVel = unitSize;
    yVel = 0;
    break;
    case(keyPress == down && !goingUp):
    xVel = 0;
    yVel = unitSize;
    break;
  }
}

function checkGameOver() {
  switch(true){
    case(snake[0].x < 0):
      running = false;
      break;
    case(snake[0].x >= gameWidth):
      running = false;
      break;
    
    case(snake[0].y < 0):
      running = false;
      break;
    case(snake[0].y >= gameHeight):
      running = false;
      break;
    
  }

  for(let i = 1; i < snake.length;i++){
    if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
      running = false;
    }
  }
}

function displayGameOver() {
  contxt.font = "50px MV Boli";
  contxt.fillStyle = "black";
  contxt.textAlign = "center";
  contxt.fillText("GAME OVER!" , gameWidth / 2 , gameHeight / 2);
  running = false;
}

function resetGame() {
  score = 0;
  xVel = unitSize;
  yVel = 0;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ];
  gameStart();
}
