(function (Z) {
  "use strict";

  testCase('RoomControllerTest', sinon.testCase({
    "test should add first room to model": function () {
      var model = {};
      Z.addRoom("Trapdoor", model);
      assertEquals(model.rooms[0].name, "Trapdoor");
    },

    "test should add more rooms to model": function () {
      var model = { rooms: [ { name: "Trapdoor" } ] };
      Z.addRoom("Hiding spot", model);
      assertEquals(model.rooms[1].name, "Hiding spot");
    },

  }));
  
})(ZOMBIE);