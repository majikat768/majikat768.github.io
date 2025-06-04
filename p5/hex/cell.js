import { p5ctx, hexHdist, hexVdist, vertices, hexWidth, neighbor_directions, column_count, row_count } from './const.js';

const Cell = function(x,y, parent) {
  this.x = x;
  this.y = y;
  this.screenX = x * hexHdist;
  this.screenY = y * hexVdist + (x%2 == 0 ? hexVdist/2 : 0);

  this.grid = parent;
  this.visited = false;

  this.draw = function() {
    if(p5ctx.context == undefined) return;
    let ctx = p5ctx.context;
    ctx.strokeWeight(1);
    ctx.stroke(81);
    ctx.noFill();
    if(this.visited) {
    }
    ctx.beginShape();
    for(let v of vertices) {
      ctx.vertex(
        this.screenX+hexWidth/2*v.x,
        this.screenY+hexWidth/2*v.y,
      )
    }
    ctx.endShape();
    // ctx.text(`(${this.x},${this.y})`,this.screenX,this.screenY);
  }

  this.visit = function() {
    this.visited = true;
  }

  this.find_next_cell = function() {
    // should randomize neighbor_directions.
    // or find current/previous direction of travel, and base next off that.
    let possible = [];
    for(let d of neighbor_directions) {
      let nextX = this.x + d.x;
      let nextY = this.y + d.y;
      if(nextX >= 0  && nextX < column_count && nextY >= 0 && nextY < row_count) {
        let nextCell = this.grid.cells[nextX][nextY];
        if(!nextCell.visited) {
          possible.push(this.grid.cells[nextX][nextY]);
        }
      }
    }
    if(possible.length > 0) {
      let next = possible[Math.floor(Math.random()*possible.length)];
      next.visited = true;
      this.visited = false;
    }
  }
}

export default Cell;