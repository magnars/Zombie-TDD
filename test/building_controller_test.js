(function (Z) {
  "use strict";

  testCase('BuildingControllerTest', sinon.testCase({
    "test should add first room to model": function () {
      var model = {};
      Z.buildRoom("Trapdoor", model);
      assertEquals(model.rooms[0].name, "Trapdoor");
    },

    "test should add more rooms to model": function () {
      var model = { rooms: [ { name: "Trapdoor" } ] };
      Z.buildRoom("Hiding spot", model);
      assertEquals(model.rooms[1].name, "Hiding spot");
    }

  }));
  
}(ZOMBIE));