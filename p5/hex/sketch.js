import { screenW, screenH, bg_color, cell_size, column_count, row_count, p5ctx } from './const.js';
import Grid from './grid.js';
import Bug from './bug.js';

const sketch = (p) => {
  let grid;
  let n_bugs = 12;
  let bugs = [];

  const init_nodes = function () {
    for (let i = 0; i < n_bugs; i++) {
      let x = Math.floor(Math.random() * (column_count));
      let y = Math.floor(Math.random() * (row_count));
      grid.cells[x][y].visit();
      bugs.push(new Bug(grid.cells[x][y]));
    }
  }

  p.setup = () => {
    grid = new Grid(column_count, row_count);
    let canvas = p.createCanvas(screenW, screenH);
    canvas.parent("canvas");
    p.scale(0.6);
    p.translate(cell_size, cell_size)
    p.background(bg_color);
    // grid.draw();

    init_nodes();
  }
  p.draw = () => {
    p.scale(0.6);
    p.translate(cell_size, cell_size)
    for (let bug of bugs) {
      bug.draw();
      bug.find_next_cell();
    }
    // p.noLoop();
  }

  function step() {
    if (p5ctx.context == undefined) return;
    p5ctx.context.loop();
    // p5ctx.context.noLoop();
  }

  window.addEventListener('keydown', (e) => {
    if (e.code == 'Space') {
      e.preventDefault();
      step();
    }
  })
}


export default sketch;