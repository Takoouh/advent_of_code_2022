const input = require("fs").readFileSync("data.txt").toString();

const formatData = (rawData) => {
  return rawData.split("\r\n").map((line) => line.split("").map((char) => Number(char)));
};

const getNbOfVisibleTree = (arrOfTrees, currentTree) => {
  const indexOfLastVisibleTree = arrOfTrees.findIndex((tree) => currentTree <= tree);
  if (indexOfLastVisibleTree === -1) return arrOfTrees.length;
  return indexOfLastVisibleTree + 1;
};

const resolvePuzzle = (data) => {
  console.time("exec time");

  const formattedData = formatData(data);

  let maxSceneryScore = Math.max(
    ...formattedData.map((line, lineIndex) =>
      Math.max(
        ...line.map((currentTree, treeIndex) => {
          if (lineIndex === 0 || treeIndex === 0 || lineIndex === formattedData.length - 1 || treeIndex === line.length - 1) return 0;

          return (
            getNbOfVisibleTree(line.slice(0, treeIndex).reverse(), currentTree) *
            getNbOfVisibleTree(line.slice(treeIndex + 1, line.length), currentTree) *
            getNbOfVisibleTree(
              formattedData
                .slice(0, lineIndex)
                .map((treeRow) => treeRow[treeIndex])
                .reverse(),
              currentTree
            ) *
            getNbOfVisibleTree(
              formattedData.slice(lineIndex + 1, formattedData.length).map((treeRow) => treeRow[treeIndex]),
              currentTree
            )
          );
        })
      )
    )
  );

  console.log("THE HIGHEST SCENERY SCORE IS " + maxSceneryScore);
  console.timeEnd("exec time");
};

resolvePuzzle(input);
