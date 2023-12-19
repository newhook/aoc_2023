import { readFileSync } from "fs";

const filename = process.argv[2];
const data = readFileSync(filename).toString().split("\n");

class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString(): string {
    return `(${this.x},${this.y})`;
  }
}

function north(p: Position): Position {
  return new Position(p.x, p.y - 1);
}

function east(p: Position): Position {
  return new Position(p.x + 1, p.y);
}

function west(p: Position): Position {
  return new Position(p.x - 1, p.y);
}

function south(p: Position): Position {
  return new Position(p.x, p.y + 1);
}

class Node {
  pos: Position;
  adj: Position[];

  constructor(pos: Position) {
    this.pos = pos;
    this.adj = [];
  }

  add(pos: Position) {
    if (this.adj.find((p) => p.x === pos.x && p.y === pos.y)) {
      return;
    }
    this.adj.push(pos);
  }
}

const pipeDirections: { [key: string]: ((p: Position) => Position)[] } = {
  ".": [],
  "-": [east, west],
  "|": [south, north],
  L: [north, east],
  J: [north, west],
  "7": [south, west],
  F: [south, east],
};

let start: Position;

let maxY = data.length;
let maxX = 0;
data.forEach((line, y) => {
  let count = line.split("").length;
  if (count > maxX) {
    maxX = count;
  }
});

let graph: Node[][] = new Array<Node[]>(maxY);
for (let y = 0; y < maxY; y++) {
  graph[y] = new Array<Node>(maxX);
}

data.forEach((line, y) => {
  line.split("").forEach((c, x) => {
    if (c === ".") {
      return;
    }
    let p = new Position(x, y);
    let node = graph[p.y][p.x];
    if (!node) {
      node = new Node(p);
      graph[p.y][p.x] = node;
    }
    if (c === "S") {
      start = p;
    } else {
      const directions = pipeDirections[c];
      if (directions) {
        directions.forEach((direction) => {
          let pos = direction(p);
          if (pos.x < 0 || pos.x >= maxX || pos.y < 0 || pos.y >= maxY) {
            return;
          }
          node.add(pos);
        });
      }
    }
  });
});

let startNode = graph[start.y][start.x];
for (let pos of [south(start), north(start), east(start), west(start)]) {
  if (pos.x < 0 || pos.x >= maxX || pos.y < 0 || pos.y >= maxY) {
    continue;
  }
  let node = graph[pos.y][pos.x];
  if (node) {
    for (let adj of node.adj) {
      if (adj.x === start.x && adj.y === start.y) {
        startNode.add(pos);
      }
    }
  }
}

interface PositionDist {
  readonly p: Position;
  readonly dist: number;
}

function bfs(pos: Position): number {
  let visited = new Set<string>();
  visited.add(pos.toString());

  let queue: PositionDist[] = [];
  queue.push({ p: pos, dist: 0 });

  let maxDist = 0;
  while (queue.length > 0) {
    let top = queue.shift();
    maxDist = Math.max(maxDist, top.dist);
    const node = graph[top.p.y][top.p.x];
    for (let adj of node.adj) {
      if (!visited.has(adj.toString())) {
        visited.add(adj.toString());
        queue.push({ p: adj, dist: top.dist + 1 });
      }
    }
  }
  return maxDist;
}

console.log(bfs(start));
