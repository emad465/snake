<canvas id="game" width="400" height="400"></canvas>
<div>Score: <span id="score">0</span></div>

<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const grid = 20;
let count = 0;
let score = 0;
const speed = 8; // lower is faster

const snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};

const apple = {
  x: 320,
  y: 320
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function resetApple() {
  apple.x = getRandomInt(0, 20) * grid;
  apple.y = getRandomInt(0, 20) * grid;
}

function drawApple() {
  ctx.beginPath();
  ctx.arc(apple.x + grid / 2, apple.y + grid / 2, grid / 2 - 2, 0, Math.PI * 2);
  ctx.fillStyle = '#e63946';
  ctx.fill();
  // stem
  ctx.fillStyle = '#6b705c';
  ctx.fillRect(apple.x + grid / 2 - 1, apple.y + 2, 2, 6);
  // leaf
  ctx.beginPath();
  ctx.arc(apple.x + grid / 2 + 4, apple.y + 4, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#2a9d8f';
  ctx.fill();
}

function drawSnakeSegment(cell, index) {
  const head = index === 0;
  ctx.fillStyle = head ? '#6a994e' : '#a7c957';
  ctx.beginPath();
  ctx.arc(cell.x + grid / 2, cell.y + grid / 2, grid / 2, 0, Math.PI * 2);
  ctx.fill();

  if (head) {
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cell.x + grid / 2 - 3, cell.y + grid / 2 - 3, 2, 0, Math.PI * 2);
    ctx.arc(cell.x + grid / 2 + 3, cell.y + grid / 2 - 3, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < speed) {
    return;
  }
  count = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({x: snake.x, y: snake.y});

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  drawApple();

  snake.cells.forEach(function(cell, index) {
    drawSnakeSegment(cell, index);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score++;
      document.getElementById('score').textContent = score;
      resetApple();
    }

    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        score = 0;
        document.getElementById('score').textContent = score;
        resetApple();
      }
    }
  });
}

resetApple();
requestAnimationFrame(loop);

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft' && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.key === 'ArrowUp' && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.key === 'ArrowRight' && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.key === 'ArrowDown' && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
</script>
