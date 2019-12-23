var chapters = []
for (i = 0; i < $("a.strong").length; ++i) {
  chapters.push($("a.strong")[i].innerText)
}
chapters
