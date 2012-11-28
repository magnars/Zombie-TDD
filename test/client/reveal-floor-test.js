(function (Z) {
  "use strict";

  buster.testCase("Reveal Floor", {
    "no rooms": function () {
      assert.equals([[]], Z.revealFloor([[]], { visitedRooms: [] }));
    },

    "player has not visited any rooms": function () {
      var visited = Z.revealFloor([[{}], [{}]], { visitedRooms: [] });
      assert.equals(visited, [[null], [null]]);
    },

    "player has visited a room": function () {
      var visited = Z.revealFloor([[{ id: 1, type: "entrance" }]], {
        visitedRooms: [1]
      });
      assert.equals(visited, [[{ id: 1, type: "entrance" }]]);
    },

    "does not freak out over null rooms": function () {
      refute.exception(function () {
        Z.revealFloor([[null]], { visitedRooms: [] });
      });
    },

    "does not freak out over null neighbours": function () {
      refute.exception(function () {
        Z.revealFloor([[null, { id: 1 }]], { visitedRooms: [1] });
      });
    },

    "player smells neighbouring rooms": function () {
      var visited = Z.revealFloor([
        [{ id: 1 }, { id: 2 }, { id: 3 }],
        [{ id: 4 }, { id: 5 }, { id: 6 }],
        [{ id: 7 }, { id: 8 }, { id: 9 }]
      ], {
        visitedRooms: [5]
      });
      assert.equals(visited, [
        [null, { id: 2, type: "concealed" }, null],
        [{ id: 4, type: "concealed" }, { id: 5 }, { id: 6, type: "concealed" }],
        [null, { id: 8, type: "concealed" }, null]
      ]);
    },

    "player cannot see neighbouring rooms": function () {
      var visited = Z.revealFloor([
        [{ id: 1, type: "trap" }, { id: 2, type: "room" }]
      ], {
        visitedRooms: [2]
      });
      assert.equals(visited, [
        [{ id: 1, type: "concealed" }, { id: 2, type: "room" }]
      ]);
    }
  });
}(ZOMBIE));