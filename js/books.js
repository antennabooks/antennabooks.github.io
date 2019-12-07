function delay(callback, ms) {
  var timer = 0;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      callback.apply(context, args);
    }, ms || 0);
  };
}

function ordinalSuffix(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

function createBookCards(books) {
  $.get('/old/database/api/v1', function(user) {
    $('.grid__item').remove()
    $('.content__item').remove()
    var sortedBooks = books.sort(function(b1, b2) {
      return b2.year - b1.year;
    })
    sortedBooks.forEach(function(book) {
      var el = $("<a />", {
        class: 'grid__item',
        href: '#'
      });
      var el_h0 = $('<h2 />', {
        class: 'title title--preview',
        text: book.title
      })
      var el_div0 = $('<div />', {
        class: 'loader'
      })
      var el_span0 = $('<span />', {
        class: 'category',
        text: book.author + " @ " + book.publisher
      })
      var el_div1 = $('<div />', {
        class: 'meta meta--preview'
      })
      var el_div1_img0 = $('<img />', {
        class: 'meta__avatar',
        src: '/old/filesystem/api/v1/files/' + book.cover
      })
      var el_div1_span0 = $('<span />', {
        class: 'meta__date',
        text: 'Published in ' + book.year
      })
      var el_div1_span1 = $('<span />', {
        class: 'meta__reading-time',
        text: ordinalSuffix(book.edition) + ' Edition'
      })
      var el_div1_span1_i0 = $('<i />', {
        class: 'fa fa-clock-o'
      })

      el.append(el_h0)
      el.append(el_div0)
      el.append(el_span0)
      el_div1.append(el_div1_img0)
      el_div1.append(el_div1_span0)
      el_div1.append(el_div1_span1)
      el.append(el_div1)
      el.appendTo($(".grid"))

      var el2 = document.createElement('article')
      var el2_span0 = document.createElement('span')
      var el2_h0 = document.createElement('h2')
      var el2_div0 = document.createElement('div')
      var el2_div0_img0 = document.createElement('img')
      var el2_div0_span0 = document.createElement('span')
      var el2_div0_span1 = document.createElement('span')
      var el2_div0_span2 = document.createElement('span')
      var el2_div0_a0 = document.createElement('a')
      var el2_div0_a1 = document.createElement('a')
      var el2_p0 = document.createElement('p')

      el2.className = 'content__item'
      el2_span0.className = 'category category--full'
      el2_h0.className = 'title title--full'
      el2_div0.className = 'meta meta--full'
      el2_p0.className = ''
      el2_div0_img0.className = 'meta__avatar'
      el2_div0_span0.className = 'meta__author'
      el2_div0_span1.className = 'meta__date'
      el2_div0_span2.className = 'meta__reading-time'
      el2_div0_a0.className = 'meta__misc meta__misc--seperator'
      el2_div0_a1.className = 'meta__misc'

      el2_span0.innerText = book.author + " @ " + book.publisher
      el2_h0.innerText = book.title
      el2_p0.innerText = book.description
      el2_div0_img0.setAttribute('src', '/old/filesystem/api/v1/files/' + book.cover)
      el2_div0_span0.innerText = book.author + " @ " + book.publisher
      el2_div0_span1.innerText = 'Published in ' + book.year
      el2_div0_span2.innerText = ordinalSuffix(book.edition) + ' Edition'
      el2_div0_a0.setAttribute('href', book.publisherSite)
      el2_div0_a0.setAttribute('target', '__blank')
      el2_div0_a0.innerHTML = '<i class="fas fa-globe"></i> Visit publisher ' + book.publisher
      el2_div0_a1.setAttribute('href', book.amazonSite)
      el2_div0_a1.setAttribute('target', '__blank')
      el2_div0_a1.innerHTML = '<i class="fab fa-amazon"></i> Buy from Amazon'

      el2_div0.appendChild(el2_div0_img0)
      el2_div0.appendChild(el2_div0_span0)
      el2_div0.appendChild(el2_div0_span1)
      el2_div0.appendChild(el2_div0_span2)
      el2_div0.appendChild(el2_div0_a0)
      el2_div0.appendChild(el2_div0_a1)
      el2.appendChild(el2_span0)
      el2.appendChild(el2_h0)
      el2.appendChild(el2_div0)
      el2.appendChild(el2_p0)

      var el2_ul = document.createElement('ul')
      el2_ul.className = 'ui list'
      el2_ul.setAttribute('file', book.file)
      book.chapters.forEach(function(chapter) {
        if (chapter.level <= book.chapterDisplayLevel || (user && user.username == 'hsyn')) {
          if (chapter.level == 1) {
            var el2_ul_li = document.createElement('li')
            el2_ul_li.setAttribute('style', 'padding-top:0.5em;')
            el2_ul_li.setAttribute('page', chapter.page)
            el2_ul_li.innerText = chapter.title
            el2_ul.appendChild(el2_ul_li)
          }
          if (chapter.level > 1) {
            var el2_ul_ul = document.createElement('ul')
            el2_ul_ul.setAttribute('style', 'padding-top:0em;padding-bottom:0em;')
            var el2_ul_ul_li = document.createElement('li')
            el2_ul_ul_li.setAttribute('page', chapter.page)
            el2_ul_ul_li.innerText = chapter.title
            el2_ul_ul.appendChild(el2_ul_ul_li)
            el2_ul.appendChild(el2_ul_ul)
          }
        }
      })
      el2.appendChild(el2_ul)
      document.querySelector('.scroll-wrap').appendChild(el2)
      initGrid()
    })
  })
}

var allBooks = []
ready(function() {
  $.get('/old/database/api/v1/portfolios/books', function(books) {
    createBookCards(books)
    // search and filter books
    var fuseOptions = {
      keys: ['title', 'chapters.title'],
      threshold: 0.1,
      distance: 1000
    }
    var fuse = new Fuse(books, fuseOptions)
    $('.ui input').keyup(delay(function(e) {
      if (this.value) {
        createBookCards(fuse.search(this.value))
        //console.log(fuse.search($(e.target).val()))
      } else {
        createBookCards(books)
      }
    }, 500))
  })
})
