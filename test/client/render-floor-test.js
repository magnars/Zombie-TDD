(function (Z) {
  "use strict";

  buster.testCase("Render Floor", {
    "return dom element with class grid": function () {
      var grid = Z.renderFloor([[]]);
      assert.className(grid, "grid");
    },

    "includes row": function () {
      var grid = Z.renderFloor([[{}]]);
      var row = grid.firstChild;
      assert.className(row, "row");
    },

    "includes multiple rows": function () {
      var grid = Z.renderFloor([[{}], [{}], [{}]]);
      assert.equals(grid.childNodes.length, 3);
    },

    "includes cell in row": function () {
      var grid = Z.renderFloor([[{ type: "trap" }]]);
      var row = grid.firstChild;
      assert.className(row.firstChild, "cell trap");
    },

    "includes multiple cells in row": function () {
      var grid = Z.renderFloor([[{}, {}, {}]]);
      var row = grid.firstChild;
      assert.equals(row.childNodes.length, 3);
    },

    "blanks null rooms": function () {
      var grid = Z.renderFloor([[{}, null]]);
      var row = grid.firstChild;
      assert.className(row.childNodes[1], "cell hidden");
    },

    "includes room id on room element": function () {
      var grid = Z.renderFloor([[{ id: 1 }]]);
      var row = grid.firstChild;
      assert.equals(row.childNodes[0].getAttribute("data-id"), "1");
    }
  });
}(ZOMBIE));