const input = require("fs").readFileSync("data.txt").toString();

const formatData = (rawData) => {
  return rawData.replace("$ ", "").split("\r\n$ ");
};

const resolvePuzzle = (data) => {
  console.time("exec time");
  const fileList = [];
  let currentPath = [];

  const formattedData = formatData(data);

  formattedData.forEach(line => {
    const splittedCmd = line.split("\r\n")
    const cmd = splittedCmd[0].split(' ')[0]
        if(cmd === "cd") {
          const path = splittedCmd[0].split(' ')[1]
            if(path === ".."){
                currentPath.pop();
            } else if(path === "/") {
              currentPath = ["/"]
            } else {
              currentPath.push(path)
            }
        } else if(cmd === "ls") {
          if(!fileList.find((file) => file.path === currentPath.join('/'))) {
        
          const details = splittedCmd.slice(1)
            const content = {
              path : currentPath.join('/'),
              dir: [],
              file: [],
              size: 0,
            }            
            details.forEach(occurence =>  {
              const splittedOccurence = occurence.split(" ")
              if(splittedOccurence[0] === "dir") content.dir.push(splittedOccurence[1])
              else{
                 content.file.push(splittedOccurence[0])
                content.size+= Number(splittedOccurence[0])
                }
            })
            for(let i=currentPath.length - 1; i>0 ; i--){
              const previousPath = currentPath.slice(0,i).join('/')
              fileList.find(dir => dir.path === previousPath).size+= content.size
            }

            fileList.push(content)
          }
        }
    
  })

const totalOfFileToDelete = fileList.filter(dir => dir.size  <= 100000).reduce((acc, current) => acc+= current.size, 0)

  console.log("THERE SIZE OF FILES IS " + totalOfFileToDelete);
  console.timeEnd("exec time");
};

resolvePuzzle(input);
