import { readFileSync } from "fs";

const data = readFileSync("../input").toString().split("\n");
// const data = readFileSync("input").toString().split("\n");

let times: number[] = [];
let distance: number[] = [];

for (const v of data[0].substring("Time:".length).match(/\d+/g)) {
  times.push(Number(v));
}

for (const v of data[1].substring("Distance:".length).match(/\d+/g)) {
  distance.push(Number(v));
}

function speed(speed: number, max: number): number {
  return speed * max;
}

function errorRate(time: number, record: number): number {
  let count = 0;
  for (let i = 0; i < time; i++) {
    // console.log(`${time} ${record} ${speed(i, time - i)}`);
    if (speed(i, time - i) > record) {
      count++;
    }
  }
  return count;
}
let rates: number[] = [];
for (let i = 0; i < times.length; i++) {
  rates.push(errorRate(times[i], distance[i]));
}
console.log(rates);
console.log(rates.reduce((a, b) => a * b, 1));
