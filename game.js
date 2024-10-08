const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

const unit = 20;
let snake = [{ x: unit * 5, y: unit * 5 }];
let direction = { x: 0, y: 0 };
let food = { x: unit * 10, y: unit * 10 };
let score = 0;

function drawSnake() {
  snake.forEach(part => {
    ctx.fillStyle = 'lime';
    ctx.fillRect(part.x, part.y, unit, unit);
  });
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  food.x = Math.floor(Math.random() * canvas.width / unit) * unit;
  food.y = Math.floor(Math.random() * canvas.height / unit) * unit;
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, unit, unit);
}

function handleDirection(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -unit };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: unit };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -unit, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: unit, y: 0 };
      break;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveSnake();
  drawSnake();
  drawFood();
  if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
    alert(`Game Over! Score: ${score}`);
    document.location.reload();
  }
}

document.addEventListener('keydown', handleDirection);
setInterval(gameLoop, 100);
