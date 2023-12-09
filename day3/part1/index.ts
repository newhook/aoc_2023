import { readFileSync } from "fs";

const data = readFileSync("../input").toString().split("\n");
// const data = readFileSync("input").toString().split("\n");
const w = data[0].length;
const h = data.length;

function isSymbol(x: number, y: number): boolean {
  if (y < 0 || y >= h || x < 0 || x >= w) {
    return false;
  }
  let c = data[y][x];
  return !((c >= "0" && c <= "9") || c == ".");
}

function hasAdjacentSymbol(
  x: number,
  y: number,
  partNumberLength: number
): boolean {
  const offsets = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  for (let i = 0; i < partNumberLength; i++) {
    for (const offset of offsets) {
      if (isSymbol(x + i + offset[0], y + offset[1])) {
        return true;
      }
    }
  }
  return false;
}

let total = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; ) {
    const match = data[y].substring(x).match(/^\d+/);
    if (match === null) {
      x++;
    } else {
      if (hasAdjacentSymbol(x, y, match[0].length)) {
        total += parseInt(match[0]);
      }
      x += match[0].length;
    }
  }
}
console.log(total);

// 520135
