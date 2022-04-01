import { BAR_HEIGHT } from "../../constants/index.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const bars = [...document.getElementsByClassName('chart-point')];
const barDataArray = [
  {
    elem: bars[0],
    elemId: 'button1',
    x_start: 20,
    x_end: 170,
    y_start: 20,
    y_end: 60
  },
  {
    elem: bars[1],
    elemId: 'button2',
    x_start: 20,
    x_end: 150,
    y_start: 80,
    y_end: 120
  },
  {
    elem: bars[2],
    elemId: 'button3',
    x_start: 20,
    x_end: 130,
    y_start: 140,
    y_end: 180
  }
];

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  barDataArray.map(bar => drawBar(
    bar.elem,
    bar.x_start,
    bar.y_start,
    bar.x_end,
    bar.y_end
  ));
}

function handleClick(e) {
  // Calculate click coordinates
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;

  console.log(x);
  console.log(y);

  barDataArray.map(bar => {
    drawBar(bar.elem, bar.x_start, bar.y_start, bar.x_end, bar.y_end);
    if((x >= bar.x_start && x <= bar.x_end) && (y >= bar.y_start && y <= bar.y_end)) {
      bar.elem.focus();
    }
  })
}

function drawBar(el, x_start, y_start, x_end, y_end) {
  const active = document.activeElement === el;
  const height = BAR_HEIGHT;

  // Add a tabindex to each bar
  el.setAttribute('tabindex', '0');

  // Button background
  ctx.fillStyle = active ? 'rebeccapurple' : 'lightgray';
  ctx.fillRect(x_start, y_start, x_end, height);

  // Button text
  ctx.font = '16px Helvetica, Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = active ? 'white' : 'black';
  ctx.fillText(el.textContent, x_start + 15, y_start + height / 2);

  // Define clickable area
  ctx.beginPath();
  ctx.rect(x_start, y_start, x_end, height);

  // Draw focus ring, if appropriate
  ctx.drawFocusIfNeeded(el);
}

export { redraw, handleClick };
