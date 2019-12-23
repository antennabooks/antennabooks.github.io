function delay(callback, ms) {
  var timer = 0;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
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
  if (j > 3) {
    return i + "th"
  }
  return i
}

function createBookCards(books) {
  // $.get('/old/database/api/v1', function(user) {
  $('.grid__item').remove()
  $('.content__item').remove()
  var sortedBooks = books.sort(function (b1, b2) {
    return b2.year - b1.year;
  })
  sortedBooks.forEach(function (book) {
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
      src: book.cover
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
    el2_div0_img0.setAttribute('src', book.cover)
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
    user = { username: "anonymous" }
    book.chapters.forEach(function (chapter) {
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
  // })
}

var allBooks = []
ready(function () {
  // $.getJSON('json/books3.json', function (books) {
    var grantedBooks = bookList.filter(function (book) {
      return book.granted
    })
    createBookCards(grantedBooks)
    // search and filter books
    var fuseOptions = {
      keys: ['title', 'chapters.title'],
      threshold: 0.1,
      distance: 1000
    }
    var fuse = new Fuse(grantedBooks, fuseOptions)
    $('.ui input').keyup(delay(function (e) {
      if (this.value) {
        createBookCards(fuse.search(this.value))
        //console.log(fuse.search($(e.target).val()))
      } else {
        createBookCards(grantedBooks)
      }
    }, 500))
  // })
})

var bookList = [
  {
    "cover": "https://media.wiley.com/product_data/coverImage300/66/11186420/1118642066.jpg",
    "title": "Antenna Theory, Analysis and Design",
    "author": "Constantine A. Balanis",
    "publisher": "Wiley",
    "granted": false,
    "publisherSite": "https://www.wiley.com/en-me/Antenna%20Theory%3A%20Analysis%20and%20Design%2C%204th%20Edition-p-9781119178996",
    "amazonSite": "https://www.amazon.com/Antenna-Theory-Analysis-Constantine-Balanis-ebook/dp/B01A0393XG",
    "edition": 4,
    "year": 2015,
    "description": "This book introduces the fundamental principles of antenna theory and explains how to apply them to the analysis, design, and measurements of antennas. Due to the variety of methods of analysis and design, and the different antenna structures available, the applications covered in this book are made to some of the most basic and practical antenna configurations. Among these antenna configurations are linear dipoles; loops; arrays; broadband antennas; aperture antennas; horns; microstrip antennas; and reflector antennas. The text contains sufficient mathematical detail to enable undergraduate and beginning graduate students in electrical engineering and physics to follow the flow of analysis and design. Readers should have a basic knowledge of undergraduate electromagnetic theory, including Maxwell’s equations and the wave equation, introductory physics, and differential and integral calculus.",
    "filename": "00006  Antenna Theory Analysis and Design.pdf",
    "chapters": [
      {
        "level": 1,
        "title": " Preface",
        "page": 15
      },
      {
        "level": 1,
        "title": " About the Companion Website",
        "page": 21
      },
      {
        "level": 1,
        "title": " 1 Antennas",
        "page": 23
      },
      {
        "level": 2,
        "title": " 1.1 Introduction",
        "page": 23
      },
      {
        "level": 2,
        "title": " 1.2 Types of Antennas",
        "page": 25
      },
      {
        "level": 2,
        "title": " 1.3 Radiation Mechanism",
        "page": 29
      },
      {
        "level": 2,
        "title": " 1.4 Current Distribution on a Thin Wire Antenna",
        "page": 37
      },
      {
        "level": 2,
        "title": " 1.5 Historical Advancement",
        "page": 40
      },
      {
        "level": 2,
        "title": " 1.6 Multimedia",
        "page": 43
      },
      {
        "level": 2,
        "title": " References",
        "page": 44
      },
      {
        "level": 1,
        "title": " 2 Fundamental Parameters and Figures-of-Merit of Antennas",
        "page": 47
      },
      {
        "level": 2,
        "title": " 2.1 Introduction",
        "page": 47
      },
      {
        "level": 2,
        "title": " 2.2 Radiation Pattern",
        "page": 47
      },
      {
        "level": 2,
        "title": " 2.3 Radiation Power Density",
        "page": 57
      },
      {
        "level": 2,
        "title": " 2.4 Radiation Intensity",
        "page": 59
      },
      {
        "level": 2,
        "title": " 2.5 Beamwidth",
        "page": 62
      },
      {
        "level": 2,
        "title": " 2.6 Directivity",
        "page": 63
      },
      {
        "level": 2,
        "title": " 2.7 Numerical Techniques",
        "page": 77
      },
      {
        "level": 2,
        "title": " 2.8 Antenna Efficiency",
        "page": 82
      },
      {
        "level": 2,
        "title": " 2.9 Gain, Realized Gain",
        "page": 83
      },
      {
        "level": 2,
        "title": " 2.10 Beam Efficiency",
        "page": 87
      },
      {
        "level": 2,
        "title": " 2.11 Bandwidth",
        "page": 87
      },
      {
        "level": 2,
        "title": " 2.12 Polarization",
        "page": 88
      },
      {
        "level": 2,
        "title": " 2.13 Input Impedance",
        "page": 97
      },
      {
        "level": 2,
        "title": " 2.14 Antenna Radiation Efficiency",
        "page": 101
      },
      {
        "level": 2,
        "title": " 2.15 Antenna Vector Effective Length and Equivalent Areas",
        "page": 103
      },
      {
        "level": 2,
        "title": " 2.16 Maximum Directivity and Maximum Effective Area",
        "page": 108
      },
      {
        "level": 2,
        "title": " 2.17 Friis Transmission Equation and Radar Range Equation",
        "page": 110
      },
      {
        "level": 2,
        "title": " 2.18 Antenna Temperature",
        "page": 118
      },
      {
        "level": 2,
        "title": " 2.19 Multimedia",
        "page": 122
      },
      {
        "level": 2,
        "title": " References",
        "page": 125
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 127
      },
      {
        "level": 1,
        "title": " 3 Radiation Integrals and Auxiliary Potential Functions",
        "page": 149
      },
      {
        "level": 2,
        "title": " 3.1 Introduction",
        "page": 149
      },
      {
        "level": 2,
        "title": " 3.2 The Vector Potential A for an Electric Current Source J",
        "page": 150
      },
      {
        "level": 2,
        "title": " 3.3 The Vector Potential F for A Magnetic Current Source M",
        "page": 152
      },
      {
        "level": 2,
        "title": " 3.4 Electric and Magnetic Fields for Electric (J) and Magnetic (M) Current Sources",
        "page": 153
      },
      {
        "level": 2,
        "title": " 3.5 Solution of the Inhomogeneous Vector Potential Wave Equation",
        "page": 154
      },
      {
        "level": 2,
        "title": " 3.6 Far-Field Radiation",
        "page": 158
      },
      {
        "level": 2,
        "title": " 3.7 Duality Theorem",
        "page": 159
      },
      {
        "level": 2,
        "title": " 3.8 Reciprocity and Reaction Theorems",
        "page": 160
      },
      {
        "level": 2,
        "title": " References",
        "page": 165
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 165
      },
      {
        "level": 1,
        "title": " 4 Linear Wire Antennas",
        "page": 167
      },
      {
        "level": 2,
        "title": " 4.1 Introduction",
        "page": 167
      },
      {
        "level": 2,
        "title": " 4.2 Infinitesimal Dipole",
        "page": 167
      },
      {
        "level": 2,
        "title": " 4.3 Small Dipole",
        "page": 177
      },
      {
        "level": 2,
        "title": " 4.4 Region Separation",
        "page": 180
      },
      {
        "level": 2,
        "title": " 4.5 Finite Length Dipole",
        "page": 186
      },
      {
        "level": 2,
        "title": " 4.6 Half-Wavelength Dipole",
        "page": 198
      },
      {
        "level": 2,
        "title": " 4.7 Linear Elements Near or On Infinite Perfect Electric Conductors (PEC), Perfect Magnetic Conductors (PMC) and Electromagnetic Band-Gap (EBG) Surfaces",
        "page": 201
      },
      {
        "level": 2,
        "title": " 4.8 Ground Effects",
        "page": 225
      },
      {
        "level": 2,
        "title": " 4.9 Computer Codes",
        "page": 238
      },
      {
        "level": 2,
        "title": " 4.10 Multimedia",
        "page": 238
      },
      {
        "level": 2,
        "title": " References",
        "page": 240
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 242
      },
      {
        "level": 1,
        "title": " 5 Loop Antennas",
        "page": 257
      },
      {
        "level": 2,
        "title": " 5.1 Introduction",
        "page": 257
      },
      {
        "level": 2,
        "title": " 5.2 Small Circular Loop",
        "page": 258
      },
      {
        "level": 2,
        "title": " 5.3 Circular Loop of Constant Current",
        "page": 272
      },
      {
        "level": 2,
        "title": " 5.4 Circular Loop with Nonuniform Current",
        "page": 281
      },
      {
        "level": 2,
        "title": " 5.5 Ground and Earth Curvature Effects for Circular Loops",
        "page": 290
      },
      {
        "level": 2,
        "title": " 5.6 Polygonal Loop Antennas",
        "page": 291
      },
      {
        "level": 2,
        "title": " 5.7 Ferrite Loop",
        "page": 292
      },
      {
        "level": 2,
        "title": " 5.8 Mobile Communication Systems Applications",
        "page": 294
      },
      {
        "level": 2,
        "title": " 5.9 Multimedia",
        "page": 294
      },
      {
        "level": 2,
        "title": " References",
        "page": 297
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 299
      },
      {
        "level": 1,
        "title": " 6 Arrays Linear, Planar, and Circular",
        "page": 307
      },
      {
        "level": 2,
        "title": " 6.1 Introduction",
        "page": 307
      },
      {
        "level": 2,
        "title": " 6.2 Two-Element Array",
        "page": 308
      },
      {
        "level": 2,
        "title": " 6.3 N-Element Linear Array Uniform Amplitude and Spacing",
        "page": 315
      },
      {
        "level": 2,
        "title": " 6.4 N-Element Linear Array Directivity",
        "page": 334
      },
      {
        "level": 2,
        "title": " 6.5 Design Procedure",
        "page": 340
      },
      {
        "level": 2,
        "title": " 6.6 N-Element Linear Array Three-Dimensional Characteristics",
        "page": 341
      },
      {
        "level": 2,
        "title": " 6.7 Rectangular-to-Polar Graphical Solution",
        "page": 344
      },
      {
        "level": 2,
        "title": " 6.8 N-Element Linear Array Uniform Spacing, Nonuniform Amplitude",
        "page": 345
      },
      {
        "level": 2,
        "title": " 6.9 Superdirectivity",
        "page": 367
      },
      {
        "level": 2,
        "title": " 6.10 Planar Array",
        "page": 370
      },
      {
        "level": 2,
        "title": " 6.11 Design Considerations",
        "page": 382
      },
      {
        "level": 2,
        "title": " 6.12 Circular Array",
        "page": 385
      },
      {
        "level": 2,
        "title": " 6.13 Multimedia",
        "page": 389
      },
      {
        "level": 2,
        "title": " References",
        "page": 389
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 390
      },
      {
        "level": 1,
        "title": " 7 Antenna Synthesis and Continuous Sources",
        "page": 407
      },
      {
        "level": 2,
        "title": " 7.1 Introduction",
        "page": 407
      },
      {
        "level": 2,
        "title": " 7.2 Continuous Sources",
        "page": 408
      },
      {
        "level": 2,
        "title": " 7.3 Schelkunoff Polynomial Method",
        "page": 409
      },
      {
        "level": 2,
        "title": " 7.4 Fourier Transform Method",
        "page": 414
      },
      {
        "level": 2,
        "title": " 7.5 Woodward-Lawson Method",
        "page": 420
      },
      {
        "level": 2,
        "title": " 7.6 Taylor Line-Source (Tschebyscheff-Error)",
        "page": 426
      },
      {
        "level": 2,
        "title": " 7.7 Taylor Line-Source (One-Parameter)",
        "page": 430
      },
      {
        "level": 2,
        "title": " 7.8 Triangular, Cosine, and Cosine-Squared Amplitude Distributions",
        "page": 437
      },
      {
        "level": 2,
        "title": " 7.9 Line-Source Phase Distributions",
        "page": 438
      },
      {
        "level": 2,
        "title": " 7.10 Continuous Aperture Sources",
        "page": 439
      },
      {
        "level": 2,
        "title": " 7.11 Multimedia",
        "page": 442
      },
      {
        "level": 2,
        "title": " References",
        "page": 442
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 443
      },
      {
        "level": 1,
        "title": " 8 Integral Equations, Moment Method, and Self and Mutual Impedances",
        "page": 453
      },
      {
        "level": 2,
        "title": " 8.1 Introduction",
        "page": 453
      },
      {
        "level": 2,
        "title": " 8.2 Integral Equation Method",
        "page": 454
      },
      {
        "level": 2,
        "title": " 8.3 Finite Diameter Wires",
        "page": 461
      },
      {
        "level": 2,
        "title": " 8.4 Moment Method Solution",
        "page": 470
      },
      {
        "level": 2,
        "title": " 8.5 Self-Impedance",
        "page": 477
      },
      {
        "level": 2,
        "title": " 8.6 Mutual Impedance Between Linear Elements",
        "page": 485
      },
      {
        "level": 2,
        "title": " 8.7 Mutual Coupling in Arrays",
        "page": 496
      },
      {
        "level": 2,
        "title": " 8.8 Multimedia",
        "page": 502
      },
      {
        "level": 2,
        "title": " References",
        "page": 502
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 504
      },
      {
        "level": 1,
        "title": " 9 Broadband Dipoles and Matching Techniques",
        "page": 507
      },
      {
        "level": 2,
        "title": " 9.1 Introduction",
        "page": 507
      },
      {
        "level": 2,
        "title": " 9.2 Biconical Antenna",
        "page": 509
      },
      {
        "level": 2,
        "title": " 9.3 Triangular Sheet, Flexible and Conformal Bow-Tie, and Wire Simulation",
        "page": 514
      },
      {
        "level": 2,
        "title": " 9.4 Vivaldi Antenna",
        "page": 518
      },
      {
        "level": 2,
        "title": " 9.5 Cylindrical Dipole",
        "page": 522
      },
      {
        "level": 2,
        "title": " 9.6 Folded Dipole",
        "page": 527
      },
      {
        "level": 2,
        "title": " 9.7 Discone and Conical Skirt Monopole",
        "page": 534
      },
      {
        "level": 2,
        "title": " 9.8 Matching Techniques",
        "page": 535
      },
      {
        "level": 2,
        "title": " 9.9 Multimedia",
        "page": 545
      },
      {
        "level": 2,
        "title": " References",
        "page": 546
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 547
      },
      {
        "level": 1,
        "title": " 10 Traveling Wave and Broadband Antennas",
        "page": 555
      },
      {
        "level": 2,
        "title": " 10.1 Introduction",
        "page": 555
      },
      {
        "level": 2,
        "title": " 10.2 Traveling Wave Antennas",
        "page": 555
      },
      {
        "level": 2,
        "title": " 10.3 Broadband Antennas",
        "page": 571
      },
      {
        "level": 2,
        "title": " 10.4 Multimedia",
        "page": 602
      },
      {
        "level": 2,
        "title": " References",
        "page": 602
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 604
      },
      {
        "level": 1,
        "title": " 11 Frequency Independent Antennas, Antenna Miniaturization, and Fractal Antennas",
        "page": 613
      },
      {
        "level": 2,
        "title": " 11.1 Introduction",
        "page": 613
      },
      {
        "level": 2,
        "title": " 11.2 Theory",
        "page": 614
      },
      {
        "level": 2,
        "title": " 11.3 Equiangular Spiral Antennas",
        "page": 615
      },
      {
        "level": 2,
        "title": " 11.4 Log-Periodic Antennas",
        "page": 620
      },
      {
        "level": 2,
        "title": " 11.5 Fundamental Limits of Electrically Small Antennas",
        "page": 636
      },
      {
        "level": 2,
        "title": " 11.6 Antenna Miniaturization",
        "page": 641
      },
      {
        "level": 2,
        "title": " 11.7 Fractal Antennas",
        "page": 649
      },
      {
        "level": 2,
        "title": " 11.8 Multimedia",
        "page": 655
      },
      {
        "level": 2,
        "title": " References",
        "page": 655
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 657
      },
      {
        "level": 1,
        "title": " 12 Aperture Antennas",
        "page": 661
      },
      {
        "level": 2,
        "title": " 12.1 Introduction",
        "page": 661
      },
      {
        "level": 2,
        "title": " 12.2 Field Equivalence Principle Huygens? Principle",
        "page": 661
      },
      {
        "level": 2,
        "title": " 12.3 Radiation Equations",
        "page": 667
      },
      {
        "level": 2,
        "title": " Summary",
        "page": 669
      },
      {
        "level": 2,
        "title": " 12.4 Directivity",
        "page": 670
      },
      {
        "level": 2,
        "title": " 12.5 Rectangular Apertures",
        "page": 670
      },
      {
        "level": 2,
        "title": " 12.6 Circular Apertures",
        "page": 689
      },
      {
        "level": 2,
        "title": " 12.7 Design Considerations",
        "page": 697
      },
      {
        "level": 2,
        "title": " 12.8 Babinet?s Principle",
        "page": 702
      },
      {
        "level": 2,
        "title": " 12.9 Fourier Transforms in Aperture Antenna Theory",
        "page": 706
      },
      {
        "level": 2,
        "title": " 12.10 Ground Plane Edge Effects The Geometrical Theory of Diffraction",
        "page": 724
      },
      {
        "level": 2,
        "title": " 12.11 Multimedia",
        "page": 729
      },
      {
        "level": 2,
        "title": " References",
        "page": 729
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 731
      },
      {
        "level": 1,
        "title": " 13 Horn Antennas",
        "page": 741
      },
      {
        "level": 2,
        "title": " 13.1 Introduction",
        "page": 741
      },
      {
        "level": 2,
        "title": " 13.2 E-Plane Sectoral Horn",
        "page": 741
      },
      {
        "level": 2,
        "title": " 13.3 H-Plane Sectoral Horn",
        "page": 755
      },
      {
        "level": 2,
        "title": " 13.4 Pyramidal Horn",
        "page": 765
      },
      {
        "level": 2,
        "title": " 13.5 Conical Horn",
        "page": 778
      },
      {
        "level": 2,
        "title": " 13.6 Corrugated Horn",
        "page": 783
      },
      {
        "level": 2,
        "title": " 13.7 Aperture-Matched Horns",
        "page": 788
      },
      {
        "level": 2,
        "title": " 13.8 Multimode Horns",
        "page": 791
      },
      {
        "level": 2,
        "title": " 13.9 Dielectric-Loaded Horns",
        "page": 793
      },
      {
        "level": 2,
        "title": " 13.10 Phase Center",
        "page": 795
      },
      {
        "level": 2,
        "title": " 13.11 Multimedia",
        "page": 796
      },
      {
        "level": 2,
        "title": " References",
        "page": 797
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 800
      },
      {
        "level": 1,
        "title": " 14 Microstrip and Mobile Communications Antennas",
        "page": 805
      },
      {
        "level": 2,
        "title": " 14.1 Introduction",
        "page": 805
      },
      {
        "level": 2,
        "title": " 14.2 Rectangular Patch",
        "page": 810
      },
      {
        "level": 2,
        "title": " 14.3 Circular Patch",
        "page": 837
      },
      {
        "level": 2,
        "title": " 14.4 Quality Factor, Bandwidth, and Efficiency",
        "page": 845
      },
      {
        "level": 2,
        "title": " 14.5 Input Impedance",
        "page": 848
      },
      {
        "level": 2,
        "title": " 14.6 Coupling",
        "page": 849
      },
      {
        "level": 2,
        "title": " 14.7 Circular Polarization",
        "page": 852
      },
      {
        "level": 2,
        "title": " 14.8 Arrays and Feed Networks",
        "page": 854
      },
      {
        "level": 2,
        "title": " 14.9 Antennas for Mobile Communications",
        "page": 859
      },
      {
        "level": 2,
        "title": " 14.10 Dielectric Resonator Antennas",
        "page": 869
      },
      {
        "level": 2,
        "title": " 14.11 Multimedia",
        "page": 880
      },
      {
        "level": 2,
        "title": " References",
        "page": 884
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 889
      },
      {
        "level": 1,
        "title": " 15 Reflector Antennas",
        "page": 897
      },
      {
        "level": 2,
        "title": " 15.1 Introduction",
        "page": 897
      },
      {
        "level": 2,
        "title": " 15.2 Plane Reflector",
        "page": 897
      },
      {
        "level": 2,
        "title": " 15.3 Corner Reflector",
        "page": 898
      },
      {
        "level": 2,
        "title": " 15.4 Parabolic Reflector",
        "page": 906
      },
      {
        "level": 2,
        "title": " 15.5 Spherical Reflector",
        "page": 942
      },
      {
        "level": 2,
        "title": " 15.6 Multimedia",
        "page": 945
      },
      {
        "level": 2,
        "title": " References",
        "page": 945
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 947
      },
      {
        "level": 1,
        "title": " 16 Smart Antennas",
        "page": 953
      },
      {
        "level": 2,
        "title": " 16.1 Introduction",
        "page": 953
      },
      {
        "level": 2,
        "title": " 16.2 Smart-Antenna Analogy",
        "page": 953
      },
      {
        "level": 2,
        "title": " 16.3 Cellular Radio Systems Evolution",
        "page": 955
      },
      {
        "level": 2,
        "title": " 16.4 Signal Propagation",
        "page": 961
      },
      {
        "level": 2,
        "title": " 16.5 Smart Antennas? Benefits",
        "page": 964
      },
      {
        "level": 2,
        "title": " 16.6 Smart Antennas? Drawbacks",
        "page": 965
      },
      {
        "level": 2,
        "title": " 16.7 Antenna",
        "page": 965
      },
      {
        "level": 2,
        "title": " 16.8 Antenna Beamforming",
        "page": 968
      },
      {
        "level": 2,
        "title": " 16.9 Mobile Ad hoc Networks (MANETs)",
        "page": 982
      },
      {
        "level": 2,
        "title": " 16.10 Smart-Antenna System Design, Simulation, and Results",
        "page": 986
      },
      {
        "level": 2,
        "title": " 16.11 Beamforming, Diversity Combining, Rayleigh-Fading, and Trellis-Coded Modulation",
        "page": 994
      },
      {
        "level": 2,
        "title": " 16.12 Other Geometries",
        "page": 997
      },
      {
        "level": 2,
        "title": " 16.13 Multimedia",
        "page": 998
      },
      {
        "level": 2,
        "title": " References",
        "page": 998
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 1002
      },
      {
        "level": 1,
        "title": " 17 Antenna Measurements",
        "page": 1003
      },
      {
        "level": 2,
        "title": " 17.1 Introduction",
        "page": 1003
      },
      {
        "level": 2,
        "title": " 17.2 Antenna Ranges",
        "page": 1004
      },
      {
        "level": 2,
        "title": " 17.3 Radiation Patterns",
        "page": 1022
      },
      {
        "level": 2,
        "title": " 17.4 Gain Measurements",
        "page": 1025
      },
      {
        "level": 2,
        "title": " 17.5 Directivity Measurements",
        "page": 1032
      },
      {
        "level": 2,
        "title": " 17.6 Radiation Efficiency",
        "page": 1034
      },
      {
        "level": 2,
        "title": " 17.7 Impedance Measurements",
        "page": 1034
      },
      {
        "level": 2,
        "title": " 17.8 Current Measurements",
        "page": 1036
      },
      {
        "level": 2,
        "title": " 17.9 Polarization Measurements",
        "page": 1036
      },
      {
        "level": 2,
        "title": " 17.10 Scale Model Measurements",
        "page": 1041
      },
      {
        "level": 2,
        "title": " References",
        "page": 1046
      },
      {
        "level": 1,
        "title": " Appendix I f(x) =sin(x)/x",
        "page": 1049
      },
      {
        "level": 1,
        "title": " Appendix II fN(x) =|sin(Nx)/N sin(x)| N = 1, 3, 5, 10, 20",
        "page": 1051
      },
      {
        "level": 1,
        "title": " Appendix III Cosine and Sine Integrals",
        "page": 1053
      },
      {
        "level": 1,
        "title": " Appendix IV Fresnel Integrals",
        "page": 1055
      },
      {
        "level": 1,
        "title": " Appendix V Bessel Functions",
        "page": 1057
      },
      {
        "level": 1,
        "title": " Appendix VI Identities",
        "page": 1063
      },
      {
        "level": 1,
        "title": " Appendix VII Vector Analysis",
        "page": 1067
      },
      {
        "level": 1,
        "title": " Appendix VIII Method of Stationary Phase",
        "page": 1077
      },
      {
        "level": 1,
        "title": " Appendix IX Television, Radio, Telephone, and Radar Frequency Spectrums",
        "page": 1083
      },
      {
        "level": 1,
        "title": " Index",
        "page": 1087
      }
    ]
  },
  {
    "cover": "https://mhebooklibrary.com/na101/home/literatum/publisher/mhp/books/content/books/2007/0071475745/0071475745/production/0071475745.cover.jpg",
    "title": "Antenna Engineering Handbook",
    "author": "John L. Volakis",
    "publisher": "McGraw-Hill",
    "granted": false,
    "publisherSite": "https://mhebooklibrary.com/doi/book/10.1036/0071475745",
    "amazonSite": "https://www.amazon.com/Antenna-Engineering-Handbook-Fourth-Volakis/dp/0071475745",
    "edition": 4,
    "year": 2007,
    "description": "The “bible of antenna engineering” fully updated to provide state-of-the-art coverage in antenna design and applications\n\nEdited by John L. Volakis, one of the world's leading authorities in antenna engineering, this trusted resource covers all the classic antenna types plus many new types and designs used in communications systems, satellites, radars, and emerging applications from WLAN to automotive systems to biomedical to smart antennas.",
    "filename": "00002-1  Fundamentals of Antennas, Arrays, and Mobile Communications.pdf",
    "chapters": [
      {
        "level": 1,
        "title": " Part 1 - Introduction and Fundamentals",
        "page": 2
      },
      {
        "level": 2,
        "title": " 1 Fundamentals of Antennas, Arrays, and Mobile Communications",
        "page": 4
      },
      {
        "level": 2,
        "title": " 2 Frequency Bandsfor Military and Commercial Applications",
        "page": 38
      },
      {
        "level": 2,
        "title": " 3 Arrays of Discrete Elements",
        "page": 56
      },
      {
        "level": 1,
        "title": " Part 2 - Types and Design Methods",
        "page": 80
      },
      {
        "level": 2,
        "title": " 4 Dipoles and Monopoles",
        "page": 82
      },
      {
        "level": 2,
        "title": " 5 Loop Antennas",
        "page": 112
      },
      {
        "level": 2,
        "title": " 6 Small Antennas",
        "page": 138
      },
      {
        "level": 2,
        "title": " 7 Microstrip Antennas",
        "page": 172
      },
      {
        "level": 2,
        "title": " 8 Slot Antennas",
        "page": 202
      },
      {
        "level": 2,
        "title": " 9 Waveguide Slot Antenna Arrays",
        "page": 218
      },
      {
        "level": 2,
        "title": " 10 Surface-Wave Antennas*",
        "page": 254
      },
      {
        "level": 2,
        "title": " 11 Leaky-Wave Antennas",
        "page": 286
      },
      {
        "level": 2,
        "title": " 12 Helical Antennas",
        "page": 342
      },
      {
        "level": 2,
        "title": " 13 Frequency Independent Antennas",
        "page": 368
      },
      {
        "level": 2,
        "title": " 14 Horn Antennas",
        "page": 436
      },
      {
        "level": 2,
        "title": " 15 Reflector Antennas",
        "page": 510
      },
      {
        "level": 2,
        "title": " 16 Wideband Microstrip Antennas",
        "page": 574
      },
      {
        "level": 2,
        "title": " 17 Dielectric Resonator Antennas",
        "page": 624
      },
      {
        "level": 2,
        "title": " 18 Lens Antennas",
        "page": 648
      },
      {
        "level": 2,
        "title": " 19 Ultrawide Bandwidth Antenna Design",
        "page": 678
      },
      {
        "level": 2,
        "title": " 20 Phased Arrays",
        "page": 698
      },
      {
        "level": 2,
        "title": " 21 Array Phase Shifters Theory and Technology",
        "page": 738
      },
      {
        "level": 2,
        "title": " 22 Conformal and Low-Profile Arrays",
        "page": 764
      },
      {
        "level": 2,
        "title": " 23 Millimeter-Wave and Terahertz Antennas",
        "page": 790
      },
      {
        "level": 2,
        "title": " 24 Ultra Wideband Arrays",
        "page": 804
      },
      {
        "level": 2,
        "title": " 25 Smart Antennas",
        "page": 828
      },
      {
        "level": 2,
        "title": " 26 Methods of Polarization Synthesis",
        "page": 854
      },
      {
        "level": 1,
        "title": " Part 3 - Applications",
        "page": 880
      },
      {
        "level": 2,
        "title": " 27 Low- and Medium-Frequency Antennas",
        "page": 882
      },
      {
        "level": 2,
        "title": " 28 HF Antennas",
        "page": 902
      },
      {
        "level": 2,
        "title": " 29 VHF and UHF Antennas for Communications and Broadcasting",
        "page": 924
      },
      {
        "level": 2,
        "title": " 30 Portable TV Antennas",
        "page": 968
      },
      {
        "level": 2,
        "title": " 31 Reconfigurable Antennas",
        "page": 982
      },
      {
        "level": 2,
        "title": " 32 Active Antennas",
        "page": 1004
      },
      {
        "level": 2,
        "title": " 33 Fractal Antennas",
        "page": 1038
      },
      {
        "level": 2,
        "title": " 34 Low Profile Antenna Performance Enhancement Utilizing Engineered Electromagnetic Materials",
        "page": 1066
      },
      {
        "level": 2,
        "title": " 35 Reflectarray Antennas",
        "page": 1094
      },
      {
        "level": 2,
        "title": " 36 Mobile Handset Antennas",
        "page": 1116
      },
      {
        "level": 2,
        "title": " 37 Broadband Planar Antennas for High-Speed Wireless Communications",
        "page": 1144
      },
      {
        "level": 2,
        "title": " 38 Antennas for Medical Applications",
        "page": 1168
      },
      {
        "level": 2,
        "title": " 39 Automobile Antennas",
        "page": 1196
      },
      {
        "level": 2,
        "title": " 40 Aircraft Antennas",
        "page": 1232
      },
      {
        "level": 2,
        "title": " 41 Radiometer Antennas",
        "page": 1262
      },
      {
        "level": 2,
        "title": " 42 Antenna Tracking",
        "page": 1286
      },
      {
        "level": 2,
        "title": " 43 Microwave Beacon Antennas",
        "page": 1312
      },
      {
        "level": 2,
        "title": " 44 Satellite Antennas",
        "page": 1330
      },
      {
        "level": 2,
        "title": " 45 Earth Station Antennas",
        "page": 1360
      },
      {
        "level": 2,
        "title": " 46 Seeker Antennas",
        "page": 1386
      },
      {
        "level": 2,
        "title": " 47 Direction Finding Antennas and Systems",
        "page": 1402
      },
      {
        "level": 2,
        "title": " 48 ESM and ECM Antennas",
        "page": 1436
      },
      {
        "level": 2,
        "title": " 49 Radio-Telescope Antennas",
        "page": 1448
      },
      {
        "level": 2,
        "title": " 50 Indoor Antenna Measurements",
        "page": 1474
      },
      {
        "level": 1,
        "title": " Part 4 - Topics Associated with Antennas",
        "page": 1502
      },
      {
        "level": 2,
        "title": " 51 Transmission Lines and Waveguides",
        "page": 1504
      },
      {
        "level": 2,
        "title": " 52 Impedance Matching, Broadbanding, and Baluns",
        "page": 1556
      },
      {
        "level": 2,
        "title": " 53 Radomes",
        "page": 1588
      },
      {
        "level": 2,
        "title": " 54 Propagation",
        "page": 1610
      },
      {
        "level": 2,
        "title": " 55 Materials and Design Data",
        "page": 1630
      },
      {
        "level": 2,
        "title": " 56 Frequency Selective Surfaces",
        "page": 1654
      },
      {
        "level": 2,
        "title": " 57 Propagation Models and Antennas for MIMO",
        "page": 1680
      },
      {
        "level": 2,
        "title": " 58 Multipath Techniques for Handset/Terminal Antennas",
        "page": 1698
      },
      {
        "level": 2,
        "title": " 59 Computational Electromagnetics for Antennas",
        "page": 1726
      }
    ]
  },
  {
    "title": "Handbook of Antenna Technologies",
    "author": "Chen, Z.N., Liu, D., Nakano, H., Qing, X., Zwick, Th.",
    "edition": 1,
    "year": 2016,
    "description": "This Handbook aims to present the rapid development of antenna technologies, particularly in the past two decades, and also showcasing the newly developed technologies and the latest applications. The handbook will provide readers with the comprehensive updated reference information covering theory, modeling and optimization methods, design and measurement, new electromagnetic materials, and applications of antennas. The handbook will widely cover not only all key antenna design issues but also fundamentals, issues related to antennas (transmission, propagation, feeding structure, materials, fabrication, measurement, system, and unique design challenges in specific applications). This handbook will benefit the readers as a full and quick technical reference with a high-level historic review of technology, detailed technical descriptions and the latest practical applications. ",
    "chapters": [
      {
        "level": 1,
        "title": " Part I Theory Overview and Fundamentals - Introduction and Fundamentals",
        "page": 33
      },
      {
        "level": 2,
        "title": " Maxwell, J.C. Maxwell?s Original Presentation of Electromagnetic Theory and Its Evolution",
        "page": 34
      },
      {
        "level": 2,
        "title": " Physics and Mathematics of Radio Wave Propagation in Cellular Wireless Communications",
        "page": 62
      },
      {
        "level": 2,
        "title": " Commercial Antenna Design Tools",
        "page": 97
      },
      {
        "level": 2,
        "title": " Numerical Modeling in Antenna Engineering",
        "page": 140
      },
      {
        "level": 2,
        "title": " Physical Bounds of Antennas",
        "page": 225
      },
      {
        "level": 2,
        "title": " Concept and Applications of Receiving Mutual Impedance",
        "page": 262
      },
      {
        "level": 1,
        "title": " Part II Theory Overview and Fundamentals - New Topics and Key Issues Associated to Antennas",
        "page": 311
      },
      {
        "level": 2,
        "title": " Metamaterials and Antennas",
        "page": 312
      },
      {
        "level": 2,
        "title": " Optimization Methods in Antenna Engineering",
        "page": 346
      },
      {
        "level": 2,
        "title": " Transmission-Line Based Metamaterials in Antenna Engineering",
        "page": 402
      },
      {
        "level": 2,
        "title": " Theory of Transformation Optics in Antenna Design",
        "page": 475
      },
      {
        "level": 2,
        "title": " Frequency Selective Surfaces",
        "page": 495
      },
      {
        "level": 2,
        "title": " Optical Nanoantennas",
        "page": 550
      },
      {
        "level": 2,
        "title": " Localized Waves Theory, Techniques, and Applications",
        "page": 590
      },
      {
        "level": 2,
        "title": " Terahertz Antennas and Measurement",
        "page": 642
      },
      {
        "level": 2,
        "title": " Three-Dimensionally Printed/Additive Manufactured Antennas",
        "page": 683
      },
      {
        "level": 1,
        "title": " Part III Design Elements and Arrays - Introduction and Basic Types of Antennas",
        "page": 720
      },
      {
        "level": 2,
        "title": " Linear Wire Antennas",
        "page": 721
      },
      {
        "level": 2,
        "title": " Loop Antennas",
        "page": 743
      },
      {
        "level": 2,
        "title": " Microstrip Patch Antennas",
        "page": 807
      },
      {
        "level": 2,
        "title": " Reflector Antennas",
        "page": 873
      },
      {
        "level": 2,
        "title": " Spiral, Helical, and Rod Antennas",
        "page": 943
      },
      {
        "level": 2,
        "title": " Dielectric Resonator Antennas",
        "page": 975
      },
      {
        "level": 2,
        "title": " Dielectric Lens Antennas",
        "page": 1021
      },
      {
        "level": 2,
        "title": " Circularly Polarized Antennas",
        "page": 1085
      },
      {
        "level": 2,
        "title": " Phased Arrays",
        "page": 1132
      },
      {
        "level": 2,
        "title": " Self-Complimentary and Broadband Antennas",
        "page": 1182
      },
      {
        "level": 2,
        "title": " Fresnel Zone Plate Antenna",
        "page": 1205
      },
      {
        "level": 2,
        "title": " Grid Antenna Arrays",
        "page": 1267
      },
      {
        "level": 2,
        "title": " Reflectarray Antennas",
        "page": 1296
      },
      {
        "level": 1,
        "title": " Part IV Design Elements and Arrays - Performance Enhanced Antennas",
        "page": 1338
      },
      {
        "level": 2,
        "title": " Small Antennas",
        "page": 1339
      },
      {
        "level": 2,
        "title": " Waveguide Slot Array Antennas",
        "page": 1405
      },
      {
        "level": 2,
        "title": " Omnidirectional Antennas",
        "page": 1430
      },
      {
        "level": 2,
        "title": " Antenna Design for Diversity and MIMO Application",
        "page": 1494
      },
      {
        "level": 2,
        "title": " Low-Profile Antennas",
        "page": 1546
      },
      {
        "level": 2,
        "title": " On-Chip Antennas",
        "page": 1580
      },
      {
        "level": 2,
        "title": " Substrate Integrated Waveguide Antennas",
        "page": 1600
      },
      {
        "level": 2,
        "title": " Ultra-Wideband Antennas",
        "page": 1671
      },
      {
        "level": 2,
        "title": " Beam-Scanning Leaky-Wave Antennas",
        "page": 1710
      },
      {
        "level": 2,
        "title": " Reconfigurable Antennas",
        "page": 1749
      },
      {
        "level": 2,
        "title": " Radial Line Slot Antennas",
        "page": 1785
      },
      {
        "level": 2,
        "title": " Millimeter-Wave Antennas and Arrays",
        "page": 1798
      },
      {
        "level": 2,
        "title": " Conformal Array Antennas",
        "page": 1862
      },
      {
        "level": 2,
        "title": " Multibeam Antenna Arrays",
        "page": 1904
      },
      {
        "level": 2,
        "title": " Reduced Surface Wave Microstrip Antennas",
        "page": 1944
      },
      {
        "level": 2,
        "title": " Wideband Magnetoelectric Dipole Antennas",
        "page": 1980
      },
      {
        "level": 1,
        "title": " Part V Design Elements and Arrays - Antenna Measurement and Setups",
        "page": 2031
      },
      {
        "level": 2,
        "title": " Antenna Measurement Setups Introduction",
        "page": 2032
      },
      {
        "level": 2,
        "title": " Anechoic Chamber Design",
        "page": 2059
      },
      {
        "level": 2,
        "title": " EMI/EMC Chamber Design, Measurement, and Instrument",
        "page": 2084
      },
      {
        "level": 2,
        "title": " Near-Field Antenna Measurement Techniques",
        "page": 2113
      },
      {
        "level": 2,
        "title": " Radiation Efficiency Measurements of Small Antennas",
        "page": 2170
      },
      {
        "level": 2,
        "title": " Mm-Wave Sub-mm-Wave Antenna Measurement",
        "page": 2195
      },
      {
        "level": 2,
        "title": " Evaluation of Wearable and Implantable Antennas with Human Phantoms",
        "page": 2243
      },
      {
        "level": 1,
        "title": " Part VI Applications Systems and Issues Associated to Antennas",
        "page": 2273
      },
      {
        "level": 2,
        "title": " Antenna Systems for Cellular Base Stations",
        "page": 2274
      },
      {
        "level": 2,
        "title": " MIMO Systems and Antennas for Terminals",
        "page": 2350
      },
      {
        "level": 2,
        "title": " Antennas in Wireless Charging Systems",
        "page": 2392
      },
      {
        "level": 2,
        "title": " Antennas in Partial Discharge Sensing System",
        "page": 2421
      },
      {
        "level": 2,
        "title": " Antennas in Automobile Radar",
        "page": 2477
      },
      {
        "level": 2,
        "title": " Satellite Antennas on Vehicles",
        "page": 2503
      },
      {
        "level": 2,
        "title": " Smart Antennas for Satellite Communications",
        "page": 2543
      },
      {
        "level": 2,
        "title": " Antennas in Access Points of WLAN/WiFi",
        "page": 2581
      },
      {
        "level": 2,
        "title": " Antennas in Body-Centric Sensor Network Devices",
        "page": 2591
      },
      {
        "level": 2,
        "title": " Implanted Antennas in Biomedical Telemetry",
        "page": 2615
      },
      {
        "level": 2,
        "title": " Antennas and EM Issues in Medical Diagnosis and Treatment Systems",
        "page": 2655
      },
      {
        "level": 2,
        "title": " Holographic Antennas",
        "page": 2691
      },
      {
        "level": 2,
        "title": " Radiometer Antennas",
        "page": 2728
      },
      {
        "level": 2,
        "title": " Antenna Sensors in Passive Wireless Sensing Systems",
        "page": 2796
      },
      {
        "level": 2,
        "title": " Antennas in MRI Systems",
        "page": 2840
      },
      {
        "level": 2,
        "title": " Space Antennas Including Terahertz Antennas",
        "page": 2913
      },
      {
        "level": 2,
        "title": " Antennas in Radio Telescope Systems",
        "page": 2961
      },
      {
        "level": 2,
        "title": " Reconfigurable Antennas for Wireless Communications",
        "page": 2987
      },
      {
        "level": 2,
        "title": " Antennas in Microwave Wireless Power Transmission",
        "page": 3033
      },
      {
        "level": 2,
        "title": " Antennas in Handheld Devices",
        "page": 3077
      },
      {
        "level": 2,
        "title": " Applications of Phased Array Feeders in Reflector Antennas",
        "page": 3139
      },
      {
        "level": 1,
        "title": " Part VII Applications Systems and Issues Associated to Antennas - Specific Issues Associated to Antennas",
        "page": 3188
      },
      {
        "level": 2,
        "title": " Transmission Lines",
        "page": 3189
      },
      {
        "level": 2,
        "title": " GAP Waveguides",
        "page": 3271
      },
      {
        "level": 2,
        "title": " Impedance Matching and BALUNs",
        "page": 3346
      },
      {
        "level": 2,
        "title": " Advanced Antenna Fabrication Processes (MEMS/LTCC/LCP/Printing)",
        "page": 3426
      }
    ],
    "cover": "https://images.springer.com/sgw/books/medium/9789814560436.jpg",
    "publisher": "Springer",
    "granted": true,
    "publisherUrl": "https://www.springer.com/gp/book/9789814560436",
    "amazonUrl": "https://www.amazon.com/Handbook-Antenna-Technologies-Ning-Chen/dp/981456043X",
    "amazonSite": "https://www.amazon.com/Handbook-Antenna-Technologies-Ning-Chen/dp/981456043X",
    "publisherSite": "https://www.springer.com/gp/book/9789814560436"
  },
  {
    "cover": "https://www.ece.rutgers.edu/~orfanidi/ewa/cover2016.jpg",
    "title": "Electromagnetic Waves and Antennas",
    "author": "Sophacles J. Orfanidis",
    "publisher": "Rutgers University",
    "granted": true,
    "publisherSite": "https://www.ece.rutgers.edu/~orfanidi/ewa/",
    "amazonSite": "#",
    "edition": 1,
    "year": 2016,
    "description": "This book provides a broad and applications-oriented introduction to electromagnetic waves and antennas, with MATLAB examples. Current interest in these areas is driven by the growth in wireless and fiber-optic communications, information technology, and materials science. \n\n Communications, antenna, radar, and microwave engineers must deal with the generation, transmission, and reception of electromagnetic waves. Device engineers working on ever-smaller integrated circuits and at ever higher frequencies must take into account wave propagation effects at the chip and circuit-board levels. Communication and computer network engineers routinely use waveguiding systems, such as transmission lines and optical fibers. Novel recent developments in materials, such as photonic bandgap structures, omnidirectional dielectric mirrors, birefringent multilayer films, surface plasmons, negative-index metamaterials, slow and fast light, promise a revolution in the control and manipulation of light and other applications. These are just some examples of topics discussed in this book.",
    "chapters": [
      {
        "level": 1,
        "title": "1 Maxwell’s Equations ",
        "page": 21
      },
      {
        "level": 2,
        "title": "  1.1 Maxwell’s Equations ",
        "page": 21
      },
      {
        "level": 2,
        "title": "  1.2 Lorentz Force ",
        "page": 22
      },
      {
        "level": 2,
        "title": "  1.3 Constitutive Relations ",
        "page": 23
      },
      {
        "level": 2,
        "title": "  1.4 Negative Index Media ",
        "page": 27
      },
      {
        "level": 2,
        "title": "  1.5 Boundary Conditions ",
        "page": 27
      },
      {
        "level": 2,
        "title": "  1.6 Currents Fluxes and Conservation Laws ",
        "page": 29
      },
      {
        "level": 2,
        "title": "  1.7 Charge Conservation ",
        "page": 30
      },
      {
        "level": 2,
        "title": "  1.8 Energy Flux and Energy Conservation ",
        "page": 31
      },
      {
        "level": 2,
        "title": "  1.9 Harmonic Time Dependence ",
        "page": 33
      },
      {
        "level": 2,
        "title": "  1.10 Simple Models of Dielectrics Conductors and Plasmas ",
        "page": 36
      },
      {
        "level": 2,
        "title": "  1.11 Dielectrics ",
        "page": 37
      },
      {
        "level": 2,
        "title": "  1.12 Conductors ",
        "page": 40
      },
      {
        "level": 2,
        "title": "  1.13 Charge Relaxation in Conductors ",
        "page": 43
      },
      {
        "level": 2,
        "title": "  1.14 Power Losses ",
        "page": 43
      },
      {
        "level": 2,
        "title": "  1.15 Plasmas ",
        "page": 45
      },
      {
        "level": 2,
        "title": "  1.16 Energy Density in Lossless Dispersive Dielectrics ",
        "page": 46
      },
      {
        "level": 2,
        "title": "  1.17 Kramers-Kronig Dispersion Relations ",
        "page": 47
      },
      {
        "level": 2,
        "title": "  1.18 Group Velocity Energy Velocity ",
        "page": 49
      },
      {
        "level": 2,
        "title": "  1.19 Problems ",
        "page": 51
      },
      {
        "level": 1,
        "title": "2 Uniform Plane Waves ",
        "page": 57
      },
      {
        "level": 2,
        "title": "  2.1 Uniform Plane Waves in Lossless Media ",
        "page": 57
      },
      {
        "level": 2,
        "title": "  2.2 Monochromatic Waves ",
        "page": 63
      },
      {
        "level": 2,
        "title": "  2.3 Energy Density and Flux ",
        "page": 66
      },
      {
        "level": 2,
        "title": "  2.4 Wave Impedance ",
        "page": 67
      },
      {
        "level": 2,
        "title": "  2.5 Polarization ",
        "page": 67
      },
      {
        "level": 2,
        "title": "  2.6 Uniform Plane Waves in Lossy Media ",
        "page": 74
      },
      {
        "level": 2,
        "title": "  2.7 Propagation in Weakly Lossy Dielectrics ",
        "page": 80
      },
      {
        "level": 2,
        "title": "  2.8 Propagation in Good Conductors ",
        "page": 81
      },
      {
        "level": 2,
        "title": "  2.9 Skin Effect in Cylindrical Wires ",
        "page": 82
      },
      {
        "level": 2,
        "title": "  2.10 Propagation in Oblique Directions ",
        "page": 82
      },
      {
        "level": 2,
        "title": "  2.11 Complex or Inhomogeneous Waves ",
        "page": 85
      },
      {
        "level": 2,
        "title": "  2.12 Doppler Effect ",
        "page": 87
      },
      {
        "level": 2,
        "title": "  2.13 Propagation in Negative-Index Media ",
        "page": 91
      },
      {
        "level": 2,
        "title": "  2.14 Problems ",
        "page": 94
      },
      {
        "level": 1,
        "title": "3 Pulse Propagation in Dispersive Media ",
        "page": 103
      },
      {
        "level": 2,
        "title": "  3.1 Propagation Filter ",
        "page": 103
      },
      {
        "level": 2,
        "title": "  3.2 Front Velocity and Causality ",
        "page": 105
      },
      {
        "level": 2,
        "title": "  3.3 Exact Impulse Response Examples ",
        "page": 108
      },
      {
        "level": 2,
        "title": "  3.4 Transient and Steady-State Behavior ",
        "page": 111
      },
      {
        "level": 2,
        "title": "  3.5 Pulse Propagation and Group Velocity ",
        "page": 115
      },
      {
        "level": 2,
        "title": "  3.6 Group Velocity Dispersion and Pulse Spreading ",
        "page": 119
      },
      {
        "level": 2,
        "title": "  3.7 Propagation and Chirping ",
        "page": 123
      },
      {
        "level": 2,
        "title": "  3.8 Dispersion Compensation ",
        "page": 125
      },
      {
        "level": 2,
        "title": "  3.9 Slow Fast and Negative Group Velocities ",
        "page": 126
      },
      {
        "level": 2,
        "title": "  3.10 Chirp Radar and Pulse Compression ",
        "page": 133
      },
      {
        "level": 2,
        "title": "  3.11 Further Reading ",
        "page": 143
      },
      {
        "level": 2,
        "title": "  3.12 Problems ",
        "page": 144
      },
      {
        "level": 1,
        "title": "4 Propagation in Birefringent Media ",
        "page": 152
      },
      {
        "level": 2,
        "title": "  4.1 Linear and Circular Birefringence ",
        "page": 152
      },
      {
        "level": 2,
        "title": "  4.2 Uniaxial and Biaxial Media ",
        "page": 153
      },
      {
        "level": 2,
        "title": "  4.3 Chiral Media ",
        "page": 155
      },
      {
        "level": 2,
        "title": "  4.4 Gyrotropic Media ",
        "page": 158
      },
      {
        "level": 2,
        "title": "  4.5 Linear and Circular Dichroism ",
        "page": 159
      },
      {
        "level": 2,
        "title": "  4.6 Oblique Propagation in Birefringent Media ",
        "page": 160
      },
      {
        "level": 2,
        "title": "  4.7 Problems ",
        "page": 167
      },
      {
        "level": 1,
        "title": "5 Reflection and Transmission ",
        "page": 173
      },
      {
        "level": 2,
        "title": "  5.1 Propagation Matrices ",
        "page": 173
      },
      {
        "level": 2,
        "title": "  5.2 Matching Matrices ",
        "page": 177
      },
      {
        "level": 2,
        "title": "  5.3 Reflected and Transmitted Power ",
        "page": 180
      },
      {
        "level": 2,
        "title": "  5.4 Single Dielectric Slab ",
        "page": 183
      },
      {
        "level": 2,
        "title": "  5.5 Reflectionless Slab ",
        "page": 186
      },
      {
        "level": 2,
        "title": "  5.6 Time-Domain Reflection Response ",
        "page": 194
      },
      {
        "level": 2,
        "title": "  5.7 Two Dielectric Slabs ",
        "page": 196
      },
      {
        "level": 2,
        "title": "  5.8 Reflection by a Moving Boundary ",
        "page": 198
      },
      {
        "level": 2,
        "title": "  5.9 Problems ",
        "page": 201
      },
      {
        "level": 1,
        "title": "6 Multilayer Structures ",
        "page": 206
      },
      {
        "level": 2,
        "title": "  6.1 Multiple Dielectric Slabs ",
        "page": 206
      },
      {
        "level": 2,
        "title": "  6.2 Antireflection Coatings ",
        "page": 208
      },
      {
        "level": 2,
        "title": "  6.3 Dielectric Mirrors ",
        "page": 213
      },
      {
        "level": 2,
        "title": "  6.4 Propagation Bandgaps ",
        "page": 224
      },
      {
        "level": 2,
        "title": "  6.5 Narrow-Band Transmission Filters ",
        "page": 224
      },
      {
        "level": 2,
        "title": "  6.6 Equal Travel-Time Multilayer Structures ",
        "page": 229
      },
      {
        "level": 2,
        "title": "  6.7 Applications of Layered Structures ",
        "page": 243
      },
      {
        "level": 2,
        "title": "  6.8 Chebyshev Design of Reflectionless Multilayers ",
        "page": 247
      },
      {
        "level": 2,
        "title": "  6.9 Problems ",
        "page": 254
      },
      {
        "level": 1,
        "title": "7 Oblique Incidence ",
        "page": 261
      },
      {
        "level": 2,
        "title": "  7.1 Oblique Incidence and Snel’s Laws ",
        "page": 261
      },
      {
        "level": 2,
        "title": "  7.2 Transverse Impedance ",
        "page": 263
      },
      {
        "level": 2,
        "title": "  7.3 Propagation and Matching of Transverse Fields ",
        "page": 266
      },
      {
        "level": 2,
        "title": "  7.4 Fresnel Reflection Coefficients ",
        "page": 268
      },
      {
        "level": 2,
        "title": "  7.5 Maximum Angle and Critical Angle ",
        "page": 270
      },
      {
        "level": 2,
        "title": "  7.6 Brewster Angle ",
        "page": 279
      },
      {
        "level": 2,
        "title": "  7.7 Complex Waves ",
        "page": 281
      },
      {
        "level": 2,
        "title": "  7.8 Total Internal Reflection ",
        "page": 284
      },
      {
        "level": 2,
        "title": "  7.9 Oblique Incidence on a Lossy Medium ",
        "page": 286
      },
      {
        "level": 2,
        "title": "  7.10 Zenneck Surface Wave ",
        "page": 290
      },
      {
        "level": 2,
        "title": "  7.11 Surface Plasmons ",
        "page": 292
      },
      {
        "level": 2,
        "title": "  7.12 Oblique Reflection from a Moving Boundary ",
        "page": 295
      },
      {
        "level": 2,
        "title": "  7.13 Geometrical Optics ",
        "page": 299
      },
      {
        "level": 2,
        "title": "  7.14 Fermat’s Principle ",
        "page": 302
      },
      {
        "level": 2,
        "title": "  7.15 Ray Tracing ",
        "page": 304
      },
      {
        "level": 2,
        "title": "  7.16 Snel’s Law in Negative-Index Media ",
        "page": 315
      },
      {
        "level": 2,
        "title": "  7.17 Problems ",
        "page": 318
      },
      {
        "level": 1,
        "title": "8 Multilayer Film Applications ",
        "page": 323
      },
      {
        "level": 2,
        "title": "  8.1 Multilayer Dielectric Structures at Oblique Incidence ",
        "page": 323
      },
      {
        "level": 2,
        "title": "  8.2 Lossy Multilayer Structures ",
        "page": 325
      },
      {
        "level": 2,
        "title": "  8.3 Single Dielectric Slab ",
        "page": 327
      },
      {
        "level": 2,
        "title": "  8.4 Frustrated Total Internal Reflection ",
        "page": 329
      },
      {
        "level": 2,
        "title": "  8.5 Surface Plasmon Resonance ",
        "page": 333
      },
      {
        "level": 2,
        "title": "  8.6 Perfect Lens in Negative-Index Media ",
        "page": 342
      },
      {
        "level": 2,
        "title": "  8.7 Antireflection Coatings at Oblique Incidence ",
        "page": 350
      },
      {
        "level": 2,
        "title": "  8.8 Omnidirectional Dielectric Mirrors ",
        "page": 353
      },
      {
        "level": 2,
        "title": "  8.9 Polarizing Beam Splitters ",
        "page": 364
      },
      {
        "level": 2,
        "title": "  8.10 Reflection and Refraction in Birefringent Media ",
        "page": 366
      },
      {
        "level": 2,
        "title": "  8.11 Brewster and Critical Angles in Birefringent Media ",
        "page": 370
      },
      {
        "level": 2,
        "title": "  8.12 Multilayer Birefringent Structures ",
        "page": 373
      },
      {
        "level": 2,
        "title": "  8.13 Giant Birefringent Optics ",
        "page": 375
      },
      {
        "level": 2,
        "title": "  8.14 Problems ",
        "page": 381
      },
      {
        "level": 1,
        "title": "9 Waveguides ",
        "page": 382
      },
      {
        "level": 2,
        "title": "  9.1 Longitudinal-Transverse Decompositions ",
        "page": 383
      },
      {
        "level": 2,
        "title": "  9.2 Power Transfer and Attenuation ",
        "page": 388
      },
      {
        "level": 2,
        "title": "  9.3 TEM TE and TM modes ",
        "page": 391
      },
      {
        "level": 2,
        "title": "  9.4 Rectangular Waveguides ",
        "page": 394
      },
      {
        "level": 2,
        "title": "  9.5 Higher TE and TM modes ",
        "page": 396
      },
      {
        "level": 2,
        "title": "  9.6 Operating Bandwidth ",
        "page": 398
      },
      {
        "level": 2,
        "title": "  9.7 Power Transfer Energy Density and Group Velocity ",
        "page": 399
      },
      {
        "level": 2,
        "title": "  9.8 Power Attenuation ",
        "page": 401
      },
      {
        "level": 2,
        "title": "  9.9 Reflection Model of Waveguide Propagation ",
        "page": 404
      },
      {
        "level": 2,
        "title": "  9.10 Resonant Cavities ",
        "page": 406
      },
      {
        "level": 2,
        "title": "  9.11 Dielectric Slab Waveguides ",
        "page": 408
      },
      {
        "level": 2,
        "title": "  9.12 Asymmetric Dielectric Slab ",
        "page": 417
      },
      {
        "level": 2,
        "title": "  9.13 Problems ",
        "page": 428
      },
      {
        "level": 1,
        "title": "10 Surface Waveguides ",
        "page": 431
      },
      {
        "level": 2,
        "title": "  10.1 Plasmonic Waveguides ",
        "page": 431
      },
      {
        "level": 2,
        "title": "  10.2 Single Metal-Dielectric Interface ",
        "page": 439
      },
      {
        "level": 2,
        "title": "  10.3 Power Transfer Energy & Group Velocities ",
        "page": 441
      },
      {
        "level": 2,
        "title": "  10.4 MDM Configuration – Lossless Case ",
        "page": 445
      },
      {
        "level": 2,
        "title": "  10.5 Oscillatory Modes ",
        "page": 457
      },
      {
        "level": 2,
        "title": "  10.6 MDM Configuration – Lossy Case ",
        "page": 463
      },
      {
        "level": 2,
        "title": "  10.7 Gap Surface Plasmons ",
        "page": 468
      },
      {
        "level": 2,
        "title": "  10.8 PEC Limit ",
        "page": 472
      },
      {
        "level": 2,
        "title": "  10.9 Anomalous Complex Modes ",
        "page": 474
      },
      {
        "level": 2,
        "title": "  10.10 DMD Configuration – Lossless Case ",
        "page": 477
      },
      {
        "level": 2,
        "title": "  10.11 DMD Configuration – Lossy Case ",
        "page": 487
      },
      {
        "level": 2,
        "title": "  10.12 Symmetric DMD Waveguides ",
        "page": 488
      },
      {
        "level": 2,
        "title": "  10.13 Asymmetric DMD Waveguides ",
        "page": 496
      },
      {
        "level": 2,
        "title": "  10.14 Note on Computations ",
        "page": 508
      },
      {
        "level": 2,
        "title": "  10.15 Sommerfeld Wire ",
        "page": 509
      },
      {
        "level": 2,
        "title": "  10.16 Power Transfer and Power Loss ",
        "page": 521
      },
      {
        "level": 2,
        "title": "  10.17 Connection to Zenneck Surface Wave ",
        "page": 524
      },
      {
        "level": 2,
        "title": "  10.18 Skin Effect for Round Wire ",
        "page": 526
      },
      {
        "level": 2,
        "title": "  10.19 Goubau Line ",
        "page": 529
      },
      {
        "level": 2,
        "title": "  10.20 Planar Limit of the Goubau Line ",
        "page": 546
      },
      {
        "level": 2,
        "title": "  10.21 Problems ",
        "page": 552
      },
      {
        "level": 1,
        "title": "11 Transmission Lines ",
        "page": 555
      },
      {
        "level": 2,
        "title": "  11.1 General Properties of TEM Transmission Lines ",
        "page": 555
      },
      {
        "level": 2,
        "title": "  11.2 Parallel Plate Lines ",
        "page": 561
      },
      {
        "level": 2,
        "title": "  11.3 Microstrip Lines ",
        "page": 562
      },
      {
        "level": 2,
        "title": "  11.4 Coaxial Lines ",
        "page": 566
      },
      {
        "level": 2,
        "title": "  11.5 Two-Wire Lines ",
        "page": 571
      },
      {
        "level": 2,
        "title": "  11.6 Distributed Circuit Model of a Transmission Line ",
        "page": 573
      },
      {
        "level": 2,
        "title": "  11.7 Wave Impedance and Reflection Response ",
        "page": 575
      },
      {
        "level": 2,
        "title": "  11.8 Two-Port Equivalent Circuit ",
        "page": 577
      },
      {
        "level": 2,
        "title": "  11.9 Terminated Transmission Lines ",
        "page": 578
      },
      {
        "level": 2,
        "title": "  11.10 Power Transfer from Generator to Load ",
        "page": 581
      },
      {
        "level": 2,
        "title": "  11.11 Open- and Short-Circuited Transmission Lines ",
        "page": 583
      },
      {
        "level": 2,
        "title": "  11.12 Standing Wave Ratio ",
        "page": 586
      },
      {
        "level": 2,
        "title": "  11.13 Determining an Unknown Load Impedance ",
        "page": 588
      },
      {
        "level": 2,
        "title": "  11.14 Smith Chart ",
        "page": 592
      },
      {
        "level": 2,
        "title": "  11.15 Time-Domain Response of Transmission Lines ",
        "page": 596
      },
      {
        "level": 2,
        "title": "  11.16 Problems ",
        "page": 603
      },
      {
        "level": 1,
        "title": "12 Coupled Lines ",
        "page": 614
      },
      {
        "level": 2,
        "title": "  12.1 Coupled Transmission Lines ",
        "page": 614
      },
      {
        "level": 2,
        "title": "  12.2 Crosstalk Between Lines ",
        "page": 620
      },
      {
        "level": 2,
        "title": "  12.3 Weakly Coupled Lines with Arbitrary Terminations ",
        "page": 623
      },
      {
        "level": 2,
        "title": "  12.4 Coupled-Mode Theory ",
        "page": 625
      },
      {
        "level": 2,
        "title": "  12.5 Fiber Bragg Gratings ",
        "page": 627
      },
      {
        "level": 2,
        "title": "  12.6 Diffuse Reflection and Transmission ",
        "page": 630
      },
      {
        "level": 2,
        "title": "  12.7 Problems ",
        "page": 632
      },
      {
        "level": 1,
        "title": "13 Impedance Matching ",
        "page": 634
      },
      {
        "level": 2,
        "title": "  13.1 Conjugate and Reflectionless Matching ",
        "page": 634
      },
      {
        "level": 2,
        "title": "  13.2 Multisection Transmission Lines ",
        "page": 636
      },
      {
        "level": 2,
        "title": "  13.3 Quarter-Wavelength Chebyshev Transformers ",
        "page": 637
      },
      {
        "level": 2,
        "title": "  13.4 Two-Section Dual-Band Chebyshev Transformers ",
        "page": 643
      },
      {
        "level": 2,
        "title": "  13.5 Quarter-Wavelength Transformer With Series Section ",
        "page": 649
      },
      {
        "level": 2,
        "title": "  13.6 Quarter-Wavelength Transformer With Shunt Stub ",
        "page": 652
      },
      {
        "level": 2,
        "title": "  13.7 Two-Section Series Impedance Transformer ",
        "page": 654
      },
      {
        "level": 2,
        "title": "  13.8 Single Stub Matching ",
        "page": 659
      },
      {
        "level": 2,
        "title": "  13.9 Balanced Stubs ",
        "page": 663
      },
      {
        "level": 2,
        "title": "  13.10 Double and Triple Stub Matching ",
        "page": 665
      },
      {
        "level": 2,
        "title": "  13.11 L-Section Lumped Reactive Matching Networks ",
        "page": 667
      },
      {
        "level": 2,
        "title": "  13.12 Pi-Section Lumped Reactive Matching Networks ",
        "page": 670
      },
      {
        "level": 2,
        "title": "  13.13 Reversed Matching Networks ",
        "page": 677
      },
      {
        "level": 2,
        "title": "  13.14 Problems ",
        "page": 679
      },
      {
        "level": 1,
        "title": "14 S-Parameters ",
        "page": 683
      },
      {
        "level": 2,
        "title": "  14.1 Scattering Parameters ",
        "page": 683
      },
      {
        "level": 2,
        "title": "  14.2 Power Flow ",
        "page": 687
      },
      {
        "level": 2,
        "title": "  14.3 Parameter Conversions ",
        "page": 688
      },
      {
        "level": 2,
        "title": "  14.4 Input and Output Reflection Coefficients ",
        "page": 689
      },
      {
        "level": 2,
        "title": "  14.5 Stability Circles ",
        "page": 691
      },
      {
        "level": 2,
        "title": "  14.6 Power Gains ",
        "page": 697
      },
      {
        "level": 2,
        "title": "  14.7 Generalized S-Parameters and Power Waves ",
        "page": 703
      },
      {
        "level": 2,
        "title": "  14.8 Simultaneous Conjugate Matching ",
        "page": 707
      },
      {
        "level": 2,
        "title": "  14.9 Power Gain Circles ",
        "page": 712
      },
      {
        "level": 2,
        "title": "  14.10 Unilateral Gain Circles ",
        "page": 713
      },
      {
        "level": 2,
        "title": "  14.11 Operating and Available Power Gain Circles ",
        "page": 715
      },
      {
        "level": 2,
        "title": "  14.12 Noise Figure Circles ",
        "page": 721
      },
      {
        "level": 2,
        "title": "  14.13 Problems ",
        "page": 726
      },
      {
        "level": 1,
        "title": "15 Radiation Fields ",
        "page": 729
      },
      {
        "level": 2,
        "title": "  15.1 Currents and Charges as Sources of Fields ",
        "page": 729
      },
      {
        "level": 2,
        "title": "  15.2 Retarded Potentials ",
        "page": 731
      },
      {
        "level": 2,
        "title": "  15.3 Harmonic Time Dependence ",
        "page": 734
      },
      {
        "level": 2,
        "title": "  15.4 Fields of a Linear Wire Antenna ",
        "page": 736
      },
      {
        "level": 2,
        "title": "  15.5 Fields of Electric and Magnetic Dipoles ",
        "page": 738
      },
      {
        "level": 2,
        "title": "  15.6 Ewald-Oseen Extinction Theorem ",
        "page": 743
      },
      {
        "level": 2,
        "title": "  15.7 Radiation Fields ",
        "page": 748
      },
      {
        "level": 2,
        "title": "  15.8 Radial Coordinates ",
        "page": 751
      },
      {
        "level": 2,
        "title": "  15.9 Radiation Field Approximation ",
        "page": 753
      },
      {
        "level": 2,
        "title": "  15.10 Computing the Radiation Fields ",
        "page": 754
      },
      {
        "level": 2,
        "title": "  15.11 Problems ",
        "page": 756
      },
      {
        "level": 1,
        "title": "16 Transmitting and Receiving Antennas ",
        "page": 759
      },
      {
        "level": 2,
        "title": "  16.1 Energy Flux and Radiation Intensity ",
        "page": 759
      },
      {
        "level": 2,
        "title": "  16.2 Directivity Gain and Beamwidth ",
        "page": 760
      },
      {
        "level": 2,
        "title": "  16.3 Effective Area ",
        "page": 765
      },
      {
        "level": 2,
        "title": "  16.4 Antenna Equivalent Circuits ",
        "page": 769
      },
      {
        "level": 2,
        "title": "  16.5 Effective Length ",
        "page": 771
      },
      {
        "level": 2,
        "title": "  16.6 Communicating Antennas ",
        "page": 773
      },
      {
        "level": 2,
        "title": "  16.7 Antenna Noise Temperature ",
        "page": 775
      },
      {
        "level": 2,
        "title": "  16.8 System Noise Temperature ",
        "page": 779
      },
      {
        "level": 2,
        "title": "  16.9 Data Rate Limits ",
        "page": 785
      },
      {
        "level": 2,
        "title": "  16.10 Satellite Links ",
        "page": 787
      },
      {
        "level": 2,
        "title": "  16.11 Radar Equation ",
        "page": 790
      },
      {
        "level": 2,
        "title": "  16.12 Problems ",
        "page": 792
      },
      {
        "level": 1,
        "title": "17 Linear and Loop Antennas ",
        "page": 795
      },
      {
        "level": 2,
        "title": "  17.1 Linear Antennas ",
        "page": 795
      },
      {
        "level": 2,
        "title": "  17.2 Hertzian Dipole ",
        "page": 797
      },
      {
        "level": 2,
        "title": "  17.3 Standing-Wave Antennas ",
        "page": 799
      },
      {
        "level": 2,
        "title": "  17.4 Half-Wave Dipole ",
        "page": 803
      },
      {
        "level": 2,
        "title": "  17.5 Monopole Antennas ",
        "page": 804
      },
      {
        "level": 2,
        "title": "  17.6 Traveling-Wave Antennas ",
        "page": 806
      },
      {
        "level": 2,
        "title": "  17.7 Vee and Rhombic Antennas ",
        "page": 808
      },
      {
        "level": 2,
        "title": "  17.8 Loop Antennas ",
        "page": 811
      },
      {
        "level": 2,
        "title": "  17.9 Circular Loops ",
        "page": 813
      },
      {
        "level": 2,
        "title": "  17.10 Square Loops ",
        "page": 815
      },
      {
        "level": 2,
        "title": "  17.11 Dipole and Quadrupole Radiation ",
        "page": 816
      },
      {
        "level": 2,
        "title": "  17.12 Problems ",
        "page": 818
      },
      {
        "level": 1,
        "title": "18 Radiation from Apertures ",
        "page": 819
      },
      {
        "level": 2,
        "title": "  18.1 Field Equivalence Principle ",
        "page": 819
      },
      {
        "level": 2,
        "title": "  18.2 Magnetic Currents and Duality ",
        "page": 821
      },
      {
        "level": 2,
        "title": "  18.3 Radiation Fields from Magnetic Currents ",
        "page": 823
      },
      {
        "level": 2,
        "title": "  18.4 Radiation Fields from Apertures ",
        "page": 824
      },
      {
        "level": 2,
        "title": "  18.5 Huygens Source ",
        "page": 827
      },
      {
        "level": 2,
        "title": "  18.6 Directivity and Effective Area of Apertures ",
        "page": 829
      },
      {
        "level": 2,
        "title": "  18.7 Uniform Apertures ",
        "page": 831
      },
      {
        "level": 2,
        "title": "  18.8 Rectangular Apertures ",
        "page": 832
      },
      {
        "level": 2,
        "title": "  18.9 Circular Apertures ",
        "page": 834
      },
      {
        "level": 2,
        "title": "  18.10 Vector Diffraction Theory ",
        "page": 836
      },
      {
        "level": 2,
        "title": "  18.11 Extinction Theorem ",
        "page": 841
      },
      {
        "level": 2,
        "title": "  18.12 Vector Diffraction for Apertures ",
        "page": 842
      },
      {
        "level": 2,
        "title": "  18.13 Fresnel Diffraction ",
        "page": 843
      },
      {
        "level": 2,
        "title": "  18.14 Knife-Edge Diffraction ",
        "page": 847
      },
      {
        "level": 2,
        "title": "  18.15 Geometrical Theory of Diffraction ",
        "page": 855
      },
      {
        "level": 2,
        "title": "  18.16 Problems ",
        "page": 861
      },
      {
        "level": 1,
        "title": "19 Diffraction – Plane-Wave Spectrum ",
        "page": 864
      },
      {
        "level": 2,
        "title": "  19.1 Rayleigh-Sommerfeld Diffraction Theory ",
        "page": 864
      },
      {
        "level": 2,
        "title": "  19.2 Plane-Wave Spectrum Representation ",
        "page": 869
      },
      {
        "level": 2,
        "title": "  19.3 Far-Field Diffraction Pattern ",
        "page": 872
      },
      {
        "level": 2,
        "title": "  19.4 One-Dimensional Apertures ",
        "page": 874
      },
      {
        "level": 2,
        "title": "  19.5 Plane-Wave Spectrum –Vector Case ",
        "page": 876
      },
      {
        "level": 2,
        "title": "  19.6 Far-Field Approximation Radiation Pattern ",
        "page": 880
      },
      {
        "level": 2,
        "title": "  19.7 Radiated and Reactive Power Directivity ",
        "page": 881
      },
      {
        "level": 2,
        "title": "  19.8 Smythe Diffraction Formulas ",
        "page": 885
      },
      {
        "level": 2,
        "title": "  19.9 Apertures in Conducting Screens ",
        "page": 892
      },
      {
        "level": 2,
        "title": "  19.10 Sommerfeld’s Half-Plane Problem Revisited ",
        "page": 898
      },
      {
        "level": 2,
        "title": "  19.11 Diffraction by Small Holes – Bethe-Bouwkamp Model ",
        "page": 911
      },
      {
        "level": 2,
        "title": "  19.12 Plane-Wave Spectrum – Bethe-Bouwkamp Model ",
        "page": 925
      },
      {
        "level": 2,
        "title": "  19.13 Babinet Principle ",
        "page": 935
      },
      {
        "level": 2,
        "title": "  19.14 Problems ",
        "page": 941
      },
      {
        "level": 1,
        "title": "20 Diffraction – Fourier Optics ",
        "page": 943
      },
      {
        "level": 2,
        "title": "  20.1 Fresnel Approximation ",
        "page": 943
      },
      {
        "level": 2,
        "title": "  20.2 Self-Imaging of Periodic Structures – Talbot Effect ",
        "page": 950
      },
      {
        "level": 2,
        "title": "  20.3 Fraunhofer Approximation ",
        "page": 959
      },
      {
        "level": 2,
        "title": "  20.4 Cascading of Optical Elements ",
        "page": 964
      },
      {
        "level": 2,
        "title": "  20.5 Lenses – Transmittance Properties ",
        "page": 965
      },
      {
        "level": 2,
        "title": "  20.6 Magnification Properties of Lenses ",
        "page": 969
      },
      {
        "level": 2,
        "title": "  20.7 Point-Spread Function of a Lens ",
        "page": 970
      },
      {
        "level": 2,
        "title": "  20.8 Cylindrically-Symmetric and One-Dimensional Lenses ",
        "page": 973
      },
      {
        "level": 2,
        "title": "  20.9 Shift-Invariance and Coherent Transfer Function ",
        "page": 973
      },
      {
        "level": 2,
        "title": "  20.10 Fourier Transformation Properties of Lenses ",
        "page": 975
      },
      {
        "level": 2,
        "title": "  20.11 4F Optical Processor ",
        "page": 981
      },
      {
        "level": 2,
        "title": "  20.12 Apodization Design and Aperture Synthesis ",
        "page": 990
      },
      {
        "level": 2,
        "title": "  20.13 Prolate Window ",
        "page": 998
      },
      {
        "level": 2,
        "title": "  20.14 Taylor’s One-Parameter Window ",
        "page": 1001
      },
      {
        "level": 2,
        "title": "  20.15 Taylor’s N-bar Window ",
        "page": 1003
      },
      {
        "level": 2,
        "title": "  20.16 Circularly Symmetric Apodization Functions ",
        "page": 1008
      },
      {
        "level": 2,
        "title": "  20.17 Hansen One-Parameter Window ",
        "page": 1011
      },
      {
        "level": 2,
        "title": "  20.18 Fourier-Bessel and Dini Series Expansions ",
        "page": 1013
      },
      {
        "level": 2,
        "title": "  20.19 Taylor’s Two-Dimensional N-bar Window ",
        "page": 1017
      },
      {
        "level": 2,
        "title": "  20.20 Star-Shaped Masks Starshade Occulters ",
        "page": 1020
      },
      {
        "level": 2,
        "title": "  20.21 Superresolving Apertures ",
        "page": 1027
      },
      {
        "level": 2,
        "title": "  20.22 Superdirectivity Superresolution Superoscillations ",
        "page": 1038
      },
      {
        "level": 2,
        "title": "  20.23 Problems ",
        "page": 1058
      },
      {
        "level": 1,
        "title": "21 Aperture Antennas ",
        "page": 1062
      },
      {
        "level": 2,
        "title": "  21.1 Open-Ended Waveguides ",
        "page": 1062
      },
      {
        "level": 2,
        "title": "  21.2 Horn Antennas ",
        "page": 1066
      },
      {
        "level": 2,
        "title": "  21.3 Horn Radiation Fields ",
        "page": 1068
      },
      {
        "level": 2,
        "title": "  21.4 Horn Directivity ",
        "page": 1074
      },
      {
        "level": 2,
        "title": "  21.5 Horn Design ",
        "page": 1076
      },
      {
        "level": 2,
        "title": "  21.6 Microstrip Antennas ",
        "page": 1080
      },
      {
        "level": 2,
        "title": "  21.7 Parabolic Reflector Antennas ",
        "page": 1085
      },
      {
        "level": 2,
        "title": "  21.8 Gain and Beamwidth of Reflector Antennas ",
        "page": 1087
      },
      {
        "level": 2,
        "title": "  21.9 Aperture-Field and Current-Distribution Methods ",
        "page": 1091
      },
      {
        "level": 2,
        "title": "  21.10 Radiation Patterns of Reflector Antennas ",
        "page": 1094
      },
      {
        "level": 2,
        "title": "  21.11 Dual-Reflector Antennas ",
        "page": 1103
      },
      {
        "level": 2,
        "title": "  21.12 Lens Antennas ",
        "page": 1106
      },
      {
        "level": 1,
        "title": "22 Antenna Arrays ",
        "page": 1108
      },
      {
        "level": 2,
        "title": "  22.1 Antenna Arrays ",
        "page": 1108
      },
      {
        "level": 2,
        "title": "  22.2 Translational Phase Shift ",
        "page": 1108
      },
      {
        "level": 2,
        "title": "  22.3 Array Pattern Multiplication ",
        "page": 1110
      },
      {
        "level": 2,
        "title": "  22.4 One-Dimensional Arrays ",
        "page": 1120
      },
      {
        "level": 2,
        "title": "  22.5 Visible Region ",
        "page": 1122
      },
      {
        "level": 2,
        "title": "  22.6 Grating Lobes ",
        "page": 1124
      },
      {
        "level": 2,
        "title": "  22.7 Uniform Arrays ",
        "page": 1126
      },
      {
        "level": 2,
        "title": "  22.8 Array Directivity ",
        "page": 1130
      },
      {
        "level": 2,
        "title": "  22.9 Array Steering ",
        "page": 1131
      },
      {
        "level": 2,
        "title": "  22.10 Array Beamwidth ",
        "page": 1134
      },
      {
        "level": 2,
        "title": "  22.11 Problems ",
        "page": 1136
      },
      {
        "level": 1,
        "title": "23 Array Design Methods ",
        "page": 1139
      },
      {
        "level": 2,
        "title": "  23.1 Array Design Methods ",
        "page": 1139
      },
      {
        "level": 2,
        "title": "  23.2 Schelkunoff’s Zero Placement Method ",
        "page": 1142
      },
      {
        "level": 2,
        "title": "  23.3 Fourier Series Method with Windowing ",
        "page": 1144
      },
      {
        "level": 2,
        "title": "  23.4 Sector Beam Array Design ",
        "page": 1145
      },
      {
        "level": 2,
        "title": "  23.5 Woodward-Lawson Frequency-Sampling Design ",
        "page": 1149
      },
      {
        "level": 2,
        "title": "  23.6 Discretization of Continuous Line Sources ",
        "page": 1154
      },
      {
        "level": 2,
        "title": "  23.7 Narrow-Beam Low-Sidelobe Designs ",
        "page": 1158
      },
      {
        "level": 2,
        "title": "  23.8 Binomial Arrays ",
        "page": 1162
      },
      {
        "level": 2,
        "title": "  23.9 Dolph-Chebyshev Arrays ",
        "page": 1164
      },
      {
        "level": 2,
        "title": "  23.10 Taylor One-Parameter Source ",
        "page": 1176
      },
      {
        "level": 2,
        "title": "  23.11 Prolate Array ",
        "page": 1180
      },
      {
        "level": 2,
        "title": "  23.12 Taylor Line Source ",
        "page": 1184
      },
      {
        "level": 2,
        "title": "  23.13 Villeneuve Arrays ",
        "page": 1187
      },
      {
        "level": 2,
        "title": "  23.14 Multibeam Arrays ",
        "page": 1188
      },
      {
        "level": 2,
        "title": "  23.15 Problems ",
        "page": 1190
      },
      {
        "level": 1,
        "title": "24 Currents on Linear Antennas ",
        "page": 1192
      },
      {
        "level": 2,
        "title": "  24.1 Hall´en and Pocklington Integral Equations ",
        "page": 1192
      },
      {
        "level": 2,
        "title": "  24.2 Delta-Gap Frill Generator and Plane-Wave Sources ",
        "page": 1195
      },
      {
        "level": 2,
        "title": "  24.3 Solving Hall´en’s Equation ",
        "page": 1196
      },
      {
        "level": 2,
        "title": "  24.4 Sinusoidal Current Approximation ",
        "page": 1199
      },
      {
        "level": 2,
        "title": "  24.5 Reflecting and Center-Loaded Receiving Antennas ",
        "page": 1199
      },
      {
        "level": 2,
        "title": "  24.6 King’s Three-Term Approximation ",
        "page": 1202
      },
      {
        "level": 2,
        "title": "  24.7 Evaluation of the Exact Kernel ",
        "page": 1209
      },
      {
        "level": 2,
        "title": "  24.8 Method of Moments ",
        "page": 1214
      },
      {
        "level": 2,
        "title": "  24.9 Delta-Function Basis ",
        "page": 1217
      },
      {
        "level": 2,
        "title": "  24.10 Pulse Basis ",
        "page": 1221
      },
      {
        "level": 2,
        "title": "  24.11 Triangular Basis ",
        "page": 1226
      },
      {
        "level": 2,
        "title": "  24.12 NEC Sinusoidal Basis ",
        "page": 1228
      },
      {
        "level": 2,
        "title": "  24.13 Hall´en’s Equation for Arbitrary Incident Field ",
        "page": 1231
      },
      {
        "level": 2,
        "title": "  24.14 Solving Pocklington’s Equation ",
        "page": 1236
      },
      {
        "level": 2,
        "title": "  24.15 Problems ",
        "page": 1240
      },
      {
        "level": 1,
        "title": "25 Coupled Antennas ",
        "page": 1242
      },
      {
        "level": 2,
        "title": "  25.1 Near Fields of Linear Antennas ",
        "page": 1242
      },
      {
        "level": 2,
        "title": "  25.2 Improved Near-Field Calculation ",
        "page": 1245
      },
      {
        "level": 2,
        "title": "  25.3 Self and Mutual Impedance ",
        "page": 1253
      },
      {
        "level": 2,
        "title": "  25.4 Coupled Two-Element Arrays ",
        "page": 1259
      },
      {
        "level": 2,
        "title": "  25.5 Arrays of Parallel Dipoles ",
        "page": 1262
      },
      {
        "level": 2,
        "title": "  25.6 Yagi-Uda Antennas ",
        "page": 1271
      },
      {
        "level": 2,
        "title": "  25.7 Hall´en Equations for Coupled Antennas ",
        "page": 1277
      },
      {
        "level": 2,
        "title": "  25.8 Problems ",
        "page": 1284
      },
      {
        "level": 1,
        "title": "26 Appendices ",
        "page": 1286
      },
      {
        "level": 2,
        "title": "  A Physical Constants ",
        "page": 1286
      },
      {
        "level": 2,
        "title": "  B Electromagnetic Frequency Bands ",
        "page": 1287
      },
      {
        "level": 2,
        "title": "  C Vector Identities and Integral Theorems ",
        "page": 1289
      },
      {
        "level": 2,
        "title": "  D Green’s Functions ",
        "page": 1292
      },
      {
        "level": 2,
        "title": "  E Coordinate Systems ",
        "page": 1298
      },
      {
        "level": 2,
        "title": "  F Fresnel Integrals ",
        "page": 1301
      },
      {
        "level": 2,
        "title": "  G Exponential Sine and Cosine Integrals ",
        "page": 1306
      },
      {
        "level": 2,
        "title": "  H Stationary Phase Approximation ",
        "page": 1308
      },
      {
        "level": 2,
        "title": "  I Gauss-Legendre and Double-Exponential Quadrature ",
        "page": 1311
      },
      {
        "level": 2,
        "title": "  J Prolate Spheroidal Wave Functions ",
        "page": 1318
      },
      {
        "level": 2,
        "title": "  K Lorentz Transformations ",
        "page": 1342
      },
      {
        "level": 2,
        "title": "  L MATLAB Functions ",
        "page": 1350
      },
      {
        "level": 1,
        "title": "References ",
        "page": 1355
      },
      {
        "level": 1,
        "title": "Index ",
        "page": 1421
      }
    ]
  },
  {
    "cover": "https://onlinelibrary.wiley.com/cms/attachment/53116434-14d8-4feb-8012-71ece5833a63/0471743690.cover.gif",
    "title": "Introduction to RF Propagation",
    "author": "John S. Seybold",
    "publisher": "Wiley",
    "granted": false,
    "publisherSite": "https://onlinelibrary.wiley.com/doi/book/10.1002/0471743690",
    "amazonSite": "https://www.amazon.com/Introduction-RF-Propagation-John-Seybold/dp/0471655961",
    "edition": 1,
    "year": 2005,
    "description": "An introduction to RF propagation that spans all wireless applications\n\n This book provides readers with a solid understanding of the concepts involved in the propagation of electromagnetic waves and of the commonly used modeling techniques. While many books cover RF propagation, most are geared to cellular telephone systems and, therefore, are limited in scope. This title is comprehensive-it treats the growing number of wireless applications that range well beyond the mobile telecommunications industry, including radar and satellite communications.i",
    "chapters": [
      {
        "level": 1,
        "title": "1 Introduction ",
        "page": 20
      },
      {
        "level": 2,
        "title": "  1.1 Frequency Designations ",
        "page": 20
      },
      {
        "level": 2,
        "title": "  1.2 Modes of Propagation ",
        "page": 22
      },
      {
        "level": 2,
        "title": "  1.3 Why Model Propagation? ",
        "page": 29
      },
      {
        "level": 2,
        "title": "  1.4 Model Selection and Application ",
        "page": 30
      },
      {
        "level": 1,
        "title": "2 Electromagnetics and RF Propagation ",
        "page": 33
      },
      {
        "level": 2,
        "title": "  2.1 Introduction ",
        "page": 33
      },
      {
        "level": 2,
        "title": "  2.2 The Electric Field ",
        "page": 33
      },
      {
        "level": 2,
        "title": "  2.3 The Magnetic Field ",
        "page": 37
      },
      {
        "level": 2,
        "title": "  2.4 Electromagnetic Waves ",
        "page": 39
      },
      {
        "level": 2,
        "title": "  2.5 Wave Polarization ",
        "page": 43
      },
      {
        "level": 2,
        "title": "  2.6 Propagation of Electromagnetic Waves at Material Boundaries ",
        "page": 44
      },
      {
        "level": 2,
        "title": "  2.7 Propagation Impairment ",
        "page": 51
      },
      {
        "level": 2,
        "title": "  2.8 Ground Effects on Circular Polarization ",
        "page": 52
      },
      {
        "level": 1,
        "title": "3 Antenna Fundamentals ",
        "page": 57
      },
      {
        "level": 2,
        "title": "  3.1 Introduction ",
        "page": 57
      },
      {
        "level": 2,
        "title": "  3.2 Antenna Parameters ",
        "page": 57
      },
      {
        "level": 2,
        "title": "  3.3 Antenna Radiation Regions ",
        "page": 64
      },
      {
        "level": 2,
        "title": "  3.4 Some Common Antennas ",
        "page": 67
      },
      {
        "level": 2,
        "title": "  3.5 Antenna Polarization ",
        "page": 74
      },
      {
        "level": 2,
        "title": "  3.6 Antenna Pointing loss ",
        "page": 81
      },
      {
        "level": 1,
        "title": "4 Communication Systems and the Link Budget ",
        "page": 98
      },
      {
        "level": 2,
        "title": "  4.1 Introduction ",
        "page": 85
      },
      {
        "level": 2,
        "title": "  4.2 Path Loss ",
        "page": 86
      },
      {
        "level": 2,
        "title": "  4.3 Noise ",
        "page": 88
      },
      {
        "level": 2,
        "title": "  4.4 Interference ",
        "page": 95
      },
      {
        "level": 2,
        "title": "  4.5 Detailed Link Budget ",
        "page": 98
      },
      {
        "level": 1,
        "title": "5 Radar Systems ",
        "page": 106
      },
      {
        "level": 2,
        "title": "  5.1 Introduction ",
        "page": 106
      },
      {
        "level": 2,
        "title": "  5.2 The Radar Range Equation ",
        "page": 107
      },
      {
        "level": 2,
        "title": "  5.3 Radar Measurements ",
        "page": 112
      },
      {
        "level": 2,
        "title": "  5.4 Clutter ",
        "page": 118
      },
      {
        "level": 2,
        "title": "  5.5 Atmospheric Impairments ",
        "page": 125
      },
      {
        "level": 1,
        "title": "6 Atmospheric Effects ",
        "page": 130
      },
      {
        "level": 2,
        "title": "  6.1 Introduction ",
        "page": 130
      },
      {
        "level": 2,
        "title": "  6.2 Atmospheric Refraction ",
        "page": 131
      },
      {
        "level": 2,
        "title": "  6.3 Atmospheric Attenuation ",
        "page": 140
      },
      {
        "level": 2,
        "title": "  6.4 Loss From Moisture and Precipitation ",
        "page": 144
      },
      {
        "level": 1,
        "title": "7 Near-Earth Propagation Models ",
        "page": 153
      },
      {
        "level": 2,
        "title": "  7.1 Introduction ",
        "page": 153
      },
      {
        "level": 2,
        "title": "  7.2 Foliage Models ",
        "page": 153
      },
      {
        "level": 2,
        "title": "  7.3 Terrain Modeling ",
        "page": 160
      },
      {
        "level": 2,
        "title": "  7.4 Propagation in Built-Up Areas ",
        "page": 165
      },
      {
        "level": 1,
        "title": "8 Fading and Multipath Characterization ",
        "page": 182
      },
      {
        "level": 2,
        "title": "  8.1 Introduction ",
        "page": 182
      },
      {
        "level": 2,
        "title": "  8.2 Ground-Bounce Multipath ",
        "page": 183
      },
      {
        "level": 2,
        "title": "  8.3 Large-Scale or Log-Normal Fading ",
        "page": 205
      },
      {
        "level": 2,
        "title": "  8.4 Small-Scale Fading ",
        "page": 212
      },
      {
        "level": 1,
        "title": "9 Indoor Propagation Modeling ",
        "page": 227
      },
      {
        "level": 2,
        "title": "  9.1 Introduction ",
        "page": 227
      },
      {
        "level": 2,
        "title": "  9.2 Interference ",
        "page": 227
      },
      {
        "level": 2,
        "title": "  9.3 The Indoor Environment ",
        "page": 228
      },
      {
        "level": 1,
        "title": "10 Rain Attenuation of Microwave and Millimeter Wave Signals ",
        "page": 237
      },
      {
        "level": 2,
        "title": "  10.1 Introduction ",
        "page": 237
      },
      {
        "level": 2,
        "title": "  10.2 Link Budget ",
        "page": 238
      },
      {
        "level": 2,
        "title": "  10.3 Rain Fades ",
        "page": 241
      },
      {
        "level": 2,
        "title": "  10.4 The Link Distance Chart ",
        "page": 253
      },
      {
        "level": 2,
        "title": "  10.5 Availability Curves ",
        "page": 256
      },
      {
        "level": 2,
        "title": "  10.6 Other Precipitation ",
        "page": 256
      },
      {
        "level": 2,
        "title": "  10.7 Cross-Polarization Effects ",
        "page": 258
      },
      {
        "level": 1,
        "title": "Appendix 10A: Data for Rain Attenuation Models ",
        "page": 261
      },
      {
        "level": 1,
        "title": "11 Satellite Communications ",
        "page": 265
      },
      {
        "level": 2,
        "title": "  11.1 Introduction ",
        "page": 265
      },
      {
        "level": 2,
        "title": "  11.2 Satellite Orbits ",
        "page": 266
      },
      {
        "level": 2,
        "title": "  11.3 Satellite Operating Frequency ",
        "page": 268
      },
      {
        "level": 2,
        "title": "  11.4 Satellite Path Free-Space Loss ",
        "page": 268
      },
      {
        "level": 2,
        "title": "  11.5 Atmospheric Attenuation ",
        "page": 271
      },
      {
        "level": 2,
        "title": "  11.6 Ionospheric Effects ",
        "page": 274
      },
      {
        "level": 2,
        "title": "  11.7 Rain Fades ",
        "page": 274
      },
      {
        "level": 2,
        "title": "  11.8 Antenna Considerations ",
        "page": 292
      },
      {
        "level": 2,
        "title": "  11.9 Noise Temperature ",
        "page": 293
      },
      {
        "level": 1,
        "title": "12 RF Safety ",
        "page": 302
      },
      {
        "level": 2,
        "title": "  12.1 Introduction ",
        "page": 302
      },
      {
        "level": 2,
        "title": "  12.2 Biological Effects of RF Exposure ",
        "page": 304
      },
      {
        "level": 2,
        "title": "  12.3 CC Guidelines ",
        "page": 306
      },
      {
        "level": 2,
        "title": "  12.4 Antenna Considerations ",
        "page": 309
      },
      {
        "level": 2,
        "title": "  12.5 FCC Computations ",
        "page": 311
      },
      {
        "level": 2,
        "title": "  12.6 Station Evaluations ",
        "page": 316
      },
      {
        "level": 1,
        "title": "Appendix A: Review of Probability for Propagation Modeling ",
        "page": 320
      },
      {
        "level": 1,
        "title": "Index ",
        "page": 336
      }
    ]
  },
  {
    "cover": "https://digital-library.theiet.org/docserver/fulltext/SBEW517Emedium.jpg",
    "title": "Slotted Waveguide Array Antennas",
    "author": "Lars Josefsson, Sembiam Rengarajan",
    "publisher": "SciTech Publishing",
    "granted": false,
    "publisherSite": "https://digital-library.theiet.org/content/books/ew/sbew517e",
    "amazonSite": "https://www.amazon.com/Slotted-Waveguide-Array-Antennas-Electromagnetics/dp/1613531893",
    "edition": 1,
    "year": 2018,
    "description": "Slotted waveguide antenna arrays are used in radar, communication and remote sensing systems for high frequencies. They have linear polarization with low cross-polarization and low losses but can also be designed for dual polarizations and phase steered beams. Slotted Waveguide Array Antennas is the first comprehensive treatment of these antennas from an engineering perspective. It provides readers with a thorough foundation in applicable theories as well as hands-on instruction for practical analysis, design, manufacture and use of important types of waveguide slot arrays. It goes beyond some of the commonly discussed topics and ventures into areas that include higher order mode coupling and edge effects; performance optimisation in terms of bandwidth and pattern performance and manufacturing tolerances. With specific examples of waveguide array designs, accompanied by detailed illustrations and antenna characteristics, the book is a must-have reference for engineers involved in antenna design, development and applications.",
    "chapters": [
      {
        "level": 1,
        "title": " Contents",
        "page": 6
      },
      {
        "level": 1,
        "title": " 1 Introduction",
        "page": 26
      },
      {
        "level": 2,
        "title": " References",
        "page": 28
      },
      {
        "level": 1,
        "title": " 2 Review of electromagnetic theory",
        "page": 30
      },
      {
        "level": 2,
        "title": " 2.1 Maxwell's equations",
        "page": 30
      },
      {
        "level": 2,
        "title": " 2.2 Boundary conditions",
        "page": 31
      },
      {
        "level": 2,
        "title": " 2.3 Energy and power",
        "page": 32
      },
      {
        "level": 2,
        "title": " 2.4 Reciprocity theorem",
        "page": 33
      },
      {
        "level": 2,
        "title": " 2.5 Vector and scalar potentials",
        "page": 34
      },
      {
        "level": 2,
        "title": " 2.6 The image principle",
        "page": 36
      },
      {
        "level": 2,
        "title": " 2.7 The field equivalence principle",
        "page": 37
      },
      {
        "level": 2,
        "title": " 2.8 Green's functions",
        "page": 38
      },
      {
        "level": 2,
        "title": " References",
        "page": 40
      },
      {
        "level": 1,
        "title": " 3 History",
        "page": 42
      },
      {
        "level": 2,
        "title": " 3.1 The early years",
        "page": 42
      },
      {
        "level": 2,
        "title": " 3.2 The golden years",
        "page": 42
      },
      {
        "level": 2,
        "title": " 3.3 Waveguide slot antennas",
        "page": 43
      },
      {
        "level": 2,
        "title": " 3.4 The many shapes of slotted waveguide array antennas",
        "page": 43
      },
      {
        "level": 2,
        "title": " References",
        "page": 48
      },
      {
        "level": 1,
        "title": " 4 The slot antenna",
        "page": 50
      },
      {
        "level": 2,
        "title": " 4.1 An aperture in an infinite ground plane",
        "page": 50
      },
      {
        "level": 2,
        "title": " 4.2 The rectangular slot antenna",
        "page": 55
      },
      {
        "level": 2,
        "title": " 4.3 Waveguide modes",
        "page": 58
      },
      {
        "level": 2,
        "title": " 4.4 The longitudinal slot in a waveguide wall",
        "page": 61
      },
      {
        "level": 2,
        "title": " 4.5 Mutual coupling",
        "page": 68
      },
      {
        "level": 2,
        "title": " References",
        "page": 82
      },
      {
        "level": 1,
        "title": " 5 Slot models",
        "page": 84
      },
      {
        "level": 2,
        "title": " 5.1 Modelling principles",
        "page": 84
      },
      {
        "level": 2,
        "title": " 5.2 Integral equation solution",
        "page": 93
      },
      {
        "level": 2,
        "title": " 5.3 Longitudinal slot characteristics",
        "page": 97
      },
      {
        "level": 2,
        "title": " 5.4 Transverse slots",
        "page": 108
      },
      {
        "level": 2,
        "title": " References",
        "page": 113
      },
      {
        "level": 1,
        "title": " 6 The linear slotted waveguide array antenna",
        "page": 118
      },
      {
        "level": 2,
        "title": " 6.1 Introduction",
        "page": 118
      },
      {
        "level": 2,
        "title": " 6.2 The accuracy of the slot array model",
        "page": 122
      },
      {
        "level": 2,
        "title": " 6.3 The Elliott design equations",
        "page": 124
      },
      {
        "level": 2,
        "title": " 6.4 Mutual coupling",
        "page": 129
      },
      {
        "level": 2,
        "title": " 6.5 Design example of a standing wave array",
        "page": 137
      },
      {
        "level": 2,
        "title": " 6.6 Design of a travelling wave array",
        "page": 141
      },
      {
        "level": 2,
        "title": " 6.7 Array design using the concept of incremental conductance",
        "page": 151
      },
      {
        "level": 2,
        "title": " 6.8 Array design in terms of scattering parameters",
        "page": 153
      },
      {
        "level": 2,
        "title": " 6.9 Improvement to Elliott's design procedure",
        "page": 155
      },
      {
        "level": 2,
        "title": " References",
        "page": 157
      },
      {
        "level": 1,
        "title": " 7 Design of planar slotted waveguide array antennas",
        "page": 160
      },
      {
        "level": 2,
        "title": " 7.1 Introduction",
        "page": 160
      },
      {
        "level": 2,
        "title": " 7.2 Elliott's design procedure for planar standing wave arrays",
        "page": 161
      },
      {
        "level": 2,
        "title": " 7.3 Design of large arrays using the infinite array mutual coupling model",
        "page": 170
      },
      {
        "level": 2,
        "title": " 7.4 Choice of total slot conductance in radiating waveguides and resistance in feed waveguides",
        "page": 174
      },
      {
        "level": 2,
        "title": " 7.5 Sub-array architectures",
        "page": 176
      },
      {
        "level": 2,
        "title": " 7.6 Examples of planar slot array designs",
        "page": 181
      },
      {
        "level": 2,
        "title": " 7.7 Design of a travelling wave feed for a planar array",
        "page": 187
      },
      {
        "level": 2,
        "title": " 7.8 A review of other methods for analysis and design in the literature",
        "page": 193
      },
      {
        "level": 2,
        "title": " 7.9 The generalised scattering matrix model for analysis and design",
        "page": 194
      },
      {
        "level": 2,
        "title": " References",
        "page": 197
      },
      {
        "level": 1,
        "title": " 8 Concepts and models for advanced designs",
        "page": 200
      },
      {
        "level": 2,
        "title": " 8.1 Coupling slot models",
        "page": 200
      },
      {
        "level": 2,
        "title": " 8.2 Edge wall slot",
        "page": 207
      },
      {
        "level": 2,
        "title": " 8.3 Radiating compound broad wall slot",
        "page": 209
      },
      {
        "level": 2,
        "title": " 8.4 Iris-excited longitudinal slot",
        "page": 211
      },
      {
        "level": 2,
        "title": " 8.5 Slot arrays in ridge waveguides",
        "page": 215
      },
      {
        "level": 2,
        "title": " 8.6 Slot arrays with a dielectric cover",
        "page": 216
      },
      {
        "level": 2,
        "title": " 8.7 Higher-order mode coupling between centred-inclined coupling slots",
        "page": 218
      },
      {
        "level": 2,
        "title": " 8.8 Higher-order mode coupling between a centred-inclined coupling slot and longitudinal radiating slots",
        "page": 222
      },
      {
        "level": 2,
        "title": " 8.9 Finite ground plane effects",
        "page": 224
      },
      {
        "level": 2,
        "title": " 8.10 MoM solution to the integral equations of a planar array and applications",
        "page": 226
      },
      {
        "level": 2,
        "title": " 8.11 Global optimisations for improved designs",
        "page": 234
      },
      {
        "level": 2,
        "title": " References",
        "page": 242
      },
      {
        "level": 1,
        "title": " 9 Antenna systems and special requirements",
        "page": 246
      },
      {
        "level": 2,
        "title": " 9.1 Phase scanned slotted waveguide arrays",
        "page": 246
      },
      {
        "level": 2,
        "title": " 9.2 Frequency scanned slotted waveguide arrays",
        "page": 248
      },
      {
        "level": 2,
        "title": " 9.3 Dual polarised slotted waveguide arrays",
        "page": 257
      },
      {
        "level": 2,
        "title": " 9.4 Multiple beam slotted waveguide arrays",
        "page": 262
      },
      {
        "level": 2,
        "title": " 9.5 Conformal slotted waveguide arrays",
        "page": 264
      },
      {
        "level": 2,
        "title": " 9.6 Monopulse slotted waveguide arrays",
        "page": 267
      },
      {
        "level": 2,
        "title": " 9.7 Stripline slotted arrays",
        "page": 270
      },
      {
        "level": 2,
        "title": " 9.8 Scattering from slotted waveguide arrays",
        "page": 274
      },
      {
        "level": 2,
        "title": " 9.9 Second-order lobes",
        "page": 283
      },
      {
        "level": 2,
        "title": " 9.10 Omnidirectional slotted waveguide array antennas",
        "page": 291
      },
      {
        "level": 2,
        "title": " 9.11 On the bandwidth of slotted waveguide array antennas",
        "page": 297
      },
      {
        "level": 2,
        "title": " References",
        "page": 307
      },
      {
        "level": 1,
        "title": " 10 Slot arrays in special waveguide technologies",
        "page": 316
      },
      {
        "level": 2,
        "title": " 10.1 Slot arrays in circular parallel plate waveguides",
        "page": 316
      },
      {
        "level": 2,
        "title": " 10.2 Slot arrays in rectangular parallel plate waveguides",
        "page": 329
      },
      {
        "level": 2,
        "title": " 10.3 Slot arrays in substrate integrated waveguides",
        "page": 332
      },
      {
        "level": 2,
        "title": " 10.4 Slot arrays in gap waveguides",
        "page": 335
      },
      {
        "level": 2,
        "title": " References",
        "page": 338
      },
      {
        "level": 1,
        "title": " 11 Manufacturing aspects",
        "page": 342
      },
      {
        "level": 2,
        "title": " 11.1 Tolerance theory",
        "page": 342
      },
      {
        "level": 2,
        "title": " 11.2 Manufacturing methods",
        "page": 347
      },
      {
        "level": 2,
        "title": " References",
        "page": 353
      },
      {
        "level": 1,
        "title": " 12 Outlook for the future",
        "page": 356
      },
      {
        "level": 2,
        "title": " 12.1 Defence systems",
        "page": 356
      },
      {
        "level": 2,
        "title": " 12.2 Millimetre waves",
        "page": 357
      },
      {
        "level": 2,
        "title": " 12.3 Spaceborne systems",
        "page": 357
      },
      {
        "level": 2,
        "title": " 12.4 Communication",
        "page": 358
      },
      {
        "level": 2,
        "title": " 12.5 Manufacturing",
        "page": 358
      },
      {
        "level": 2,
        "title": " 12.6 Design tools and software",
        "page": 358
      },
      {
        "level": 2,
        "title": " References",
        "page": 360
      },
      {
        "level": 1,
        "title": " Appendix Standard waveguide frequency bands",
        "page": 364
      },
      {
        "level": 1,
        "title": " Index",
        "page": 366
      }
    ]
  },
  {
    "cover": "https://media.wiley.com/product_data/coverImage300/42/04705766/0470576642.jpg",
    "title": "Antenna Theory and Design",
    "author": "Warren L. Stutzman, Gary A. Thiele",
    "publisher": "Wiley",
    "granted": false,
    "publisherSite": "https://www.wiley.com/en-us/Antenna+Theory+and+Design%2C+3rd+Edition-p-9781118324202",
    "amazonSite": "https://www.amazon.com/Antenna-Theory-Design-Warren-Stutzman-ebook/dp/B008R0SBHE",
    "edition": 3,
    "year": 2012,
    "description": "This introduction to antenna theory and design is suitable for senior undergraduate and graduate courses on the subject.   Its emphasis on both principles and design makes it perfect both as a college text and as a reference to the practicing engineer. The final three chapters on computational electromagnetics for antennas are suitable for graduate work. Stutzman provides more of a pedagogical approach than its competitors, placing a greater emphasis on a concise easily understandable presentation of fundamentals and applications as well as computational methods. This third edition has been completely revised. New topics have been added on antennas for personal and mobile communications and base station antennas. Coverage of systems applications of antennas, arrays, microstrip and low-profile antennas, and antenna measurements has been updated and expanded, including more examples applied to modern applications.",
    "chapters": [
      {
        "level": 1,
        "title": " Chapter 1 Introduction",
        "page": 21
      },
      {
        "level": 2,
        "title": " 1.1 The History of Antennas",
        "page": 21
      },
      {
        "level": 2,
        "title": " 1.2 What Is an Antenna and When Is it Used?",
        "page": 30
      },
      {
        "level": 2,
        "title": " 1.3 How Antennas Radiate",
        "page": 33
      },
      {
        "level": 2,
        "title": " 1.4 The Four Antenna Types",
        "page": 37
      },
      {
        "level": 2,
        "title": " References",
        "page": 42
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 42
      },
      {
        "level": 1,
        "title": " Chapter 2 Antenna Fundamentals",
        "page": 43
      },
      {
        "level": 2,
        "title": " 2.1 Fundamentals of Electromagnetics",
        "page": 43
      },
      {
        "level": 2,
        "title": " 2.2 Solution of Maxwell's Equations for Radiation Problems",
        "page": 47
      },
      {
        "level": 2,
        "title": " 2.3 The Ideal Dipole",
        "page": 52
      },
      {
        "level": 2,
        "title": " 2.4 Radiation Patterns",
        "page": 56
      },
      {
        "level": 2,
        "title": " 2.5 Directivity and Gain",
        "page": 70
      },
      {
        "level": 2,
        "title": " 2.6 Antenna Impedance",
        "page": 76
      },
      {
        "level": 2,
        "title": " 2.7 Radiation Efficiency",
        "page": 80
      },
      {
        "level": 2,
        "title": " 2.8 Antenna Polarization",
        "page": 81
      },
      {
        "level": 2,
        "title": " References",
        "page": 86
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 86
      },
      {
        "level": 1,
        "title": " Chapter 3 Simple Radiating Systems",
        "page": 90
      },
      {
        "level": 2,
        "title": " 3.1 Electrically Small Dipoles",
        "page": 90
      },
      {
        "level": 2,
        "title": " 3.2 Half-Wave Dipoles",
        "page": 93
      },
      {
        "level": 2,
        "title": " 3.3 Monopoles and Image Theory",
        "page": 95
      },
      {
        "level": 2,
        "title": " 3.4 Small Loop Antennas and Duality",
        "page": 101
      },
      {
        "level": 2,
        "title": " 3.5 Two-Element Arrays",
        "page": 109
      },
      {
        "level": 2,
        "title": " References",
        "page": 117
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 117
      },
      {
        "level": 1,
        "title": " Chapter 4 System Applications for Antennas",
        "page": 120
      },
      {
        "level": 2,
        "title": " 4.1 Introduction",
        "page": 120
      },
      {
        "level": 2,
        "title": " 4.2 Receiving Properties of Antennas",
        "page": 120
      },
      {
        "level": 2,
        "title": " 4.3 Antenna Noise and Radiometry",
        "page": 123
      },
      {
        "level": 2,
        "title": " 4.4 Antennas in Communication Systems",
        "page": 127
      },
      {
        "level": 2,
        "title": " 4.5 Antennas In Wireless Communication Systems",
        "page": 136
      },
      {
        "level": 2,
        "title": " 4.6 Antennas in Radar Systems",
        "page": 142
      },
      {
        "level": 2,
        "title": " 4.7 Antennas As Unintentional Radiators",
        "page": 143
      },
      {
        "level": 2,
        "title": " References",
        "page": 145
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 145
      },
      {
        "level": 1,
        "title": " Chapter 5 Line Sources",
        "page": 148
      },
      {
        "level": 2,
        "title": " 5.1 The Uniform Line Source",
        "page": 148
      },
      {
        "level": 2,
        "title": " 5.2 Tapered Line Sources",
        "page": 157
      },
      {
        "level": 2,
        "title": " 5.3 Fourier Transform Relations Between the Far-Field Pattern and the Source Distribution",
        "page": 162
      },
      {
        "level": 2,
        "title": " 5.4 Fast Wave And Slow Wave Distributions",
        "page": 163
      },
      {
        "level": 2,
        "title": " 5.5 Superdirective Line Sources",
        "page": 165
      },
      {
        "level": 2,
        "title": " References",
        "page": 168
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 168
      },
      {
        "level": 1,
        "title": " Chapter 6 Wire Antennas",
        "page": 171
      },
      {
        "level": 2,
        "title": " 6.1 Dipole Antennas",
        "page": 171
      },
      {
        "level": 2,
        "title": " 6.2 Folded Dipole Antennas",
        "page": 181
      },
      {
        "level": 2,
        "title": " 6.3 Yagi-Uda Antennas",
        "page": 186
      },
      {
        "level": 2,
        "title": " 6.4 Feeding Wire Antennas",
        "page": 195
      },
      {
        "level": 2,
        "title": " 6.5 Loaded Wire Antennas",
        "page": 206
      },
      {
        "level": 2,
        "title": " 6.6 Ground Plane Backed Wire Antennas",
        "page": 210
      },
      {
        "level": 2,
        "title": " 6.7 Wire Antennas Above an Imperfect Ground Plane",
        "page": 218
      },
      {
        "level": 2,
        "title": " 6.8 Large Loop Antennas",
        "page": 225
      },
      {
        "level": 2,
        "title": " References",
        "page": 231
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 232
      },
      {
        "level": 1,
        "title": " Chapter 7 Broadband Antennas",
        "page": 238
      },
      {
        "level": 2,
        "title": " 7.1 Introduction",
        "page": 238
      },
      {
        "level": 2,
        "title": " 7.2 Traveling-Wave Wire Antennas",
        "page": 240
      },
      {
        "level": 2,
        "title": " 7.3 Helical Antennas",
        "page": 245
      },
      {
        "level": 2,
        "title": " 7.4 Biconical Antennas",
        "page": 253
      },
      {
        "level": 2,
        "title": " 7.5 Sleeve Antennas",
        "page": 259
      },
      {
        "level": 2,
        "title": " 7.6 Principles of Frequency-Independent Antennas",
        "page": 263
      },
      {
        "level": 2,
        "title": " 7.7 Spiral Antennas",
        "page": 265
      },
      {
        "level": 2,
        "title": " 7.8 Log-Periodic Antennas",
        "page": 271
      },
      {
        "level": 2,
        "title": " 7.9 Wideband EMC Antennas",
        "page": 281
      },
      {
        "level": 2,
        "title": " 7.10 Ultra-Wideband Antennas",
        "page": 284
      },
      {
        "level": 2,
        "title": " References",
        "page": 286
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 288
      },
      {
        "level": 1,
        "title": " Chapter 8 Array Antennas",
        "page": 291
      },
      {
        "level": 2,
        "title": " 8.1 Introduction",
        "page": 291
      },
      {
        "level": 2,
        "title": " 8.2 The Array Factor for Linear Arrays",
        "page": 292
      },
      {
        "level": 2,
        "title": " 8.3 Uniformly Excited, Equally Spaced Linear Arrays",
        "page": 298
      },
      {
        "level": 2,
        "title": " 8.4 The Complete Array Pattern and Pattern Multiplication",
        "page": 306
      },
      {
        "level": 2,
        "title": " 8.5 Directivity of Uniformly Excited, Equally Spaced Linear Arrays",
        "page": 313
      },
      {
        "level": 2,
        "title": " 8.6 Nonuniformly Excited, Equally Spaced Linear Arrays",
        "page": 318
      },
      {
        "level": 2,
        "title": " 8.7 Mutual Coupling in Arrays",
        "page": 323
      },
      {
        "level": 2,
        "title": " 8.8 Multidimensional Arrays",
        "page": 331
      },
      {
        "level": 2,
        "title": " 8.9 Phased Arrays and Array Feeding Techniques",
        "page": 334
      },
      {
        "level": 2,
        "title": " 8.10 Elements for Arrays",
        "page": 347
      },
      {
        "level": 2,
        "title": " 8.11 Wideband Phased Arrays",
        "page": 352
      },
      {
        "level": 2,
        "title": " References",
        "page": 356
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 358
      },
      {
        "level": 1,
        "title": " Chapter 9 Aperture Antennas",
        "page": 364
      },
      {
        "level": 2,
        "title": " 9.1 Radiation from Apertures and Huygens' Principle",
        "page": 364
      },
      {
        "level": 2,
        "title": " 9.2 Rectangular Apertures",
        "page": 373
      },
      {
        "level": 2,
        "title": " 9.3 Techniques for Evaluating Gain",
        "page": 380
      },
      {
        "level": 2,
        "title": " 9.4 Rectangular Horn Antennas",
        "page": 388
      },
      {
        "level": 2,
        "title": " 9.5 Circular Apertures",
        "page": 405
      },
      {
        "level": 2,
        "title": " 9.6 Reflector Antennas",
        "page": 411
      },
      {
        "level": 2,
        "title": " 9.7 Feed Antennas for Reflectors",
        "page": 436
      },
      {
        "level": 2,
        "title": " 9.8 Lens Antennas",
        "page": 444
      },
      {
        "level": 2,
        "title": " References",
        "page": 445
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 447
      },
      {
        "level": 1,
        "title": " Chapter 10 Antenna Synthesis",
        "page": 453
      },
      {
        "level": 2,
        "title": " 10.1 The Antenna Synthesis Problem",
        "page": 453
      },
      {
        "level": 2,
        "title": " 10.2 Line Source Shaped Beam Synthesis Methods",
        "page": 457
      },
      {
        "level": 2,
        "title": " 10.3 Linear Array Shaped Beam Synthesis Methods",
        "page": 460
      },
      {
        "level": 2,
        "title": " 10.4 Low Side Lobe, Narrow Main Beam Synthesis Methods",
        "page": 466
      },
      {
        "level": 2,
        "title": " 10.5 The Iterative Sampling Method",
        "page": 479
      },
      {
        "level": 2,
        "title": " References",
        "page": 481
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 481
      },
      {
        "level": 1,
        "title": " Chapter 11 Low-Profile Antennas and Personal Communication Antennas",
        "page": 485
      },
      {
        "level": 2,
        "title": " 11.1 Introduction",
        "page": 485
      },
      {
        "level": 2,
        "title": " 11.2 Microstrip Antenna Elements",
        "page": 486
      },
      {
        "level": 2,
        "title": " 11.3 Microstrip Arrays",
        "page": 498
      },
      {
        "level": 2,
        "title": " 11.4 Microstrip Leaky Wave Antennas",
        "page": 501
      },
      {
        "level": 2,
        "title": " 11.5 Fundamental Limits on Antenna Size",
        "page": 508
      },
      {
        "level": 2,
        "title": " 11.6 Antennas for Compact Devices",
        "page": 518
      },
      {
        "level": 2,
        "title": " 11.7 Dielectric Resonator Antennas",
        "page": 532
      },
      {
        "level": 2,
        "title": " 11.8 Near Fields of Electrically Large Antennas",
        "page": 539
      },
      {
        "level": 2,
        "title": " 11.9 Human Body Effects on Antenna Performance",
        "page": 543
      },
      {
        "level": 2,
        "title": " 11.10 Radiation Hazards",
        "page": 546
      },
      {
        "level": 2,
        "title": " References",
        "page": 551
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 553
      },
      {
        "level": 1,
        "title": " Chapter 12 Terminal and Base Station Antennas for Wireless Applications",
        "page": 556
      },
      {
        "level": 2,
        "title": " 12.1 Satellite Terminal Antennas",
        "page": 557
      },
      {
        "level": 2,
        "title": " 12.2 Base Station Antennas",
        "page": 558
      },
      {
        "level": 2,
        "title": " 12.3 Mobile Terminal Antennas",
        "page": 565
      },
      {
        "level": 2,
        "title": " 12.4 Smart Antennas",
        "page": 569
      },
      {
        "level": 2,
        "title": " 12.5 Adaptive and Spatial Filtering Antennas",
        "page": 573
      },
      {
        "level": 2,
        "title": " References",
        "page": 577
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 577
      },
      {
        "level": 1,
        "title": " Chapter 13 Antenna Measurements",
        "page": 579
      },
      {
        "level": 2,
        "title": " 13.1 Reciprocity and Antenna Measurements",
        "page": 579
      },
      {
        "level": 2,
        "title": " 13.2 Pattern Measurement and Antenna Ranges",
        "page": 584
      },
      {
        "level": 2,
        "title": " 13.3 Gain Measurement",
        "page": 591
      },
      {
        "level": 2,
        "title": " 13.4 Polarization Measurement",
        "page": 596
      },
      {
        "level": 2,
        "title": " 13.5 Field Intensity Measurement",
        "page": 600
      },
      {
        "level": 2,
        "title": " 13.6 Mobile Radio Antenna Measurements",
        "page": 602
      },
      {
        "level": 2,
        "title": " 13.7 Rules for Experimental Investigations",
        "page": 603
      },
      {
        "level": 2,
        "title": " References",
        "page": 604
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 604
      },
      {
        "level": 1,
        "title": " Chapter 14 CEM for Antennas The Method of Moments",
        "page": 607
      },
      {
        "level": 2,
        "title": " 14.1 General Introduction to CEM",
        "page": 607
      },
      {
        "level": 2,
        "title": " 14.2 Introduction to the Method of Moments",
        "page": 610
      },
      {
        "level": 2,
        "title": " 14.3 Pocklington's Integral Equation",
        "page": 611
      },
      {
        "level": 2,
        "title": " 14.4 Integral Equations and Kirchhoff's Network Equations",
        "page": 614
      },
      {
        "level": 2,
        "title": " 14.5 Source Modeling",
        "page": 616
      },
      {
        "level": 2,
        "title": " 14.6 Weighted Residuals and the Method of Moments",
        "page": 621
      },
      {
        "level": 2,
        "title": " 14.7 Two Alternative Approaches to the Method of Moments",
        "page": 626
      },
      {
        "level": 2,
        "title": " 14.8 Formulation and Computational Considerations",
        "page": 630
      },
      {
        "level": 2,
        "title": " 14.9 Calculation of Antenna and Scatterer Characteristics",
        "page": 638
      },
      {
        "level": 2,
        "title": " 14.10 The Wire Antenna or Scatterer as an N-Port Network",
        "page": 641
      },
      {
        "level": 2,
        "title": " 14.11 Antenna Arrays",
        "page": 645
      },
      {
        "level": 2,
        "title": " 14.12 Radar Cross Section of Antennas",
        "page": 651
      },
      {
        "level": 2,
        "title": " 14.13 Modeling of Solid Surfaces",
        "page": 656
      },
      {
        "level": 2,
        "title": " 14.14 Summary",
        "page": 665
      },
      {
        "level": 2,
        "title": " References",
        "page": 666
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 667
      },
      {
        "level": 1,
        "title": " Chapter 15 CEM for Antennas Finite Difference Time Domain Method",
        "page": 672
      },
      {
        "level": 2,
        "title": " 15.1 Maxwell's Equations for the FDTD Method",
        "page": 674
      },
      {
        "level": 2,
        "title": " 15.2 Finite Differences and the Yee Algorithm",
        "page": 677
      },
      {
        "level": 2,
        "title": " 15.3 Cell Size, Numerical Stability, and Dispersion",
        "page": 684
      },
      {
        "level": 2,
        "title": " 15.4 Computer Algorithm and FDTD Implementation",
        "page": 687
      },
      {
        "level": 2,
        "title": " 15.5 Absorbing Boundary Conditions",
        "page": 690
      },
      {
        "level": 2,
        "title": " 15.6 Source Conditions",
        "page": 694
      },
      {
        "level": 2,
        "title": " 15.7 Near Fields and Far Fields",
        "page": 701
      },
      {
        "level": 2,
        "title": " 15.8 A Two-Dimensional Example An E?Plane Sectoral Horn Antenna",
        "page": 702
      },
      {
        "level": 2,
        "title": " 15.9 Antenna Analysis and Applications",
        "page": 709
      },
      {
        "level": 2,
        "title": " 15.10 Summary",
        "page": 717
      },
      {
        "level": 2,
        "title": " References",
        "page": 717
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 718
      },
      {
        "level": 1,
        "title": " Chapter 16 CEM for Antennas High-Frequency Methods",
        "page": 720
      },
      {
        "level": 2,
        "title": " 16.1 Geometrical Optics",
        "page": 721
      },
      {
        "level": 2,
        "title": " 16.2 Wedge Diffraction Theory",
        "page": 727
      },
      {
        "level": 2,
        "title": " 16.3 The Ray-Fixed Coordinate System",
        "page": 736
      },
      {
        "level": 2,
        "title": " 16.4 A Uniform Theory of Wedge Diffraction",
        "page": 738
      },
      {
        "level": 2,
        "title": " 16.5 E-Plane Analysis of Horn Antennas",
        "page": 742
      },
      {
        "level": 2,
        "title": " 16.6 Cylindrical Parabolic Reflector Antennas",
        "page": 745
      },
      {
        "level": 2,
        "title": " 16.7 Radiation by a Slot on a Finite Ground Plane",
        "page": 747
      },
      {
        "level": 2,
        "title": " 16.8 Radiation by a Monopole on a Finite Ground Plane",
        "page": 750
      },
      {
        "level": 2,
        "title": " 16.9 Equivalent Current Concepts",
        "page": 752
      },
      {
        "level": 2,
        "title": " 16.10 A Multiple Diffraction Formulation",
        "page": 755
      },
      {
        "level": 2,
        "title": " 16.11 Diffraction by Curved Surfaces",
        "page": 757
      },
      {
        "level": 2,
        "title": " 16.12 Application of UTD to Wireless Mobile Propagation",
        "page": 762
      },
      {
        "level": 2,
        "title": " 16.13 Extension of Moment Method Using the UTD",
        "page": 765
      },
      {
        "level": 2,
        "title": " 16.14 Physical Optics",
        "page": 770
      },
      {
        "level": 2,
        "title": " 16.15 Frequency Dependence of First-Order Scattering Sources",
        "page": 777
      },
      {
        "level": 2,
        "title": " 16.16 Method of Stationary Phase",
        "page": 780
      },
      {
        "level": 2,
        "title": " 16.17 Physical Theory of Diffraction",
        "page": 783
      },
      {
        "level": 2,
        "title": " 16.18 Cylindrical Parabolic Reflector Antennas?PTD",
        "page": 789
      },
      {
        "level": 2,
        "title": " 16.19 Summary",
        "page": 791
      },
      {
        "level": 2,
        "title": " References",
        "page": 791
      },
      {
        "level": 2,
        "title": " Problems",
        "page": 793
      },
      {
        "level": 1,
        "title": " Appendix A Frequency Bands",
        "page": 801
      },
      {
        "level": 2,
        "title": " A.1 Radio Frequency Bands",
        "page": 801
      },
      {
        "level": 2,
        "title": " A.2 Television Channel Frequencies (in North America)",
        "page": 801
      },
      {
        "level": 2,
        "title": " A.3 Cellular Telephone Bands",
        "page": 802
      },
      {
        "level": 2,
        "title": " A.4 Radar Bands",
        "page": 802
      },
      {
        "level": 1,
        "title": " Appendix B Material Data and Constants",
        "page": 803
      },
      {
        "level": 2,
        "title": " B.1 Conductivities of Good Conductors",
        "page": 803
      },
      {
        "level": 2,
        "title": " B.2 Wire Data",
        "page": 803
      },
      {
        "level": 2,
        "title": " B.3 Dielectric Constant Permittivity of Free Space",
        "page": 804
      },
      {
        "level": 2,
        "title": " B.4 Permeability of Free Space",
        "page": 804
      },
      {
        "level": 2,
        "title": " B.5 Velocity of Light of Free Space",
        "page": 804
      },
      {
        "level": 2,
        "title": " B.6 Intrinsic Impedance of Free Space",
        "page": 804
      },
      {
        "level": 2,
        "title": " B.7 Properties of Some Common Dielectrics",
        "page": 804
      },
      {
        "level": 1,
        "title": " Appendix C Coordinate Systems and Vectors",
        "page": 805
      },
      {
        "level": 2,
        "title": " C.1 The Coordinate Systems and Unit Vectors",
        "page": 805
      },
      {
        "level": 2,
        "title": " C.2 Vector Identities",
        "page": 806
      },
      {
        "level": 2,
        "title": " C.3 Vector Differential Operators",
        "page": 807
      },
      {
        "level": 1,
        "title": " Appendix D Trigonometric Relations",
        "page": 809
      },
      {
        "level": 1,
        "title": " Appendix E Hyperbolic Relations",
        "page": 811
      },
      {
        "level": 1,
        "title": " Appendix F Mathematical Relations",
        "page": 812
      },
      {
        "level": 2,
        "title": " F.1 Dirac Delta Function",
        "page": 812
      },
      {
        "level": 2,
        "title": " F.2 Binomial Theorem",
        "page": 812
      },
      {
        "level": 2,
        "title": " F.3 Bessel Functions",
        "page": 812
      },
      {
        "level": 2,
        "title": " F.4 Some Useful Integrals",
        "page": 813
      },
      {
        "level": 1,
        "title": " Appendix G Computing Tools for Antennas",
        "page": 814
      },
      {
        "level": 2,
        "title": " G.1 Wire Antenna Simulation Packages",
        "page": 814
      },
      {
        "level": 2,
        "title": " G.2 Parabolic Reflector Antenna Simulation Packages",
        "page": 815
      },
      {
        "level": 2,
        "title": " G.3 Web Sites with Antenna Calculation and Modeling Tools",
        "page": 815
      },
      {
        "level": 1,
        "title": " Appendix H Book List",
        "page": 816
      },
      {
        "level": 2,
        "title": " H.1 Introduction",
        "page": 816
      },
      {
        "level": 2,
        "title": " H.2 Antenna Definitions",
        "page": 816
      },
      {
        "level": 2,
        "title": " H.3 Fundamental Books on Antennas",
        "page": 816
      },
      {
        "level": 2,
        "title": " H.4 Books on Antennas with Propagation",
        "page": 818
      },
      {
        "level": 2,
        "title": " H.5 Books On Antennas With Other Topics",
        "page": 818
      },
      {
        "level": 2,
        "title": " H.6 Handbooks and General Reference Books on Antennas",
        "page": 818
      },
      {
        "level": 2,
        "title": " H.7 Books on Antenna Measurements",
        "page": 819
      },
      {
        "level": 2,
        "title": " H.8 Books on Specific Antenna Topics",
        "page": 820
      },
      {
        "level": 2,
        "title": " H.9 Books on Antennas For Specific Applications",
        "page": 824
      },
      {
        "level": 2,
        "title": " H.10 Books on Computational Methods for Antennas",
        "page": 826
      },
      {
        "level": 2,
        "title": " H.11 Books on Topics Closely Related to Antennas",
        "page": 828
      },
      {
        "level": 1,
        "title": " Index",
        "page": 830
      },
      {
        "level": 1,
        "title": " Symbols",
        "page": 841
      }
    ]
  },
  {
    "cover": "https://digital-library.theiet.org/docserver/fulltext/PBEW012Emedium.jpg",
    "title": "Microstrip Antenna Theory and Design",
    "author": "J. R. James, P. S. Hall, C. Wood",
    "publisher": "Peter Peregrinus Ltd.",
    "granted": false,
    "publisherSite": "https://digital-library.theiet.org/content/books/ew/pbew012e",
    "amazonSite": "https://www.amazon.com/Microstrip-Antenna-Theory-Design-Electromagnetics/dp/086341088X",
    "edition": 1,
    "year": 1981,
    "description": "This book brings a blend of introductory, practical and theoretical treatments and likely future developments are also highlighted. A good selection of past and current references are given and each chapter concludes with a helpful summary comment.",
    "chapters": [
      {
        "level": 1,
        "title": " Contents",
        "page": 6
      },
      {
        "level": 1,
        "title": " Preface",
        "page": 10
      },
      {
        "level": 1,
        "title": " Acknowledgments",
        "page": 12
      },
      {
        "level": 1,
        "title": " Principal symbols",
        "page": 14
      },
      {
        "level": 1,
        "title": " 1 Flat-plate antenna techniques and constraints on performance",
        "page": 16
      },
      {
        "level": 1,
        "title": " 2 Microstrip design equations and data",
        "page": 36
      },
      {
        "level": 1,
        "title": " 3 Radiation mechanism of an open-circuit microstrip termination ? fundamental design implications",
        "page": 57
      },
      {
        "level": 1,
        "title": " 4 Basic methods of calculation and design of patch antennas",
        "page": 82
      },
      {
        "level": 1,
        "title": " 5 Linear array techniques",
        "page": 126
      },
      {
        "level": 1,
        "title": " 6 Techniques and design limitations in two-dimensional arrays",
        "page": 175
      },
      {
        "level": 1,
        "title": " 7 Circular polarisation techniques",
        "page": 209
      },
      {
        "level": 1,
        "title": " 8 Some manufacturing and operational problems of microstrip antennas",
        "page": 240
      },
      {
        "level": 1,
        "title": " 9 Recent advances in microstrip antenna analysis",
        "page": 248
      },
      {
        "level": 1,
        "title": " 10 Other trends and possible future developments",
        "page": 271
      },
      {
        "level": 1,
        "title": " Appendixes",
        "page": 298
      },
      {
        "level": 1,
        "title": " Index",
        "page": 303
      }
    ]
  },
  {
    "cover": "https://onlinelibrary.wiley.com/cms/attachment/8f258736-81e4-4a84-9b30-b1e30c775459/0471720615.cover.gif",
    "title": "Modern Antenna Design",
    "author": "Thomas A. Milligan",
    "publisher": "Wiley",
    "granted": false,
    "publisherSite": "https://onlinelibrary.wiley.com/doi/book/10.1002/0471720615",
    "amazonSite": "https://www.amazon.com/Modern-Antenna-Design-Thomas-Milligan/dp/0471457760",
    "edition": 2,
    "year": 2005,
    "description": "A practical book written for engineers who design and use antennas \nThe author has many years of hands on experience designing antennas that were used in such applications as the Venus and Mars missions of NASA \nThe book covers all important topics of modern antenna design for communications \nNumerical methods will be included but only as much as are needed for practical applications",
    "chapters": [
      {
        "level": 1,
        "title": "1 Properties of Antennas ",
        "page": 20
      },
      {
        "level": 1,
        "title": "2 Radiation Structures and Numerical Methods ",
        "page": 61
      },
      {
        "level": 1,
        "title": "3 Arrays ",
        "page": 121
      },
      {
        "level": 1,
        "title": "4 Aperture Distributions and Array Synthesis ",
        "page": 155
      },
      {
        "level": 1,
        "title": "5 Dipoles Slots and Loops ",
        "page": 236
      },
      {
        "level": 1,
        "title": "6 Microstrip Antennas ",
        "page": 304
      },
      {
        "level": 1,
        "title": "7 Horn Antennas ",
        "page": 355
      },
      {
        "level": 1,
        "title": "8 Reflector Antennas ",
        "page": 399
      },
      {
        "level": 1,
        "title": "9 Lens Antennas ",
        "page": 466
      },
      {
        "level": 1,
        "title": "10 Traveling-Wave Antennas ",
        "page": 493
      },
      {
        "level": 1,
        "title": "11 Frequency-Independent Antennas ",
        "page": 540
      },
      {
        "level": 1,
        "title": "12 Phased Arrays ",
        "page": 592
      }
    ]
  },
  {
    "cover": "https://images.tandf.co.uk/common/jackets/amazon/978084931/9780849312069.jpg",
    "title": "Smart Antennas",
    "author": "Lal Chand Godara",
    "publisher": "CRC Press",
    "granted": false,
    "publisherSite": "https://www.crcpress.com/Smart-Antennas/Godara/p/book/9780849312069",
    "amazonSite": "https://www.amazon.com/Antennas-Electrical-Engineering-Applied-Processing/dp/084931206X",
    "edition": 1,
    "year": 2004,
    "description": " The use of smart antennas to increase mobile communications channels has re-ignited research and development in the field. Practicing engineers are eager to discover more about this subject, and need a comprehensive book that can provide a learning platform and prevent the loss of time spent on searches through journal literature.\n Smart Antennas examines nearly all aspects of array signal processing and presents them in a logical manner. It delivers a detailed treatment of antenna array processing schemes, adaptive algorithms to adjust weighting, direction of arrival (DOA) estimation methods, diversity-combining methods that combat fading and reduce errors.\n The book introduces the various processor structures suitable for the narrowband field, examining the behavior of both element space and beamspace processors. It then explores adaptive processing, focusing on the simple matrix inversion algorithm, constrained least mean squares (LMS), the neural network approach, and more. The text also describes smart antennas that are suitable for broadband signals, and presents analyses and techniques suitable for correlated fields in narrowband and broadband signals.",
    "chapters": [
      {
        "level": 1,
        "title": " Chapter 01 Introduction",
        "page": 19
      },
      {
        "level": 2,
        "title": " 1.1 Antenna Gain",
        "page": 19
      },
      {
        "level": 2,
        "title": " 1.2 Phased Array Antenna",
        "page": 20
      },
      {
        "level": 2,
        "title": " 1.3 Power Pattern",
        "page": 20
      },
      {
        "level": 2,
        "title": " 1.4 Beam Steering",
        "page": 20
      },
      {
        "level": 2,
        "title": " 1.5 Degree of Freedom",
        "page": 21
      },
      {
        "level": 2,
        "title": " 1.6 Optimal Antenna",
        "page": 22
      },
      {
        "level": 2,
        "title": " 1.7 Adaptive Antenna",
        "page": 22
      },
      {
        "level": 2,
        "title": " 1.8 Smart Antenna",
        "page": 22
      },
      {
        "level": 2,
        "title": " 1.9 Book Outline",
        "page": 23
      },
      {
        "level": 2,
        "title": " References",
        "page": 24
      },
      {
        "level": 1,
        "title": " Chapter 02 Narrowband Processing",
        "page": 25
      },
      {
        "level": 2,
        "title": " 2.1 Signal Model",
        "page": 29
      },
      {
        "level": 2,
        "title": " 2.2 Conventional Beamformer",
        "page": 36
      },
      {
        "level": 2,
        "title": " 2.3 Null Steering Beamformer",
        "page": 43
      },
      {
        "level": 2,
        "title": " 2.4 Optimal Beamformer",
        "page": 44
      },
      {
        "level": 2,
        "title": " 2.5 Optimization Using Reference Signal",
        "page": 51
      },
      {
        "level": 2,
        "title": " 2.6 Beam Space Processing",
        "page": 54
      },
      {
        "level": 2,
        "title": " 2.7 Effect of Errors",
        "page": 85
      },
      {
        "level": 2,
        "title": " Acknowledgments",
        "page": 108
      },
      {
        "level": 2,
        "title": " Notation and Abbreviations",
        "page": 108
      },
      {
        "level": 2,
        "title": " References",
        "page": 113
      },
      {
        "level": 1,
        "title": " Chapter 03 Adaptive Processing",
        "page": 118
      },
      {
        "level": 2,
        "title": " 3.1 Sample Matrix Inversion Algorithm",
        "page": 120
      },
      {
        "level": 2,
        "title": " 3.2 Unconstrained Least Mean Squares Algorithm",
        "page": 121
      },
      {
        "level": 2,
        "title": " 3.3 Normalized Least Mean Squares Algorithm",
        "page": 137
      },
      {
        "level": 2,
        "title": " 3.4 Constrained Least Mean Squares Algorithm",
        "page": 137
      },
      {
        "level": 2,
        "title": " 3.5 Perturbation Algorithms",
        "page": 147
      },
      {
        "level": 2,
        "title": " 3.6 Structured Gradient Algorithm",
        "page": 156
      },
      {
        "level": 2,
        "title": " 3.7 Recursive Least Mean Squares Algorithm",
        "page": 160
      },
      {
        "level": 2,
        "title": " 3.8 Improved Least Mean Squares Algorithm",
        "page": 164
      },
      {
        "level": 2,
        "title": " 3.9 Recursive Least Squares Algorithm",
        "page": 167
      },
      {
        "level": 2,
        "title": " 3.10 Constant Modulus Algorithm",
        "page": 169
      },
      {
        "level": 2,
        "title": " 3.11 Conjugate Gradient Method",
        "page": 170
      },
      {
        "level": 2,
        "title": " 3.12 Neural Network Approach",
        "page": 171
      },
      {
        "level": 2,
        "title": " 3.13 Adaptive Beam Space Processing",
        "page": 173
      },
      {
        "level": 2,
        "title": " 3.14 Signal Sensitivity of Constrained Least Mean Squares Algorithm",
        "page": 180
      },
      {
        "level": 2,
        "title": " 3.15 Implementation Issues",
        "page": 183
      },
      {
        "level": 2,
        "title": " Acknowledgments",
        "page": 191
      },
      {
        "level": 2,
        "title": " Notation and Abbreviations",
        "page": 191
      },
      {
        "level": 2,
        "title": " References",
        "page": 195
      },
      {
        "level": 2,
        "title": " Appendices",
        "page": 199
      },
      {
        "level": 1,
        "title": " Chapter 04 Broadband Processing",
        "page": 218
      },
      {
        "level": 2,
        "title": " 4.1 Tapped-Delay Line Structure",
        "page": 220
      },
      {
        "level": 2,
        "title": " 4.2 Partitioned Realization",
        "page": 233
      },
      {
        "level": 2,
        "title": " 4.3 Derivative Constrained Processor",
        "page": 242
      },
      {
        "level": 2,
        "title": " 4.4 Correlation Constrained Processor",
        "page": 253
      },
      {
        "level": 2,
        "title": " 4.5 Digital Beamforming",
        "page": 254
      },
      {
        "level": 2,
        "title": " 4.6 Frequency Domain Processing",
        "page": 257
      },
      {
        "level": 2,
        "title": " 4.7 Broadband Processing Using Discrete Fourier Transform Method",
        "page": 269
      },
      {
        "level": 2,
        "title": " 4.8 Performance",
        "page": 284
      },
      {
        "level": 2,
        "title": " Acknowledgments",
        "page": 284
      },
      {
        "level": 2,
        "title": " Notation and Abbreviations",
        "page": 285
      },
      {
        "level": 2,
        "title": " References",
        "page": 288
      },
      {
        "level": 1,
        "title": " Chapter 05 Correlated Fields",
        "page": 292
      },
      {
        "level": 2,
        "title": " 5.1 Correlated Signal Model",
        "page": 293
      },
      {
        "level": 2,
        "title": " 5.2 Optimal Element Space Processor",
        "page": 295
      },
      {
        "level": 2,
        "title": " 5.3 Optimized Postbeamformer Interference Canceler Processor",
        "page": 297
      },
      {
        "level": 2,
        "title": " 5.4 Signal-to-Noise Ratio Performance",
        "page": 300
      },
      {
        "level": 2,
        "title": " 5.5 Methods to Alleviate Correlation Effects",
        "page": 306
      },
      {
        "level": 2,
        "title": " 5.6 Spatial Smoothing Method",
        "page": 309
      },
      {
        "level": 2,
        "title": " 5.7 Structured Beamforming Method",
        "page": 314
      },
      {
        "level": 2,
        "title": " 5.8 Correlated Broadband Sources",
        "page": 327
      },
      {
        "level": 2,
        "title": " Acknolwedgments",
        "page": 338
      },
      {
        "level": 2,
        "title": " Notation and Abbreviations",
        "page": 338
      },
      {
        "level": 2,
        "title": " References",
        "page": 340
      },
      {
        "level": 1,
        "title": " Chapter 06 Direction-of-Arrival Estimation Methods",
        "page": 342
      },
      {
        "level": 2,
        "title": " 6.1 Spectral Estimation Methods",
        "page": 343
      },
      {
        "level": 2,
        "title": " 6.2 Minimum Variance Distortionless Response Estimator",
        "page": 343
      },
      {
        "level": 2,
        "title": " 6.3 Linear Prediction Method",
        "page": 344
      },
      {
        "level": 2,
        "title": " 6.4 Maximum Entropy Method",
        "page": 344
      },
      {
        "level": 2,
        "title": " 6.5 Maximum Likelihood Method",
        "page": 346
      },
      {
        "level": 2,
        "title": " 6.6 Eigenstructure Methods",
        "page": 346
      },
      {
        "level": 2,
        "title": " 6.7 MUSIC Algorithm",
        "page": 347
      },
      {
        "level": 2,
        "title": " 6.8 Minimum Norm Method",
        "page": 349
      },
      {
        "level": 2,
        "title": " 6.9 CLOSEST Method",
        "page": 350
      },
      {
        "level": 2,
        "title": " 6.10 ESPRIT Method",
        "page": 350
      },
      {
        "level": 2,
        "title": " 6.11 Weighted Subspace Fitting Method",
        "page": 353
      },
      {
        "level": 2,
        "title": " 6.12 Review of Other Methods",
        "page": 353
      },
      {
        "level": 2,
        "title": " 6.13 Preprocessing Techniques",
        "page": 355
      },
      {
        "level": 2,
        "title": " 6.14 Estimating Source Number",
        "page": 357
      },
      {
        "level": 2,
        "title": " 6.15 Performance Comparison",
        "page": 358
      },
      {
        "level": 2,
        "title": " 6.16 Sensitivity Analysis",
        "page": 360
      },
      {
        "level": 2,
        "title": " Acknowledgments",
        "page": 364
      },
      {
        "level": 2,
        "title": " Notation and Abbreviations",
        "page": 364
      },
      {
        "level": 2,
        "title": " References",
        "page": 366
      },
      {
        "level": 1,
        "title": " Chapter 07 Single-Antenna System in Fading Channels",
        "page": 375
      },
      {
        "level": 2,
        "title": " 7.1 Fading Channels",
        "page": 375
      },
      {
        "level": 2,
        "title": " 7.2 Channel Gain",
        "page": 383
      },
      {
        "level": 2,
        "title": " 7.3 Single-Antenna System",
        "page": 384
      },
      {
        "level": 2,
        "title": " Notation and Abbreviations",
        "page": 393
      },
      {
        "level": 2,
        "title": " References",
        "page": 395
      },
      {
        "level": 1,
        "title": " Chapter 08 Diversity Combining",
        "page": 396
      },
      {
        "level": 2,
        "title": " 8.1 Selection Combiner",
        "page": 400
      },
      {
        "level": 2,
        "title": " 8.2 Switched Diversity Combiner",
        "page": 410
      },
      {
        "level": 2,
        "title": " 8.3 Equal Gain Combiner",
        "page": 415
      },
      {
        "level": 2,
        "title": " 8.4 Maximum Ratio Combiner",
        "page": 423
      },
      {
        "level": 2,
        "title": " 8.5 Optimal Combiner",
        "page": 433
      },
      {
        "level": 2,
        "title": " 8.6 Generalized Selection Combiner",
        "page": 436
      },
      {
        "level": 2,
        "title": " 8.7 Cascade Diversity Combiner",
        "page": 443
      },
      {
        "level": 2,
        "title": " 8.8 Macroscopic Diversity Combiner",
        "page": 450
      },
      {
        "level": 2,
        "title": " Notation and Abbreviations",
        "page": 454
      },
      {
        "level": 2,
        "title": " References",
        "page": 456
      }
    ]
  },
  {
    "cover": "https://digital-library.theiet.org/docserver/fulltext/PBEW019Emedium.jpg",
    "title": "Microwave Antenna Theory and Design",
    "author": "Samuel Silver",
    "publisher": "IET",
    "granted": true,
    "publisherSite": "https://digital-library.theiet.org/content/books/ew/pbew019e",
    "amazonSite": "https://www.amazon.com/Microwave-Antenna-Theory-Design-Electromagnetics/dp/0863410170",
    "edition": 1,
    "year": 1949,
    "description": "Microwave Antenna Theory and Design is an unabridged reprint of the book published by McGraw Hill, as Volume 12 of the MIT Radiation Laboratory Series in 1949. The Editor of the Volume, the late Professor Samuel Silver, contributed extensively to the text and subsequently became one of the best known people in the world of radio science.\n Although published in 1949, Microwave Antenna Theory and Design, or 'Silver' as it is commonly known, still remains today essential reading for all those engaged in the microwave antenna field and many subsequent texts have assumed the readers' familiarity with the material in Silver. Access to it has become increasingly difficult with the passage of time and so it is hoped that this reprint will find a ready market among engineers.",
    "chapters": [
      {
        "level": 1,
        "title": "1 SURVEY OF MICROWAVE ANTENNA DESIGN PROBLEMS . ",
        "page": 14
      },
      {
        "level": 1,
        "title": "2 CIRCUIT RELATIONS, RECIPROCITY THEOREMS ",
        "page": 29
      },
      {
        "level": 1,
        "title": "3 RADIATION FROM CURRENT DISTRIBUTIONS ",
        "page": 74
      },
      {
        "level": 1,
        "title": "4 WAVE FRONTS AND RAYS ",
        "page": 120
      },
      {
        "level": 1,
        "title": "5 SCATTERING AND DIFFRACTION. ",
        "page": 142
      },
      {
        "level": 1,
        "title": "6 APERTURE ILLUMINATION AND ANTENNA PATTERNS . ",
        "page": 182
      },
      {
        "level": 1,
        "title": "7 MICROWAVE TRANSMISSION LINES ",
        "page": 213
      },
      {
        "level": 1,
        "title": "8 MICROWAVE DIPOLE ANTENNAS AND FEEDS ..... . ",
        "page": 252
      },
      {
        "level": 1,
        "title": "9 LINEAR ARRAY ANTENNAS AND FEEDS ",
        "page": 270
      },
      {
        "level": 1,
        "title": "10 WAVEGUIDE AND HORN FEEDS ",
        "page": 347
      },
      {
        "level": 1,
        "title": "11 DIELECTRIC AND METAL-PLATE LENSES ",
        "page": 401
      },
      {
        "level": 1,
        "title": "12 PENCIL-BEAM AND SIMPLE FANNED-BEAM ANTENNAS ",
        "page": 426
      },
      {
        "level": 1,
        "title": "13 SHAPED-BEAM ANTENNAS ",
        "page": 478
      },
      {
        "level": 1,
        "title": "14 ANTENNA INSTALLATION PROBLEMS ",
        "page": 523
      },
      {
        "level": 1,
        "title": "15 ANTENNA MEASUREMENTS—TECHNIQUES ",
        "page": 556
      },
      {
        "level": 1,
        "title": "16 ANTENNA MEASUREMENTS—EQUIPMENT ",
        "page": 606
      }
    ]
  },
  {
    "cover": "https://ieeexplore.ieee.org/ebooks/5265564/5265564.jpg",
    "title": "Antenna Theory & Analysis",
    "author": "Robert S. Elliot",
    "publisher": "Wiley - IEEE Press",
    "granted": true,
    "publisherSite": "https://ieeexplore.ieee.org/book/5265564",
    "amazonSite": "https://www.amazon.com/Antenna-Theory-Design-Robert-Elliott/dp/0471449962",
    "edition": "Revised",
    "year": 2003,
    "description": "First published in 1981, Robert S. Elliott's Antenna Theory and Design is one of the most significant works in electromagnetic theory and applications. In its broad-ranging, analytic treatment, replete with supporting experimental evidence, Antenna Theory and Design conveys fundamental methods of analysis that can be used to predict the electromagnetic behavior of nearly everything that radiates. After more than two decades, it remains a key resource for students, professors, researchers, and engineers who require a comprehensive, in-depth treatment of the subject.",
    chapterDisplayLevel: 1,
    "chapters": [
      {
        "level": 1,
        "title": "Frontmatter"
      },
      {
        "level": 1,
        "title": "SourceField Relations Single Antenna Elements"
      },
      {
        "level": 1,
        "title": "The FarField Integrals, Reciprocity, Directivity"
      },
      {
        "level": 1,
        "title": "Radiation Patterns of Dipoles, Loops, and Helices"
      },
      {
        "level": 1,
        "title": "Radiation Patterns of Horns, Slots and Patch Antennas"
      },
      {
        "level": 1,
        "title": "Array Analysis and Synthesis"
      },
      {
        "level": 1,
        "title": "Linear Arrays: Analysis"
      },
      {
        "level": 1,
        "title": "Linear Arrays: Synthesis"
      },
      {
        "level": 1,
        "title": "Planar Arrays: Analysis and Synthesis"
      },
      {
        "level": 1,
        "title": "SelfImpedance and Mutual Impedance, Feeding Structures"
      },
      {
        "level": 1,
        "title": "SelfImpedance and Mutual Impedance of Antenna Elements"
      },
      {
        "level": 1,
        "title": "The Design of Feeding Structures for Antenna Elements and Arrays"
      },
      {
        "level": 1,
        "title": "Continuous Aperture Antennas"
      },
      {
        "level": 1,
        "title": "Traveling Wave Antennas"
      },
      {
        "level": 1,
        "title": "Reflectors and Lenses"
      },
      {
        "level": 1,
        "title": "Appendices"
      },
      {
        "level": 1,
        "title": "A. Reduction of the Vector Green's Formula for E"
      },
      {
        "level": 1,
        "title": "B. The Wave Equations for A and Φ"
      },
      {
        "level": 1,
        "title": "C. Derivation of the Chebyshev Polynomials"
      },
      {
        "level": 1,
        "title": "D. A General Expansion of cosm V"
      },
      {
        "level": 1,
        "title": "E. Approximation to the Magnetic Vector Potential Function for Slender"
      },
      {
        "level": 1,
        "title": "F. Diffraction by Plane Conducting Screens: Babinet's Principle"
      },
      {
        "level": 1,
        "title": "G. The FarField in Cylindrical Coordinates"
      },
      {
        "level": 1,
        "title": "H. The Utility of a CSC2 θ Pattern"
      },
      {
        "level": 1,
        "title": "Index"
      },
      {
        "level": 1,
        "title": "About the Author"
      }
    ]
  }
]
