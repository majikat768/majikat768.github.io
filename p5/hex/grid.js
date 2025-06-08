import Cell from "./cell.js";

const Grid = function (cols, rows) {
  this.x = cols;
  this.y = rows;
  this.cells = [];

  this.init = function () {
    console.log('grid init');
    this.cells = [];
    for (let i = 0; i < this.x; i++) {
      for (let j = 0; j < this.y; j++) {
        (i % 2 == j % 2) && this.cells.push(new Cell(i,j,this));
      }
    }
  }

  this.init();

  this.draw = function () {
    console.log('grid draw');
    for(let cell of this.cells) {
      cell.draw();
    }
  }

  this.get_cell = function(x,y) {
    for(let cell of this.cells) {
      if(cell.x == x && cell.y == y) return cell;
    }
    return undefined;
  }
}

export default Grid;