if (typeof require === "function" && typeof module !== "undefined") {
  var buster = require("buster");
  var ZOMBIE = { building: require("../../lib/shared/building") };
}

(function (Z) {
  "use strict";

  buster.testCase('Building', {
    "should use given values": function () {
      var building = Z.building.create({ zombies: 77, barricade: 2, sleepers: 3});
      assert.equals(building.zombies, 77);
      assert.equals(building.barricade, 2);
      assert.equals(building.sleepers, 3);
    },

    "has default values for zombies": function () {
      assert.equals(Z.building.create({}).zombies, 0);
    },

    "has default value for barricade": function () {
      assert.equals(Z.building.create({}).barricade, 100);
    },

    "has default value for sleepers": function () {
      assert.equals(Z.building.create({}).sleepers, 0);
    },

    "no zombies does not destroy barricade": function () {
      var building = Z.building.create({});
      building.tick();
      assert.equals(building.barricade, 100);
    },

    "zombies destroy the barricade": function () {
      var building = Z.building.create({zombies:100});
      building.tick();
      assert.equals(building.barricade, 100 - (100/100));
    },

    "zombies get through the barricade": function () {
      var building = Z.building.create({zombies:100, barricade:1 });
      building.tick();
      building.tick();
      assert.equals(building.barricade, 0);
    },

    "adds first room to building": function () {
      var building = Z.building.create({});

      building.buildRoom("Trapdoor");

      assert.equals(building.rooms[0].name, "Trapdoor");
    },

    "adds more rooms to building": function () {
      var building = Z.building.create({ rooms: [ { name: "Trapdoor" } ] });

      building.buildRoom("Hiding spot");

      assert.equals(building.rooms[1].name, "Hiding spot");
    }
  });
}(ZOMBIE));