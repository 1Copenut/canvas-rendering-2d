const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// const button1 = document.getElementById('button1');
// const button2 = document.getElementById('button2');

const buttons = [...document.getElementsByClassName('chart-point')];
const canvasArray = [
  {
    point: buttons[0],
    x: 20,
    y: 20
  },
  {
    point: buttons[1],
    x: 20,
    y: 80
  }
];

document.addEventListener('focus', redraw, true);
document.addEventListener('blur', redraw, true);
canvas.addEventListener('click', handleClick, false);
redraw();

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvasArray.map(button => drawButton(button.point, button.x, button.y));
  // drawButton(button1, 20, 20);
  // drawButton(button2, 20, 80);
}

function handleClick(e) {
  // Calculate click coordinates
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;

  console.log(x);
  console.log(y);

  // Focus button1, if appropriate
  drawButton(button1, 20, 20);
  if (ctx.isPointInPath(x, y)) {
    button1.focus();
  }

  // Focus button2, if appropriate
  drawButton(button2, 20, 80);
  if (ctx.isPointInPath(x, y)) {
    button2.focus();
  }
}

function drawButton(el, x, y) {
  const active = document.activeElement === el;
  const width = 150;
  const height = 40;

  // Button background
  ctx.fillStyle = active ? 'pink' : 'lightgray';
  ctx.fillRect(x, y, width, height);

  // Button text
  ctx.font = '15px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = active ? 'blue' : 'black';
  ctx.fillText(el.textContent, x + width / 2, y + height / 2);

  // Define clickable area
  ctx.beginPath();
  ctx.rect(x, y, width, height);

  // Draw focus ring, if appropriate
  ctx.drawFocusIfNeeded(el);
}
