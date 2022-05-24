/**
 * Draws the x-axis and numeric labels. Default position is bottom, centered.
 * 
 * @param {HTMLCanvasElement} canvas The canvas element where the axis will be drawn 
 * @param {CanvasRenderingContext2D} ctx Canvas draw layer context 
 * @param {Number} minVal Minimum x-axis value, rounded to the nearest 10. Often 0 or maxVal opposite.
 * @param {Number} maxVal Maximum x-axis value rounded to the nearest 10
 */
function drawXAxis(canvas, ctx, minVal, maxVal) {
  const normalizedMinVal = Math.ceil(minVal / 10) * -10;
  const normalizedMaxVal = Math.ceil(maxVal / 10) * 10;
  const normalizedMedian = Math.round(normalizedMaxVal - normalizedMinVal) / 2;

  ctx.font = '15px Helvetica, Arial, sans-serif';
  ctx.fillStyle = 'black';

  // TODO: Add a use case for values higher than 50
  if (maxVal - minVal <= 50) {
    ctx.textAlign = 'left';
    ctx.fillText(normalizedMinVal, 22, canvas.height - 40);
    
    ctx.textAlign = 'center';
    ctx.fillText(normalizedMedian, canvas.width / 2, canvas.height - 40);
    
    ctx.textAlign = 'right';
    ctx.fillText(normalizedMaxVal, canvas.width - 22, canvas.height - 40);

    ctx.fillStyle = 'black';
    ctx.fillRect(
      20,
      canvas.height - 60,
      canvas.width - 40,
      2
    );
  }
}

export default drawXAxis;
