import { readFileSync } from "fs";

const data = readFileSync("../input").toString().split("\n");
// const data = readFileSync("input").toString().split("\n");
console.log(data.reduce((a, line) => {
  let score = 0
  const [cardraw, numbers ] = line.split("|")
  const [_, cardNumbers] = cardraw.split(":")
    let have = new Set<string>();
    for(const v of numbers.match(/\d+/g)) {
      have.add(v);
    }
    for(const v of cardNumbers.match(/\d+/g)) {
      if(have.has(v)) {
        if (score === 0) {
          score = 1
        } else {
          score *= 2
        }
      }
    }
  return a + score
}, 0));