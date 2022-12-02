const input = require("fs").readFileSync("data.txt").toString();

const formatData = (rawData) => {
  return rawData.split("\r\n");
};

const gameData = {
  A: {
    name: "Rock",
    pointValue: 1,
    loseTo: "B",
    winTo: "C",
  },
  B: {
    name: "Paper",
    pointValue: 2,
    loseTo: "C",
    winTo: "A",
  },
  C: {
    name: "Scissors",
    pointValue: 3,
    loseTo: "A",
    winTo: "B",
  },
};

const matchPossibleValue = {
  X: 0,
  Y: 3,
  Z: 6,
};

const solvePuzzle = (data) => {
  console.time("executingTime");

  const formattedData = formatData(data);

  const totalPoint = formattedData.reduce((pointSum, currentMatch) => {
    const moves = currentMatch.split(" ");
    const elfMove = moves[0];
    const matchResult = moves[1];
    let moveValue;

    if (matchResult === "X") moveValue = gameData[gameData[elfMove].winTo].pointValue;
    else if (matchResult === "Y") moveValue = gameData[elfMove].pointValue;
    else moveValue = gameData[gameData[elfMove].loseTo].pointValue;

    const matchValue = matchPossibleValue[matchResult];
    return pointSum + matchValue + moveValue;
  }, 0);

  console.log("The total Point of your matches is " + totalPoint);

  console.timeEnd("executingTime");
};

solvePuzzle(input);
