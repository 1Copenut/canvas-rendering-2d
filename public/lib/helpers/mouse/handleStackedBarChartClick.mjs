function handleStackedBarChartClick(e, barsArr, barData) {
  // Calculate click coordinates
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;

  barData.map((bar, i) => {
    const segments = [...barsArr[i].children];
    const coordinates = bar.stackedCoordinates;

    // We have to loop a second time because each bar is created
    // by drawming multiple segments on the X-axis
    segments.map((segment, i) => {
      const {
        elemId,
        x_start,
        x_end,
        y_start,
        y_end,
      } = coordinates[i];

      const activeBar = document.activeElement === 'body' ? undefined : document.getElementById(elemId);

      if ((x >= x_start && x <= x_end) && (y >= y_start && y <= y_end)) {
        // Find the current segment with tabindex and remove it
        const currentTabIndex = document.querySelector('canvas [tabindex="0"]');
        if (currentTabIndex) currentTabIndex.removeAttribute('tabindex');

        segment.setAttribute('tabindex', '0');
        segment.focus();
      }
    });
  });
}

export default handleStackedBarChartClick;
