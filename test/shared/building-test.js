if (typeof require === "function" && typeof module !== "undefined") {
  var buster = require("buster");
  var ZOMBIE = { building: require("../../lib/shared/building") };
}

(function (Z) {
  "use strict";
  
  buster.testCase('Building', {
    "should add first room to building": function () {
      var building = Z.building.create({});

      building.buildRoom("Trapdoor");

      assert.equals(building.rooms[0].name, "Trapdoor");
    },

    "should add more rooms to building": function () {
      var building = Z.building.create({ rooms: [ { name: "Trapdoor" } ] });

      building.buildRoom("Hiding spot");

      assert.equals(building.rooms[1].name, "Hiding spot");
    }
  });
}(ZOMBIE));