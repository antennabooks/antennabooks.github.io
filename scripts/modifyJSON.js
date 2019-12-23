var books = require("../json/books2.json")
var fs = require("fs")

// remove unnecessary fields
books.forEach(element => {
    delete element.owners
    delete element.users
    delete element._id
    delete element.file
});

// delete restricted chapters
books.forEach(book => {
  console.log(book.chapterDisplayLevel)
  var grantedChapters = book.chapters.filter(function(chapter){
    return chapter.level <= book.chapterDisplayLevel
  })
  console.log(grantedChapters)
  book.chapters = grantedChapters
  delete book.chapterDisplayLevel
});

fs.writeFile("../json/books3.json", JSON.stringify(books), "utf8", function () {
    console.log("Finished")
});



// console.log(books)