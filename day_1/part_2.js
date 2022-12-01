let input = require("fs").readFileSync("./data.txt").toString();

const formatElfData = (rawData) => {
  return rawData.split("\r\n");
};

const resolvePuzzle = (data) => {
  console.time("time");
  const sumByElfList = [];
  let currentElfIndex = 0;
  // WE FORMAT THE DATA SO ITS USABLE
  const formattedData = formatElfData(data);

  formattedData.forEach((calorie) => {
    if (!calorie) {
      currentElfIndex++;
    } else {
      if (!sumByElfList[currentElfIndex]) {
        sumByElfList.push(0);
      }
      sumByElfList[currentElfIndex] += Number(calorie);
    }
  });

  let caloriesOfTopThreeElf = 0;

  const sortedListOfElf = sumByElfList.sort((a, b) => b - a);

  for (let i = 0; i < 3; i++) {
    console.log("THE ELF NUMBER " + (i + 1) + " HAS " + sortedListOfElf[i]);
    caloriesOfTopThreeElf += sortedListOfElf[i];
  }

  console.info("THE TOP THREE ELVES CARRIES " + caloriesOfTopThreeElf + " CALORIES");

  console.timeEnd("time of execution");
};

resolvePuzzle(input);
