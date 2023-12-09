import { readFileSync } from "fs";

// eighthree = 83
// sevenine = 79

const data = readFileSync("../input").toString().split("\n");
// const data = readFileSync("input").toString().split("\n");
const textToNumberReplacements = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
console.log(
  data.reduce((a, line) => {
    if (line.length == 0) {
      return a;
    }
    const orig = line;
    let result = "";
    for (let i = 0; i < line.length; i++) {
      const suffix = line.substring(i);
      let match = false;
      for (const [key, value] of Object.entries(textToNumberReplacements)) {
        if (suffix.startsWith(key)) {
          result = result + value.toString();
          match = true;
          break;
        }
      }
      if (!match) {
        result = result + line[i];
      }
    }

    const digits = result.replace(/\D/g, "");
    const sum = parseInt(digits[0] + digits[digits.length - 1]);
    console.log(
      `input=${line} result=${result} digits=${digits} sum=${sum} a=${a} next=${
        a + sum
      }`
    );
    return a + sum;
  }, 0)
);
