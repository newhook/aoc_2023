import { readFileSync } from "fs";

const data = readFileSync("../input").toString().split("\n");
// const data = readFileSync("input").toString().split("\n");
console.log(
  data.reduce((a, line) => {
    if (line.length === 0) {
      return a;
    }
    const [_, rest] = line.split(":");
    let state: { [key: string]: number } = {};
    rest.split(";").forEach((round) => {
      round.split(",").forEach((mutate) => {
        mutate = mutate.trim();
        const [value, color] = mutate.split(" ");
        const c = parseInt(value);
        if (!state[color] || state[color] < c) {
          state[color] = c;
        }
      });
    });
    let total = 1;
    for (const key in state) {
      total *= state[key];
    }
    return a + total;
  }, 0)
);
