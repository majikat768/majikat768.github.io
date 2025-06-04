import Cell from "./cell.js";

const Grid = function (cols, rows) {
  this.x = cols;
  this.y = rows;
  this.cells = [];

  this.init = function () {
    console.log('grid init');
    this.cells = [];
    for (let i = 0; i < this.x; i++) {
      this.cells.push([]);
      for (let j = 0; j < this.y; j++) {
        this.cells[i].push(new Cell(i, j, this));
      }
    }
  }

  this.init();

  this.draw = function () {
    console.log('grid draw');
    for(let i = 0; i < this.x; i++) {
      for(let j = 0; j < this.y; j++) {
        this.cells[i][j].draw();
      }
    }
  }
}

export default Grid;