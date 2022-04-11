function handleClick(e, barsArr, barData) {
  // Calculate click coordinates
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;

  barData.map((bar, i) => {
    barsArr[i].removeAttribute('tabindex');

    if (
      (x >= bar.x_start && x <= bar.x_end) &&
      (y >= bar.y_start && y <= bar.y_end)
    ) {
      barsArr[i].setAttribute('tabindex', '0');
      barsArr[i].focus();
    }
  });
}

export default handleClick;
