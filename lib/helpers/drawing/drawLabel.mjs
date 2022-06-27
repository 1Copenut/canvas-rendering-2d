/**
 * Draws a text label on the canvas. Default position is top, centered.
 * 
 * @param {HTMLCanvasElement} canvas The canvas element where the chart will be drawn 
 * @param {CanvasRenderingContext2D} ctx Canvas draw layer context 
 * @param {String} labelText Name of the data set being displayed
 */
function drawLabel(canvas, ctx, labelText) {
  ctx.font = 'bold 22px Helvetica, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText(labelText, canvas.width / 2, 30, canvas.width);
}

export default drawLabel;
