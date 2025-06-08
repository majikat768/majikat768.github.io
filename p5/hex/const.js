const cell_size = 12;
const column_count = 48;
const row_count = 64;
const screenW = cell_size * column_count;
const screenH = cell_size * row_count;

const bg_color = 51;

const cos = Math.cos;
const sin = Math.sin;
const PI = Math.PI;
const sqrt = Math.sqrt;

const hexWidth = sqrt(3) * cell_size;
const hexHeight = 2 * cell_size;
const hexVdist = 3 / 4 * hexHeight;
const hexHdist = 3 / 4 * hexWidth;

const vertices = [];

const angles = [
  30,
  90,
  150,
  210,
  270,
  330
]

const angle2direction = {
  30:{x:1,y:-1},
  90:{x:0,y:-2},
  150:{x:-1,y:-1},
  210:{x:-1,y:1},
  270:{x:0,y:2},
  330:{x:1,y:1}
}
const direction2angle = function(x,y) {
  if(x > 0) {
    if(y > 0) return 330;
    return 30;
  } else if(x < 0) {
    if(y > 0) return 210;
    return 150;
  }
  if(y > 0) return 270;
  return 90;
}

const neighbor_directions = [
  {x:-1,y:-1},
  {x:1,y:-1},
  {x:-1,y:1},
  {x:1,y:1},
  {x:0,y:2},
  {x:0,y:-2},
];

const p5ctx = {};

for (let i = 0; i <= 2 * PI; i += PI / 3) {
  vertices.push({
    x: cos(i), y: sin(i)
  })
}

const setContext = (p) => {
  p5ctx.context = p;
} 

export {
  angles,
  angle2direction,
  direction2angle,
  hexVdist,
  hexHdist,
  hexWidth,
  hexHeight,
  vertices,
  cell_size,
  column_count,
  row_count,
  screenW,
  screenH,
  bg_color,
  p5ctx,
  setContext,
  neighbor_directions
} 