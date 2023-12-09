import { readFileSync } from "fs";
import { get } from "http";
import { getAllJSDocTags } from "typescript";

const data = readFileSync("../input").toString().split("\n");
// const data = readFileSync("input").toString().split("\n");
const w = data[0].length;
const h = data.length;

class Span {
  constructor(
    public number: number,
    public x: number,
    public y: number,
    public width: number
  ) {}
  toString(): string {
    return `Span(number: ${this.number}, x: ${this.x}, y: ${this.y}, width: ${this.width})`;
  }
  intersects(x: number, y: number): boolean {
    return x >= this.x && x < this.x + this.width && y === this.y;
  }
}

var spans: Span[] = [];

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; ) {
    const match = data[y].substring(x).match(/^\d+/);
    if (match !== null) {
      spans.push(new Span(parseInt(match[0]), x, y, match[0].length));
      x += match[0].length;
    } else {
      x++;
    }
  }
}
// console.log(spans);

function getAdjacentSpans(x: number, y: number): Span[] {
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

  const adjacentSpans = new Set<Span>();

  for (const offset of offsets) {
    const [dx, dy] = offset;
    spans.forEach((span) => {
      if (span.intersects(x + dx, y + dy)) {
        adjacentSpans.add(span);
      }
    });
  }

  return Array.from(adjacentSpans);
}

let total = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    if (data[y][x] == "*") {
      const adjacet = getAdjacentSpans(x, y);
      if (adjacet.length == 2) {
        total += adjacet[0].number * adjacet[1].number;
      }
    }
  }
}
console.log(total);
