
const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
  // input: fs.createReadStream('chapters.txt'),
  input: fs.createReadStream('chapters_1.txt'),
  // output: process.stdout,
  console: false
});

var chapters = []
readInterface.on('line', function (line) {
  chapters.push({
    // level:1,
    level: 2,
    //title: line.replace(line.split(": ")[0] + ": ", "")
    title: line
  })
});

readInterface.on('close', function () {
  fs.writeFile("chapters.json", JSON.stringify(chapters), "utf8", function () {
    console.log("Finished")
  });
});
