import { readFileSync } from "fs";
import { get } from "http";
import { getAllJSDocTags } from "typescript";

const data = readFileSync("../input").toString().split("\n");
// const data = readFileSync("input").toString().split("\n");

class Card {
  n: number;
  winningNumbers: Set<number>;
  numbers: number[];
  numberOfCards: number;

  constructor() {
    this.winningNumbers = new Set<number>();
    this.numbers = [];
    this.numberOfCards = 1;
    this.n = 0;
  }

  addWinningNumber(number: number) {
    this.winningNumbers.add(number);
  }

  addNumber(number: number) {
    this.numbers.push(number);
  }

  incrementNumberOfCards(n: number) {
    this.numberOfCards += n;
  }

  score(): number {
    let score = 0;
    for (const v of this.numbers) {
      if (this.winningNumbers.has(v)) {
        score++;
      }
    }
    return score;
  }
}

const cards: Card[] = [];

data.forEach((line, index) => {
  const [cardraw, numbers] = line.split("|");
  const [_, cardNumbers] = cardraw.split(":");
  const card = new Card();
  card.n = index + 1;
  let have = new Set<string>();
  for (const v of numbers.match(/\d+/g)) {
    card.addNumber(v);
  }
  for (const v of cardNumbers.match(/\d+/g)) {
    card.addWinningNumber(v);
  }
  cards.push(card);
});

for (let i = 0; i < cards.length; i++) {
  let score = cards[i].score();
  for (let j = 0; j < score; j++) {
    let index = i + 1 + j;
    if (index < cards.length) {
      cards[index].incrementNumberOfCards(cards[i].numberOfCards);
    }
  }
}

let count = 0;
for (let i = 0; i < cards.length; i++) {
  count += cards[i].numberOfCards;
}
console.log(count);
