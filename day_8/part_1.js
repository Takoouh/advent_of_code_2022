const input = require("fs").readFileSync("data.txt").toString();

const formatData = (rawData) => {
  return rawData.split("\r\n").map((line) => line.split("").map((char) => Number(char)));
};

const getSumOfArray = (arr) => arr.reduce((acc, current) => (acc += current), 0);

const areAllTreesSmallerThanCurrentTree = (arrOfTrees, currentTree) => arrOfTrees.every((tree) => currentTree > tree);

const resolvePuzzle = (data) => {
  console.time("exec time");

  const formattedData = formatData(data);

  let totalTreeSum = getSumOfArray(
    formattedData.map((line, lineIndex) =>
      getSumOfArray(
        line.map((currentTree, treeIndex) => {
          if (lineIndex === 0 || treeIndex === 0 || lineIndex === formattedData.length - 1 || treeIndex === line.length - 1) return 1;

          return areAllTreesSmallerThanCurrentTree(line.slice(0, treeIndex), currentTree) ||
            areAllTreesSmallerThanCurrentTree(line.slice(treeIndex + 1, line.length), currentTree) ||
            areAllTreesSmallerThanCurrentTree(
              formattedData.slice(0, lineIndex).map((treeRow) => treeRow[treeIndex]),
              currentTree
            ) ||
            areAllTreesSmallerThanCurrentTree(
              formattedData.slice(lineIndex + 1, formattedData.length).map((treeRow) => treeRow[treeIndex]),
              currentTree
            )
            ? 1
            : 0;
        })
      )
    )
  );

  console.log("THE NUMBER OF VISIBLE TREE IS " + totalTreeSum);
  console.timeEnd("exec time");
};

const test = "30373\r\n25512\r\n65332\r\n33549\r\n35390";

resolvePuzzle(input);
