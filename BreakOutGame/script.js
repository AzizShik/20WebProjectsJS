window.addEventListener('load', () => {
  const showBtn = document.querySelector('.show-btn');
  const closeBtn = document.querySelector('.rules__close');
  const rulesEl = document.querySelector('.rules');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  showBtn.addEventListener('click', () => rulesEl.classList.add('show'));
  closeBtn.addEventListener('click', () => rulesEl.classList.remove('show'));

  let score = 0;

  const brickRowCount = 9;
  const brickColumnCount = 5;

  const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 5,
    dx: 4,
    dy: -4,
  };

  const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 40,
    w: 80,
    h: 10,
    speed: 10,
    dx: 0,
  };

  const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
  };

  const bricks = [];
  for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColumnCount; j++) {
      const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
      const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
      bricks[i][j] = {x, y, ...brickInfo};
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
  }

  function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
  }

  function drawBrikcs() {
    bricks.forEach((column) => {
      column.forEach((brick) => {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.w, brick.h);
        ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
        ctx.fill();
        ctx.closePath();
      });
    });
  }

  function movePaddle() {
    paddle.x += paddle.dx;

    if (paddle.x + paddle.w > canvas.width) {
      paddle.x = canvas.width - paddle.w;
    }

    if (paddle.x < 0) {
      paddle.x = 0;
    }
  }

  function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
      ball.dx *= -1;
    }

    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
      ball.dy *= -1;
    }

    if (
      ball.x - ball.size > paddle.x &&
      ball.x + ball.size < paddle.x + paddle.w &&
      ball.y + ball.size > paddle.y
    ) {
      ball.dy = -ball.speed;
    }

    bricks.forEach((column) => {
      column.forEach((brick) => {
        if (brick.visible) {
          if (
            ball.x - ball.size > brick.x &&
            ball.x + ball.size < brick.x + brick.w &&
            ball.y + ball.size > brick.y &&
            ball.y - ball.size < brick.y + brick.h
          ) {
            ball.dy *= -1;
            brick.visible = false;

            increaseScore();
          }
        }
      });
    });

    if (ball.y + ball.size > canvas.height) {
      showAllBricks();
      score = 0;
    }
  }

  function increaseScore() {
    score++;

    if (score % (brickRowCount * brickColumnCount === 0)) {
      showAllBricks();
    }
  }

  function showAllBricks() {
    bricks.forEach((column) => {
      column.forEach((brick) => (brick.visible = true));
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawBrikcs();
    moveBall();
  }

  draw();

  function update() {
    movePaddle();

    draw();

    requestAnimationFrame(update);
  }

  update();

  function keyDown(e) {
    if (e.key === 'ArrowLeft') {
      paddle.dx = -paddle.speed;
    }

    if (e.key === 'ArrowRight') {
      paddle.dx = paddle.speed;
    }
  }

  function keyUp(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      paddle.dx = 0;
    }
  }

  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);
});
