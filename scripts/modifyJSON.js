var books = require("../json/books2.json")
var fs = require("fs")

books.forEach(element => {
    delete element.owners
    delete element.users
    delete element._id
    delete element.file
});

fs.writeFile("../json/books3.json", JSON.stringify(books), "utf8", function () {
    console.log("Finished")
});

console.log(books)