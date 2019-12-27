
const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
  input: fs.createReadStream('chapters.txt'),
  // input: fs.createReadStream('chapters_1.txt'),
  // output: process.stdout,
  console: false
});

var lines = []
readInterface.on('line', function (line) {
  lines.push(line)
});


var chapters = []
// readInterface.on('line', function (line) {
//   chapters.push({
//     // level:1,
//     level: 2,
//     //title: line.replace(line.split(": ")[0] + ": ", "")
//     title: line
//   })
// });

readInterface.on('close', function () {
  // fs.writeFile("chapters.json", JSON.stringify(chapters), "utf8", function () {
  //   console.log("Finished")
  // });
  // console.log(lines)
  for(i=0; i<lines.length; i += 4){
    console.log(lines[i+1].split(": ")[1])
    console.log(lines[i+2].split(": ")[1])
    chapters.push({
      title: lines[i+1].split(": ")[1],
      level: lines[i+2].split(": ")[1]
    })
  }
   fs.writeFile("chapters.json", JSON.stringify(chapters), "utf8", function () {
    console.log("Finished")
  });
});
