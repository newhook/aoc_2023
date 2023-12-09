import { readFileSync } from "fs";

const data = readFileSync("../input").toString().split("\n");
// const data = readFileSync("input").toString().split("\n");

let time = Number(data[0].substring("Time:".length).replaceAll(" ", ""));
let distance = Number(
  data[1].substring("Distance:".length).replaceAll(" ", "")
);

// console.log(time);
// console.log(distance);

function speed(speed: number, max: number): number {
  return speed * max;
}

function errorRate(time: number, record: number): number {
  let count = 0;
  for (let i = 0; i < time; i++) {
    if (speed(i, time - i) > record) {
      count++;
    }
  }
  return count;
}
console.log(errorRate(time, distance));
