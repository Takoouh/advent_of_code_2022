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

  const rucksacksByThree = [];

  // we regroup elf sacks by three
  rucksacks.forEach((rucksack) => {
    let lastGroupOfThree = rucksacksByThree[rucksacksByThree.length - 1];
    if (!lastGroupOfThree || lastGroupOfThree.length === 3) {
      rucksacksByThree.push([]);
      lastGroupOfThree = rucksacksByThree[rucksacksByThree.length - 1];
    }

    lastGroupOfThree.push(rucksack);
  });

  const itemTypesInAllGroup = rucksacksByThree.map((rucksackGroup) => {
    const firstSack = rucksackGroup[0].split("");
    let commonItemType;
    firstSack.forEach((firstSackItem) => {
      isItemTypeInAllSack = !rucksackGroup
        .slice(1, 3)
        .map((sack) => sack.includes(firstSackItem))
        .some((value) => !value);
      if (isItemTypeInAllSack) commonItemType = firstSackItem;
    });
    return commonItemType;
  });

  const prioritySum = itemTypesInAllGroup.reduce(
    (acc, currentValue) => (acc += itemList.findIndex((item) => item === currentValue) + 1),
    0
  );

  console.log("THE SUM OF ITEM PRIORITIES IS " + prioritySum);

  console.timeEnd("exec time");
};

solvePuzzle(input);
