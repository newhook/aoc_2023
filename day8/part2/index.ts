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

let starts: string[] = [];
map.forEach((value, key) => {
  if (key.endsWith("A")) {
    starts.push(key);
  }
});

function solve(curr: string): number {
  let di = 0;
  let steps = 0;
  while (!curr.endsWith("Z")) {
    steps++;
    const [left, right] = map.get(curr);
    curr = directions[di] === "L" ? left : right;
    di = (di + 1) % directions.length;
  }
  return steps;
}

let steps: number[] = [];
for (let start of starts) {
  steps.push(solve(start));
}
console.log(steps);

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

let lcmValue = steps.reduce(lcm);
console.log(lcmValue);
