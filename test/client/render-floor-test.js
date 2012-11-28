(function (Z) {
  "use strict";

  var some = [].some;

  buster.assertions.add("hasWall", {
    assert: function (cell, direction) {
      var hasWall = function (el) { return el.className === direction + "-wall"; };
      return some.call(cell.childNodes, hasWall);
    },
    assertMessage: "Expected ${0} to have wall at ${1}",
    refuteMessage: "Expected ${0} not to have wall at ${1}"
  });

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
    },

    "adds walls to single room": function () {
      var grid = Z.renderFloor([[{ id: 1 }]]);
      var row = grid.firstChild;
      var cell = row.firstChild;
      assert.hasWall(cell, "north");
      assert.hasWall(cell, "east");
      assert.hasWall(cell, "south");
      assert.hasWall(cell, "west");
    },

    "does not add walls inside horizontally": function () {
      var grid = Z.renderFloor([[{ id: 1 }, { id: 2 }]]);
      var row = grid.firstChild;
      var west = row.firstChild;
      var east = row.lastChild;
      refute.hasWall(west, "east");
      refute.hasWall(east, "west");
    },

    "does not add walls inside vertically": function () {
      var grid = Z.renderFloor([[{ id: 1 }], [{ id: 2 }]]);
      var north = grid.firstChild.firstChild;
      var south = grid.lastChild.firstChild;
      refute.hasWall(north, "south");
      refute.hasWall(south, "north");
    },

    "does not add walls to concealed rooms": function () {
      var grid = Z.renderFloor([[{ id: 1, type: "concealed" }]]);
      var row = grid.firstChild;
      var cell = row.firstChild;
      refute.hasWall(cell, "north");
      refute.hasWall(cell, "east");
      refute.hasWall(cell, "south");
      refute.hasWall(cell, "west");
    }
  });
}(ZOMBIE));