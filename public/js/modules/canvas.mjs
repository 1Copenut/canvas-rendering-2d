const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('click', handleClick, false);

/**
 * 
 * elemsArr shape
 * [{ document.getElementById(elem), 20, 20 }]
 * 
 */

function redraw(elemsArr) {
  console.log('fired redraw');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  elemsArr.map(elem => drawButton(elem.point, elem.x, elem.y));
}

function handleClick(elemsArr, e) {
  // Calculate click coordinates
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientX - canvas.offsetTop;

  // Focus first item if appropriate
  elemsArr.map(elem => {
    drawButton(elem.point, elem.x, elem.y);
    if (ctx.isPointInPath(x, y)) {
      elem.point.focus();
    }
  });
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

export { canvas, redraw, handleClick };
