const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const bars = [...document.getElementsByClassName('chart-point')];
const barDataArray = [
  {
    elem: bars[0],
    x_start: 20,
    x_end: 170,
    y_start: 20,
    y_end: 60
  },
  {
    elem: bars[1],
    x_start: 20,
    x_end: 150,
    y_start: 80,
    y_end: 120
  },
  {
    elem: bars[2],
    x_start: 20,
    x_end: 130,
    y_start: 140,
    y_end: 180
  }
];

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  barDataArray.map(bar => drawBar(bar.elem, bar.x_start, bar.y_start, bar.x_end, bar.y_end));
  // drawBar(button1, 20, 20);
  // drawBar(button2, 20, 80);
}

function handleClick(e) {
  // Calculate click coordinates
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;

  console.log(x);
  console.log(y);

  // Focus button1, if appropriate
  // drawBar(button1, 20, 20);
  // if (ctx.isPointInPath(x, y)) {
  //   button1.focus();
  //   console.log(ctx);
  // }

  // Focus button2, if appropriate
  // drawBar(button2, 20, 80);
  // if (ctx.isPointInPath(x, y)) {
  //   button2.focus();
  //   console.log(ctx);
  // }
  
  // barDataArray.map(button => drawBar(button.point, button.x, button.y));
  barDataArray.map(bar => {
    drawBar(bar.elem, bar.x_start, bar.y_start, bar.x_end, bar.y_end);
    if((x >= bar.x_start && x <= bar.x_end) && (y >= bar.y_start && y <= bar.y_end)) {
      bar.elem.focus();
    }
  })
}

function drawBar(el, x_start, y_start) {
  const active = document.activeElement === el;
  const width = 150;
  const height = 40;

  // Add a tabindex to each bar
  el.setAttribute('tabindex', '0');

  // Button background
  ctx.fillStyle = active ? 'pink' : 'lightgray';
  ctx.fillRect(x_start, y_start, width, height);

  // Button text
  ctx.font = '15px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = active ? 'blue' : 'black';
  ctx.fillText(el.textContent, x_start + width / 2, y_start + height / 2);

  // Define clickable area
  ctx.beginPath();
  ctx.rect(x_start, y_start, width, height);

  // Draw focus ring, if appropriate
  ctx.drawFocusIfNeeded(el);
}

export { redraw, handleClick };
