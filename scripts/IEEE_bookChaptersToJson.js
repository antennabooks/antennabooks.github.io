
const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
  input: fs.createReadStream('chapters.txt'),
  // output: process.stdout,
  console: false
});

var chapters = []
readInterface.on('line', function (line) {
  chapters.push({
    level:1,
    title: line.replace(line.split(": ")[0] + ": ", "")
  })
});

readInterface.on('close', function () {
  fs.writeFile("chapters.json", JSON.stringify(chapters), "utf8", function () {
    console.log("Finished")
  });
});
