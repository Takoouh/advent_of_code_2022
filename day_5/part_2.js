const { cp } = require("fs");
const { resolve } = require("path");

const input = require("fs").readFileSync("data.txt").toString();

const formatData = (rawData) => {
  return rawData.split("\r\n");
};


const buildSchemaFromData = (data) => {
  const schema = [[],[],[],[],[],[],[],[],[]]
  data.reverse().map((line, index) => {
    const splittedLine = line.split('');
    let schemaIndex = 0;
    for(i=1;i<=splittedLine.length; i+=4){
      if(splittedLine[i] !== " ") schema[schemaIndex].push(splittedLine[i])
      schemaIndex++
    }
  })
  return schema
}

const resolvePuzzle = (data) => {
  console.time("exec time");

  const formattedData = formatData(data);
  const dataSplitIndex = formattedData.findIndex(l=> l.length === 0)
  const schema = buildSchemaFromData(formattedData.slice(0,dataSplitIndex-1))
  formattedData.slice(dataSplitIndex+1).forEach(query => {
    const querySplitted = query.replace('move ', '').replace(' from ', '-').replace(' to ', '-').split('-').map(v=> Number(v))

    const numberOfItemToMove = querySplitted[0]
    const arrayToDeleteIndex = querySplitted[1] -1
    const arrayToAddIndex = querySplitted[2] -1

    const movedInRow = [...schema[arrayToAddIndex], ...schema[arrayToDeleteIndex].slice(numberOfItemToMove * (-1))];
    const movedOutRow = [...schema[arrayToDeleteIndex].slice(0, schema[arrayToDeleteIndex].length - numberOfItemToMove)];

    schema[arrayToAddIndex] = movedInRow;
    schema[arrayToDeleteIndex] = movedOutRow;
    
  })
  
  const cratesOnTop = schema.map(row=> row[row.length -1]).join('')
  console.log("THE CRATES ON TOP ARE " + cratesOnTop)
  console.timeEnd("exec time");
};

resolvePuzzle(input);
