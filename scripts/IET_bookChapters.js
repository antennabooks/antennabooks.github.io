var chapters = $(".browseItemTitle")
var titles = []
for(i=0; i<chapters.length; ++i){titles.push($(chapters[i]).text().replace("\n", ""))}