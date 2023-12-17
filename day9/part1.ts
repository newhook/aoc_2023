import { readFileSync } from "fs";

const filename = process.argv[2];
const data = readFileSync(filename).toString().split("\n");

let numbers = data.map((line) => {
  var numbers: number[] = [];
  const matches = line.match(/-?\d+/g);
  if (matches) {
    for (let n of matches) {
      numbers.push(Number(n));
    }
  }
  return numbers;
});

function predict(numbers: number[]): number {
  var next: number[] = [];
  let finish = true;
  for (let i = 0; i < numbers.length - 1; i++) {
    const n = numbers[i + 1] - numbers[i];
    if (n != 0) {
      finish = false;
    }
    next.push(n);
  }
  if (finish) {
    return numbers[numbers.length - 1];
  }
  return numbers[numbers.length - 1] + predict(next);
}

console.log(numbers.reduce((a, b) => a + predict(b), 0));
