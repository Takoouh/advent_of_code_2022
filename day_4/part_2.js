const { resolve } = require("path");

const input = require("fs").readFileSync("data.txt").toString();

const formatData = (rawData) => {
  return rawData.split("\r\n");
};

const resolvePuzzle = (data) => {
  console.time("exec time");

  const formattedData = formatData(data);

  let overlapedPairCount = 0;

  formattedData.forEach((assignements) => {
    const splittedAssignements = assignements
      .split(",")
      .map((elfSections) => elfSections.split("-").map((elfSection) => Number(elfSection)));

    const isOverlaping =
      (splittedAssignements[0][0] >= splittedAssignements[1][0] && splittedAssignements[0][0] <= splittedAssignements[1][1]) ||
      (splittedAssignements[0][1] <= splittedAssignements[1][1] && splittedAssignements[0][1] >= splittedAssignements[1][0]) ||
      (splittedAssignements[1][0] >= splittedAssignements[0][0] && splittedAssignements[1][0] <= splittedAssignements[0][1]) ||
      (splittedAssignements[1][1] <= splittedAssignements[0][1] && splittedAssignements[1][1] >= splittedAssignements[0][1]);

    if (isOverlaping) overlapedPairCount++;
  });

  console.log("THERE IS " + overlapedPairCount + " OVERLAPED PAIR");
  console.timeEnd("exec time");
};

resolvePuzzle(input);
