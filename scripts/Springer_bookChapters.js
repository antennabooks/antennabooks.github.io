var titles = $("p.title")
var chapters = [] 
for(i=0; i<titles.length; ++i){ chapters.push($(titles[i]).text())}
chapters