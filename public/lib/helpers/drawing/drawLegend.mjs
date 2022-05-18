function drawLegend(ctx, canvas, minVal, maxVal) {
  const normalizedMinVal = Math.ceil(minVal / 10) * -10;
  const normalizedMaxVal = Math.ceil(maxVal / 10) * 10;
  const normalizedMedian = Math.round(normalizedMaxVal - normalizedMinVal) / 2;

  ctx.font = '15px Helvetica, Arial, sans-serif';
  ctx.fillStyle = 'black';

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

export default drawLegend;
