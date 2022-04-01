import { redraw, handleClick } from './modules/barCharts/barChart.mjs'

document.addEventListener('focus', redraw, true);
document.addEventListener('blur', redraw, true);
canvas.addEventListener('click', handleClick, false);

redraw();
