const input = require("fs").readFileSync("data.txt").toString();

const formatData = (rawData) => {
  return rawData.split("\r\n");
};

const itemList = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const solvePuzzle = (data) => {
  console.time("exec time");
  const rucksacks = formatData(data);

  const commonItemTypes = rucksacks.map((rucksack) => {
    let commonItemType;
    const compartmentLength = rucksack.length / 2;
    const firstCompartment = rucksack.slice(0, compartmentLength).split("");
    const secondCompartment = rucksack.slice(compartmentLength, rucksack.length).split("");

    firstCompartment.forEach((itemType) => {
      if (secondCompartment.includes(itemType)) commonItemType = itemType;
    });
    return commonItemType;
  });

  const prioritySum = commonItemTypes.reduce((acc, currentValue) => (acc += itemList.findIndex((item) => item === currentValue) + 1), 0);

  console.log("THE SUM OF ITEM PRIORITIES IS " + prioritySum);

  console.timeEnd("exec time");
};

solvePuzzle(input);
