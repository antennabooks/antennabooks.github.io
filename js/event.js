//=============================================================================
// Add Item
//=============================================================================
function openAddItemWin() {
  $$("addItemWindow").show();
}

$$("addItemWindow").attachEvent("onShow", function () {
  newItem = {}
})

$$("addItemCoverUpload").attachEvent("onAfterFileAdd", function (file) {
  var reader = new FileReader();
  reader.onload = function (e) {
    $('#coverImage').attr('src', e.target.result);
  };
  reader.readAsDataURL(document.querySelector("input").files[0]);
})


$$("addItemFileUpload").attachEvent("onAfterFileAdd", function (file) {
  $$("addItemFile").setValue(file.name)
})

$$("addItemChapters").attachEvent("onItemClick", function () {
  $$("addItemChaptersWindow").show();
})

$$("addItemCancel").attachEvent("onItemClick", function () {
  $$("addItemDetails").clear();
  $$("addItemWindow").hide();
})

$$("addItemProceed").attachEvent("onItemClick", function () {
  $$("addItemFileUpload").send(function (res) {
    if (res && res.insertedId) {
      newItem.file = res.insertedId
      $$("addItemCoverUpload").send(function (res) {
        if (res && res.insertedId) {
          newItem.cover = res.insertedId
          newItem = Object.assign(newItem,$$("addItemDetails").getValues())
          console.log(newItem)
          newItem.users = ['guest']
          webix.ajax().headers({ "Content-type": "application/json" }).post("/database/api/v1/portfolios/books", newItem, function (t, d, x) {
            if (d.json().insertedId) {
              $$("addItemDetails").clear();
              $$("addItemWindow").hide();
            }
            else {
              console.log(d.json());
            }
          })
        }
        else console.log(res)
      })
    }
    else console.log(res)
  })
})

//=============================================================================
// add item chapter window
//=============================================================================
$$("chaptersTree").attachEvent("onKeyPress", function (code, e) {
  var parentId = this.getSelectedId() || 0
  if (e.code == "KeyA") {
    this.open(parentId)
    this.add({ name: "New Chapter" }, 0, parentId)
  }
  if (e.code == "KeyD" && parentId) {
    this.remove(parentId)
  }
  if (e.code == "Escape") {
    this.unselect()
  }
})

// only for first two two level
function treeTableToJSON(treeTableId) {
  var tree = []
  $$(treeTableId).find({}).forEach(function (item) {
    if (item.$parent === 0) {
      delete item.$count; delete item.$level; delete item.$parent;
      tree.push(Object.assign({ children: [] }, item))
    }
    else {
      var parent = tree.find(function (parentItem) {
        return parentItem.name == $$(treeTableId).getItem(item.$parent).name
      })
      delete item.$count; delete item.$level; delete item.$parent;
      parent.children.push(item)
    }
  });
  return tree
}

$$("addItemChaptersWindowClose").attachEvent("onItemClick", function () {
  $$("addItemChaptersWindow").hide();
})

$$("addItemChaptersWindowSave").attachEvent("onItemClick", function () {
  newItem.chapters = treeTableToJSON("chaptersTree")
  $$("addItemChaptersWindow").hide();
})

$$("addItemChaptersWindowClear").attachEvent("onItemClick", function () {
  $$("chaptersTree").clearAll();
})
