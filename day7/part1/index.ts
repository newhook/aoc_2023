import { readFileSync } from "fs";

const data = readFileSync("../input").toString().split("\n");
// const data = readFileSync("input1").toString().split("\n");

class HandBet {
  hand: string[];
  bet: number;

  constructor(hand: string[], bet: number) {
    this.hand = hand;
    this.bet = bet;
  }
}

function compareCards(card1: string, card2: string): number {
  const cardValues: { [key: string]: number } = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

  const value1 = cardValues[card1];
  const value2 = cardValues[card2];

  if (value1 > value2) return 1;
  if (value1 < value2) return -1;
  return 0;
}

function cardByCardRank(hand1: string[], hand2: string[]): number {
  for (let i = 0; i < hand1.length; i++) {
    const comparison = compareCards(hand1[i], hand2[i]);
    if (comparison !== 0) {
      return comparison;
    }
  }
  return 0; // If we reach here, the hands are equal
}

enum Rank {
  HICARD,
  PAIR,
  TWO_PAIR,
  THREE,
  FULL_HOUSE,
  FOUR,
  FIVE,
}

function evaluateHand(hand: string[]): Rank {
  const counts = new Map<string, number>();
  hand.forEach((card) => {
    counts.set(card, (counts.get(card) || 0) + 1);
  });

  let rank: Rank = Rank.HICARD;
  let pairCount: number = 0;

  for (let [key, value] of counts.entries()) {
    if (value == 5) {
      rank = Rank.FIVE;
    } else if (value == 4) {
      rank = Rank.FOUR;
    } else if (value == 3) {
      rank = Rank.THREE;
    } else if (value == 2) {
      pairCount++;
    }
  }
  if (rank == Rank.THREE && pairCount == 1) {
    rank = Rank.FULL_HOUSE;
  } else if (pairCount === 2) {
    rank = Rank.TWO_PAIR;
  } else if (pairCount === 1) {
    rank = Rank.PAIR;
  }

  return rank;
}

function rankHand(h1: string[], h2: string[]): number {
  const e1 = evaluateHand(h1);
  const e2 = evaluateHand(h2);

  if (e1 > e2) return 1;
  else if (e1 < e2) return -1;
  else return cardByCardRank(h1, h2);
}

let hands: HandBet[] = data.map((line) => {
  let [hand, bet] = line.split(" ");
  return new HandBet(hand.split(""), Number(bet));
});
hands.sort((a, b) => {
  return rankHand(a.hand, b.hand);
});

let total = hands.reduce((acc, hand, index) => acc + hand.bet * (index + 1), 0);
console.log(total);
