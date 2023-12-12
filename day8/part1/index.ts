import { readFileSync } from "fs";

const filename = process.argv[2];
const data = readFileSync(filename).toString().split("\n");

const map = new Map<string, string[]>();
const directions = data.shift();
data
  .filter((line) => line.length > 0)
  .forEach((line) => {
    const match = line.match(/(\w+)\s*=\s*\((\w+),\s*(\w+)\)/);
    if (match) {
      const [, variable, value1, value2] = match;
      map.set(variable, [value1, value2]);
    }
  });

let di = 0;
let curr = "AAA";
let steps = 0;

while (curr !== "ZZZ") {
  steps++;
  const [left, right] = map.get(curr);
  curr = directions[di] === "L" ? left : right;
  di = (di + 1) % directions.length;
}

console.log(steps);
