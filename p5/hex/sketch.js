import { screenW, screenH, bg_color, cell_size, column_count, row_count, p5ctx } from './const.js';
// import Grid from './grid.js';
import Bug from './bug.js';
import Cell from './cell.js';

const sketch = (p) => {
  let grid = [];
  let n_bugs = 12;
  let bugs = [];

  const init_nodes = function () {
    for (let i = 0; i < n_bugs; i++) {
      let x = Math.floor(Math.random() * (column_count));
      let y = Math.floor(Math.random() * (row_count));
      while(y%2 != x % 2) y = Math.floor(Math.random() * (row_count));
      grid.get_cell(x,y).visit();
      bugs.push(new Bug(grid.get_cell(x,y)));
    }
  }

  grid.get_cell = function(x,y) {
    for(let cell of grid) {
      if(cell.x == x && cell.y == y) return cell;
    }
    return undefined;
  }

  const init_grid = function() {
    for(let i = 0; i < column_count; i++) {
      for(let j = 0; j < row_count; j++) {
        (i % 2 == j % 2) && grid.push(new Cell(i,j,grid));
      }
    }
  }

  const draw_grid = function() {
    for(let cell of grid) cell.draw();
  }

  p.setup = () => {
    init_grid();
    let canvas = p.createCanvas(screenW, screenH);
    canvas.parent("canvas");
    p.scale(0.6);
    p.translate(cell_size, cell_size)
    p.background(bg_color);
    draw_grid();

    // p.frameRate(16)
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
    p5ctx.context.noLoop();
  }

  window.addEventListener('keydown', (e) => {
    if (e.code == 'Space') {
      e.preventDefault();
      step();
    }
  })
}


export default sketch;