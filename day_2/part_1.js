const input = require("fs").readFileSync("data.txt").toString();

const formatData = (rawData) => {
  return rawData.split("\r\n");
};

const gameData = {
  X: {
    name: "Rock",
    pointValue: 1,
    loseTo: "B",
    elfEquivalent: "A",
  },
  Y: {
    name: "Paper",
    pointValue: 2,
    loseTo: "C",
    elfEquivalent: "B",
  },
  Z: {
    name: "Scissors",
    pointValue: 3,
    loseTo: "A",
    elfEquivalent: "C",
  },
};

const solvePuzzle = (data) => {
  console.time("executingTime");

  const formattedData = formatData(data);

  const totalPoint = formattedData.reduce((pointSum, currentMatch) => {
    const moves = currentMatch.split(" ");
    const elfMove = moves[0];
    const myMove = moves[1];
    const moveValue = gameData[myMove].pointValue;
    const matchValue = gameData[myMove].loseTo === elfMove ? 0 : gameData[myMove].elfEquivalent === elfMove ? 3 : 6;
    return pointSum + matchValue + moveValue;
  }, 0);

  console.log("The total Point of your matches is " + totalPoint);

  console.timeEnd("executingTime");
};

solvePuzzle(input);
