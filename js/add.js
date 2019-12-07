// enable for 'hsyn'
webix.ready(function () {
  var element = document.getElementById("add")
  webix.ajax().get("/authorization/api/v1/user", function (t, d, x) {
    if (d.json() && d.json().username == "hsyn") {
      element.setAttribute("style", element.getAttribute("style") + "display: block;")
    }
    else{
      $('#add').hide()
    }
  })
})

var newItem = {}

// Add Item form
var addFormItems = [
  { id: "addItemTitle", name: "title", view: "text", label: "Title" },
  { id: "addItemAuthor", name: "author", view: "text", label: "Author(s)" },
  { id: "addItemPublisher", name: "publisher", view: "text", label: "Publisher" },
  { id: "addItemPublisherSite", name: "publisherSite", view: "text", label: "Publisher site" },
  { id: "addItemAmazonSite", name: "amazonSite", view: "text", label: "Amazon site" },
  {
    cols: [
      { id: "addItemEdition", name: "edition", view: "text", label: "Edition:" },
      { id: "addItemYear", name: "year", view: "text", label: "Year:", labelWidth: 45 },
    ], margin: 25
  },
  { id: "addItemDescription", name: "description", view: "textarea", label: "Description", height: 50 },
  {
    cols: [
      { id: "addItemFile", name: "filename", view: "text", label: "File:", gravity: 2 },
      {
        id: "addItemFileUpload", view: "uploader", autosend: false, label: "Select file", graivty: 1, accept: "application/pdf",
        multiple: false,
        upload: "/filesystem/api/v1/files",
        formData: { folder: "portfolios/books" },
      },
    ], margin: 25
  },
]

webix.ui({
  id: "addItemWindow",
  view: "window",
  position: "center",
  headHeight: 0,
  modal: true,
  width: window.innerWidth - 400,
  height: window.innerHeight - 100,
  body: {
    rows: [
      {
        cols: [
          {
            rows: [
              { id: "coverImage", css: "text-center", template: '<img id="coverImage" class="text-center mw-100 mh-100 align-self-center" src="http://bilgem.tubitak.gov.tr/sites/images/atam.jpg">' },
              {
                id: "addItemCoverUpload",
                view: "uploader",
                value: "Cover image",
                name: "files",
                accept: "image/png, image/gif, image/jpeg",
                multiple: false,
                autosend: false,
                upload: "/filesystem/api/v1/files",
                formData: { folder: "portfolios/books/covers" },
              }],
            graivty: 1
          },
          {
            rows: [{},
            { id: "addItemProceed", view: "button", label: "Add", type: "form", width: 100, height: 50 },
            { id: "addItemCancel", view: "button", label: "Cancel", type: "danger", width: 100, height: 50 },
            {}, { id: "addItemChapters", view: "button", label: "Edit chapters" }],
            graivty: 1
          }
        ]
      },
      { id: "addItemDetails", view: "form", elements: addFormItems, margin: 1 }
    ]
  }
})

// Chapter TreeTable
webix.ui({
  id: "addItemChaptersWindow",
  view: "window",
  position: "center",
  headHeight: 0,
  modal: true,
  width: window.innerWidth - 150,
  height: window.innerHeight - 250,
  body: {
    rows: [
      {
        id: "chaptersTree",
        view: "treetable",
        columns: [
          { id: "name", header: "Chapter", editor: "text", fillspace: 1, template: "{common.treetable()} #name#" },
          { id: "start", header: "Start", width: 50, editor: "text" },
          { id: "stop", header: "Stop", width: 50, editor: "text" },
        ],
        select: true,
        scrollX: false,
        editable: true,
        editaction: "dblclick"
      },
      {
        cols: [
          { id: "addItemChaptersWindowClose", view: "button", type: "danger", label: "Close" },
          { id: "addItemChaptersWindowSave", view: "button", type: "form", label: "Save" },
          { id: "addItemChaptersWindowClear", view: "button", type: "base", label: "Clear" },
        ]
      }
    ]
  }
})