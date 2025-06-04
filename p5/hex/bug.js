import { column_count, neighbor_directions, p5ctx, row_count } from "./const.js";

const Bug = function (cell) {
  this.current_cell = cell;
  this.current_cell.visit();
  this.color = [
    Math.floor(Math.random()*255),
    Math.floor(Math.random()*255),
    Math.floor(Math.random()*255),
]
  this.cells = [cell];

  this.done = false;

  this.draw = function () {
    if (p5ctx.context == undefined) return;
    if(this.done) return;
    p5ctx.context.fill(this.color);
    p5ctx.context.stroke(this.color);
    // let curr_cell = this.cells[0];
    p5ctx.context.strokeWeight(8);
    // for(let i = 1; i < this.cells.length; i++) {
    //   let next_cell = this.cells[i];
    //   p5ctx.context.line(curr_cell.screenX,curr_cell.screenY,next_cell.screenX,next_cell.screenY)
    //   curr_cell = next_cell;
    // }
    // for(let cell of this.cells) {
    //   // p5ctx.context.circle(cell.screenX, cell.screenY, 8);
    // }
      p5ctx.context.circle(this.current_cell.screenX, this.current_cell.screenY, 8);
  }

  this.find_next_cell = function () {
    if(this.done) return;
    if(this.current_cell == undefined) return;
    let grid = this.current_cell.grid.cells;
    let possible = [];
    let directions = [ ...neighbor_directions ];
    if(this.current_cell.x %2 == 0) {
      directions.push({x:-1,y:1});
      directions.push({x:1,y:1});
    } else {
      directions.push({x:-1,y:-1});
      directions.push({x:1,y:-1});
    }

    for (let d of directions) {
      let nextX = this.current_cell.x + d.x;
      let nextY = this.current_cell.y + d.y;
      if (nextX >= 0 && nextX < column_count && nextY >= 0 && nextY < row_count) {
        let nextCell = grid[nextX][nextY];
        if (!nextCell.visited) {
          possible.push(grid[nextX][nextY]);
        }
      }
    }
      if (possible.length > 0) {
        let next = possible[Math.floor(Math.random() * possible.length)];
        p5ctx.context.stroke(this.color);
        p5ctx.context.line(this.current_cell.screenX,this.current_cell.screenY,next.screenX,next.screenY)
        this.current_cell = next;
        p5ctx.context.noStroke();
        p5ctx.context.fill(255,255,255)
        p5ctx.context.circle(this.current_cell.screenX, this.current_cell.screenY, 8);
        this.cells.push(next);
        next.visited = true;
      } else if(this.cells.length > 0) {
        // this.current_cell.visited = false;
        this.current_cell = this.cells.pop();
        p5ctx.context.noStroke();
        p5ctx.context.fill(255,255,255)
        p5ctx.context.circle(this.current_cell.screenX, this.current_cell.screenY, 8);
        // this.current_cell = this.cells[this.cells.indexOf(this.current_cell)-1];
        // this.cells.push(this.current_cell)
      } else {
        this.done == true;
      }
  }
}

export default Bug;