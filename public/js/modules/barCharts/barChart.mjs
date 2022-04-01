import { BAR_CHART_CLASS, BAR_CHART_HEIGHT } from "../../constants/index.js";
import { BAR_CHART_DATA } from "../../data/barChartData.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const bars = [...document.getElementsByClassName(BAR_CHART_CLASS)];
let selectedBar = 0;

// Add event listeners
document.addEventListener('focus', initBarChart, true);
document.addEventListener('blur', initBarChart, true);
canvas.addEventListener('click', handleClick, false);
canvas.addEventListener('keydown', handleKeyDown, false);

function initBarChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  BAR_CHART_DATA.map((bar, i) => drawBar(
    bars[i],
    bar.x_start,
    bar.y_start,
    bar.x_end,
    bar.y_end
  ));
}

function handleKeyDown(e) {
  switch(e.key) {
    case 'ArrowUp':
    case 'ArrowLeft': {
      bars[selectedBar].removeAttribute('tabindex');

      if (selectedBar === 0) {
        selectedBar = bars.length - 1;
        bars[selectedBar].setAttribute('tabindex', '0');
        bars[selectedBar].focus();
      } else {
        selectedBar = selectedBar - 1;
        bars[selectedBar].setAttribute('tabindex', '0');
        bars[selectedBar].focus();
      }
      break;
    }

    case 'ArrowDown':
    case 'ArrowRight': {
      bars[selectedBar].removeAttribute('tabindex');

      if (selectedBar === bars.length - 1) {
        selectedBar = 0;
        bars[selectedBar].setAttribute('tabindex', '0');
        bars[selectedBar].focus();
      } else {
        selectedBar = selectedBar + 1;
        bars[selectedBar].setAttribute('tabindex', '0');
        bars[selectedBar].focus();
      }
      break;
    }

    default: {
      break;
    }
  }
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

    bars[i].removeAttribute('tabindex');

    if (
      (x >= bar.x_start && x <= bar.x_end) &&
      (y >= bar.y_start && y <= bar.y_end)
    ) {
      bars[i].setAttribute('tabindex', '0');
      bars[i].focus();
    }
  });
}

function drawBar(el, x_start, y_start, x_end, y_end) {
  const active = document.activeElement === el;
  const height = BAR_CHART_HEIGHT;

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

export default initBarChart;
