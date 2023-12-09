import { readFileSync } from "fs";

const data = readFileSync("../input").toString().split("\n");
console.log(
  data.reduce((a, line) => {
    const digits = line.replace(/\D/g, "");
    const sum = parseInt(digits[0] + digits[digits.length - 1]);
    // console.log(
    //   `line=${line} digits=${digits} sum=${sum} a=${a} next=${a + sum}`
    // );
    return a + sum;
  }, 0)
);
