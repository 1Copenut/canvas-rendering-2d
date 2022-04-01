const BAR_CHART_DATA = [
  {
    elemId: 'button1',
    x_start: 20,
    x_end: 170,
    y_start: 20,
    y_end: 60
  },
  {
    elemId: 'button2',
    x_start: 20,
    x_end: 150,
    y_start: 80,
    y_end: 120
  },
  {
    elemId: 'button3',
    x_start: 20,
    x_end: 130,
    y_start: 140,
    y_end: 180
  }
];

const STACKED_BAR_CHART_DATA = [
  {
    elemId: 'button1',
    x_start: 20,
    x_end: 170,
    y_start: 20,
    y_end: 60,
    stackedCoordinates: {
      1: {
        x_start: 20,
        y_start: 20,
        x_end: 120,
        y_end: 60
      },
      2: {
        x_start: 130,
        y_start: 20,
        x_end: 300,
        y_end: 60
      }
    }
  }
];

export { BAR_CHART_DATA, STACKED_BAR_CHART_DATA };
