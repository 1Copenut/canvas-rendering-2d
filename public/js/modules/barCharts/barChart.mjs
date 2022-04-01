import { BAR_CHART_CLASS, BAR_CHART_HEIGHT } from "../../constants/index.js";
import { BAR_CHART_DATA } from "../../data/barChartData.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// TODO: Refactor this so it can be passed as an arg to redraw and handleClick
const bars = [...document.getElementsByClassName(BAR_CHART_CLASS)];

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  BAR_CHART_DATA.map((bar, i) => drawBar(
    bars[i],
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

  BAR_CHART_DATA.map((bar, i) => {
    drawBar(
      bars[i],
      bar.x_start,
      bar.y_start,
      bar.x_end,
      bar.y_end
    );

    if (
      (x >= bar.x_start && x <= bar.x_end) &&
      (y >= bar.y_start && y <= bar.y_end)
    ) {
      bars[i].focus();
    }
  });
}

function drawBar(el, x_start, y_start, x_end, y_end) {
  const active = document.activeElement === el;
  const height = BAR_CHART_HEIGHT;

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
