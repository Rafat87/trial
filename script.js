const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const gridSpacing = 40;
const lines = [];

for (let i = -canvas.width; i < canvas.width * 2; i += gridSpacing) {
  lines.push({ x1: i, y1: 0, x2: i - canvas.height, y2: canvas.height });
}

const particles = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 2 + 0.5,
  dx: (Math.random() - 0.5) * 0.2,
  dy: (Math.random() - 0.5) * 0.2,
}));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Grid lines
  ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
  ctx.lineWidth = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    line.x1 += 0.1;
    line.x2 += 0.1;
    if (line.x1 > canvas.width + gridSpacing) {
      line.x1 = -gridSpacing;
      line.x2 = -gridSpacing - canvas.height;
    }

    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();
  }

  // Particles
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw();

