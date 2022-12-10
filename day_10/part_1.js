const input = require("fs").readFileSync("data.txt").toString();

const formatData = (rawData) => {
  return rawData.split("\r\n").map((line) => line.split(" "));
};

const resolvePuzzle = (data) => {
  console.time("exec time");

  const formattedData = formatData(data);

  const cyclesToCheck = [20, 60, 100, 140, 180, 220];

  const cycleLoop = [];
  formattedData.forEach((line) => {
    cycleLoop.push(cycleLoop[cycleLoop.length - 1] || 1);
    if (line[0] === "addx") cycleLoop.push(cycleLoop[cycleLoop.length - 1] + Number(line[1]));
  });

  console.log(cycleLoop.slice(200, 220));

  const sumOfXvaluesAtCycles = cyclesToCheck.reduce((acc, current) => {
    console.log(cycleLoop[current - 2], cycleLoop[current - 2] * current);
    return (acc += cycleLoop[current - 2] * current);
  }, 0);
  console.log("THIS SUM OF THE X VALUES ON CORRECT CYCLE IS " + sumOfXvaluesAtCycles);
  console.timeEnd("exec time");
};

resolvePuzzle(input);
