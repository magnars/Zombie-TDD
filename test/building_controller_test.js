if (typeof require === "function" && typeof module !== "undefined") {
  buster = require("buster");
  ZOMBIE = { buildRoom: require("../lib/building_controller") };
}

(function (Z) {
  "use strict";
  var assert = buster.assert;

  buster.testCase('BuildingControllerTest', {
    "should add first room to model": function () {
      var model = {};
      Z.buildRoom("Trapdoor", model);
      assert.equals(model.rooms[0].name, "Trapdoor");
    },

    "should add more rooms to model": function () {
      var model = { rooms: [ { name: "Trapdoor" } ] };
      Z.buildRoom("Hiding spot", model);
      assert.equals(model.rooms[1].name, "Hiding spot");
    }

  });

}(ZOMBIE));