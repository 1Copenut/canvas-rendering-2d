function drawLabel(ctx, canvas, labelText) {
  ctx.font = 'bold 22px Helvetica, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText(labelText, canvas.width / 2, 30, canvas.width);
}

export default drawLabel;
