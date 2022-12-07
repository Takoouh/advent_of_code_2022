const input = require("fs").readFileSync("data.txt").toString();

const resolvePuzzle = (data) => {
  console.time("exec time");

  let firstStartOfPacketIndex = 0;
  let cumulUniqChar = "";

  const splittedString = data.split('');

  splittedString.forEach((char, index) => {
    if(firstStartOfPacketIndex === 0){
        if(cumulUniqChar.includes(char)){
            cumulUniqChar = "";
        }
        cumulUniqChar+=char;
    
        if(cumulUniqChar.length === 14){
            firstStartOfPacketIndex = index + 1;
        }
    }
  }) 


  console.log("THE FIRST START-OF-PACKET IS " + firstStartOfPacketIndex + " WITH THIS STRING : " + cumulUniqChar)
  console.timeEnd("exec time");
};

resolvePuzzle(input);
