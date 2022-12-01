let input = require("fs").readFileSync("./data.txt").toString();

const formatElfData = (rawData) => {
  return rawData.split("\r\n");
};

const resolvePuzzle = (data) => {
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

  let caloriesOfElfWithTheMostCalories = sumByElfList.sort((a, b) => b - a)[0];

  console.info("THE ELF WITH MOST CALORIES IS ELF NUMBER " + caloriesOfElfWithTheMostCalories);
};

resolvePuzzle(input);
