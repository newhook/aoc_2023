import { readFileSync } from "fs";

const data = readFileSync("../input").toString().split("\n");
// const data = readFileSync("input").toString().split("\n");

const max = 100;
class FromToMap {
  name: string;
  mapSource: number[];
  mapDestination: number[];
  ranges: number[];
  constructor(name: string) {
    this.name = name;
    this.mapSource = [];
    this.mapDestination = [];
    this.ranges = [];
  }

  addMap(destination: number, source: number, range: number) {
    this.mapSource.push(source);
    this.mapDestination.push(destination);
    this.ranges.push(range);
  }

  map(val: number): number {
    for (let i = 0; i < this.mapSource.length; i++) {
      if (
        val >= this.mapSource[i] &&
        val < this.mapSource[i] + this.ranges[i]
      ) {
        return this.mapDestination[i] + val - this.mapSource[i];
      }
    }
    return val;
  }
}

let maps: { [key: string]: FromToMap } = {};
let currentMap: FromToMap | undefined;

let state = 0;
let seeds: number[] = [];
data.forEach((line) => {
  if (state == 0) {
    if (line.startsWith("seeds:")) {
      for (const v of line.substring("seeds:".length).match(/\d+/g)) {
        seeds.push(Number(v));
      }
    } else {
      const i = line.indexOf("map:");
      if (i != -1) {
        let name = line.substring(0, i).trim();
        state = 1;
        currentMap = new FromToMap(name);
        maps[name] = currentMap;
      }
    }
  } else if (state == 1) {
    if (line.length === 0) {
      state = 0;
      return;
    }
    let n = [];
    for (const v of line.match(/\d+/g)) {
      n.push(v);
    }
    currentMap?.addMap(Number(n[0]), Number(n[1]), Number(n[2]));
  }
});

// console.log(maps['seed-to-soil'])

let states = [
  "seed-to-soil",
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location",
];

let min = Infinity;
console.log(seeds.length);
for (let i = 0; i < seeds.length; i += 2) {
  const seedStart = seeds[i];
  const range = seeds[i + 1];
  console.log(seedStart, range);
  for (let seed = seedStart; seed < seedStart + range; seed++) {
    let val = seed;
    for (const state of states) {
      val = maps[state].map(val);
    }
    if (val < min) {
      min = val;
    }
  }
}
console.log(min);
