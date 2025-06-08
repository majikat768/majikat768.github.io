import { p5ctx, hexHdist, hexVdist, vertices, hexWidth } from './const.js';

const Cell = function(x,y, parent) {
  this.x = x;
  this.y = y;
  this.screenX = x * hexHdist;
  this.screenY = y * hexVdist/2;

  this.grid = parent;
  this.visited = false;
  this.visits = 1; //Math.random() > 0.9 ? 2 : 1

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
    ctx.stroke(255)
    // ctx.text(`(${this.x},${this.y})`,this.screenX,this.screenY);
  }

  this.visit = function() {
    this.visited = true;
    this.visits -= 1;
  }
}

export default Cell;