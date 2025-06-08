import { angle2direction, angles, column_count, direction2angle, neighbor_directions, p5ctx, row_count } from "./const.js";

const Bug = function (cell) {
  this.current_cell = cell;
  this.current_cell.visit();
  this.color = [
    Math.floor(Math.random()*255),
    Math.floor(Math.random()*255),
    Math.floor(Math.random()*255),
]
  this.cells = [cell];

  this.current_angle = angles[Math.floor(Math.random()*angles.length)];
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
    let grid = this.current_cell.grid;
    let possible = [];
    let next_angles = []
    for(let a of angles) {
      if(a != this.current_angle) next_angles.push(a);
    }
    // let next_angles = [
    //   // this.current_angle,
    //   this.current_angle > 30 ? this.current_angle-60 : 330,
    //   this.current_angle < 330 ? this.current_angle+60 : 30,
    // ]
    // next_angles = [
    //   ...next_angles,
    //   next_angles[1] > 30 ? next_angles[1] - 60 : 330,
    //   next_angles[2] < 330 ? next_angles[2] + 60 : 30,
    // ]
    // let next_angles = angles;

    for (let a of next_angles) {
      let d = angle2direction[a];
      let nextX = this.current_cell.x + d.x;
      let nextY = this.current_cell.y + d.y;
      if (nextX >= 0 && nextX < column_count && nextY >= 0 && nextY < row_count) {
        let nextCell = grid.get_cell(nextX,nextY);
        if (!nextCell.visited || nextCell.visits > 0) {
          possible.push(nextCell);
        }
      }
    }
      if (possible.length > 0) {
        // let next = possible[0];
        let next = possible[Math.floor(Math.random() * possible.length)];
        p5ctx.context.stroke(this.color);
        p5ctx.context.line(this.current_cell.screenX,this.current_cell.screenY,next.screenX,next.screenY)
        this.current_cell = next;
        p5ctx.context.noStroke();
        p5ctx.context.fill(255,255,255)
        p5ctx.context.circle(this.current_cell.screenX, this.current_cell.screenY, 8);
        this.cells.push(next);
        this.current_angle = direction2angle(next.x - this.current_cell.x,next.y - this.current_cell.y);
        next.visit();
      } else if(this.cells.length > 0) {
        // this.current_cell.visited = false;
        this.current_cell = this.cells.pop();
        p5ctx.context.noStroke();
        p5ctx.context.fill(255,255,255)
        p5ctx.context.circle(this.current_cell.screenX, this.current_cell.screenY, 8);
        // this.current_cell = this.cells[this.cells.indexOf(this.current_cell)-1];
        // this.cells.push(this.current_cell)
      } else {
        this.done = true;
      }
  }
}

export default Bug;