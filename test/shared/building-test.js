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
      assert.equals(Z.building.create({}).barricade, 0);
    },

    "has default value for sleepers": function () {
      assert.equals(Z.building.create({}).sleepers, 0);
    },

    "no zombies does not destroy barricade": function () {
      var building = Z.building.create({barricade: 100});
      building.tick();
      assert.equals(building.barricade, 100);
    },

    "zombies destroy the barricade": function () {
      var building = Z.building.create({ zombies: 100, barricade: 100 });
      building.tick();
      assert.equals(building.barricade, 100 - (100 / 100));
    },

    "zombies get through the barricade": function () {
      var building = Z.building.create({ zombies: 100, barricade: 1 });
      building.tick();
      building.tick();
      assert.equals(building.barricade, 0);
    },

    "zombies invade the lounge": function () {
      var lounge = Z.room.create({ name: "The Lounge" });
      var building = Z.building.create({
        zombies: 1,
        barricade: 0,
        rooms: [lounge]
      });

      building.tick();

      assert.equals(lounge.zombies, 1);
      assert.equals(building.zombies, 0);
    },

    "zombies invade the lounge in waves": function () {
      var lounge = Z.room.create({ name: "The Lounge" });
      var building = Z.building.create({
        zombies: 10,
        barricade: 0,
        rooms: [lounge]
      });

      building.tick();
      building.tick();

      assert.equals(lounge.zombies, 6);
      assert.equals(building.zombies, 4);
    },

    "zombies crawl further into the building": function () {
      var lounge = Z.room.create({ name: "The Lounge", zombies: 3 });
      var hallway = Z.room.create({ name: "The Hallway", zombies: 1 });
      var kitchen = Z.room.create({ name: "The Kitchen" });
      var building = Z.building.create({
        zombies: 0,
        barricade: 0,
        rooms: [lounge, hallway, kitchen]
      });

      building.tick();

      assert.equals(lounge.zombies, 1);
      assert.equals(hallway.zombies, 2);
      assert.equals(kitchen.zombies, 1);
    },

    "non-existant zombies don't crawl": function () {
      var lounge = Z.room.create({ name: "The Lounge", zombies: 0 });
      var hallway = Z.room.create({ name: "The Hallway", zombies: 1 });
      var building = Z.building.create({
        zombies: 0,
        barricade: 0,
        rooms: [lounge, hallway]
      });

      building.tick();

      assert.equals(lounge.zombies, 0);
      assert.equals(hallway.zombies, 1);
    },

    "zombies are stopped by barricade": function () {
      var lounge = Z.room.create({ name: "The Lounge", zombies: 0 });
      var building = Z.building.create({
        zombies: 1,
        barricade: 10,
        rooms: [lounge]
      });

      building.tick();

      assert.equals(lounge.zombies, 0);
      assert.equals(building.zombies, 1);
    },

    "let's kills some zombies": function () {
      var trapdoor1 = Z.rooms.trapdoor.create({ zombies: 1 });
      var trapdoor2 = Z.rooms.trapdoor.create();
      var building = Z.building.create({
        zombies: 10,
        barricade: 0,
        rooms: [trapdoor1, trapdoor2]
      });

      building.tick();

      assert.equals(trapdoor1.zombies, 2);
      assert.equals(trapdoor1.deadZombies, 1);

      assert.equals(trapdoor2.zombies, 0);
      assert.equals(trapdoor2.deadZombies, 1);
    },

    "trapdoors should not be anonymous": function () {
      var trapdoor = Z.rooms.trapdoor.create();
      assert.equals(trapdoor.name, "Trapdoor");
    },

    "adds first room to building": function () {
      var building = Z.building.create({});

      building.buildRoom("Trapdoor");

      assert.equals(building.rooms[0].name, "Trapdoor");
    },

    "adds more rooms to building": function () {
      var building = Z.building.create({
        rooms: [ Z.room.create({ name: "Trapdoor" }) ]
      });

      building.buildRoom("Hiding spot");

      assert.equals(building.rooms[1].name, "Hiding spot");
    }
  });
}(ZOMBIE));