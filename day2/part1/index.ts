import { readFileSync } from "fs";

const data = readFileSync("../input").toString().split("\n");
// const data = readFileSync("input").toString().split("\n");
console.log(
  data.reduce((a, line) => {
    if (line.length === 0) {
      return a;
    }
    const [gameID, rest] = line.split(":");
    let id = parseInt(gameID.substring("Game ".length));
    let invalid = false;
    rest.split(";").forEach((round) => {
      let state: { [key: string]: number } = {
        red: 12,
        green: 13,
        blue: 14,
      };
      round.split(",").forEach((mutate) => {
        mutate = mutate.trim();
        const [value, color] = mutate.split(" ");
        state[color] -= parseInt(value);
      });
      for (const key in state) {
        if (state[key] < 0) {
          invalid = true;
        }
      }
    });
    if (invalid) {
      return a;
    }
    return a + id;
  }, 0)
);
