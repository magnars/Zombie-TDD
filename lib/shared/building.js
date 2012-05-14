var ZOMBIE = this.ZOMBIE || {};

(function (Z) {
  "use strict";

  Z.building = {
    create: function (params) {
      var instance = Object.create(this);
      instance.rooms = params.rooms || [];
      instance.zombies = params.zombies || 0;
      instance.sleepers = params.sleepers || 0;
      instance.barricade = params.barricade || 0;
      return instance;
    },

    buildRoom: function (roomName) {
      this.rooms.push(ZOMBIE.room.create({ name: roomName }));
    },

    tick: function () {
      var inTransit, roomIndex;
      this.barricade = Math.max(0, this.barricade - this.zombies / 100);
      for (roomIndex = this.rooms.length - 2; roomIndex >= 0; roomIndex -= 1) {
        var from = this.rooms[roomIndex];
        var to = this.rooms[roomIndex + 1];
        inTransit = Math.min(2, from.zombies);
        from.zombies -= inTransit;
        to.zombiesEnter(inTransit);
      }
      if (this.barricade === 0 && this.rooms.length > 0) {
        var room = this.rooms[0];
        inTransit = Math.min(3, this.zombies);
        this.zombies -= inTransit;
        room.zombiesEnter(inTransit);
      }
    }
  };

  ZOMBIE.room = {
    create: function (params) {
      var instance = Object.create(this);
      params = params || {};
      instance.name = params.name || "Empty room";
      instance.zombies = params.zombies || 0;
      instance.deadZombies = params.deadZombies || 0;
      return instance;
    },

    zombiesEnter: function (inTransit) {
      this.zombies += inTransit;
    }
  };

  ZOMBIE.rooms = {};
  ZOMBIE.rooms.trapdoor = Object.create(ZOMBIE.room);
  ZOMBIE.rooms.trapdoor.create = function (params) {
    params = params || {};
    params.name = "Trapdoor";
    return ZOMBIE.room.create.call(this, params);
  };
  ZOMBIE.rooms.trapdoor.zombiesEnter = function (inTransit) {
    this.deadZombies += 1;
    this.zombies += inTransit - 1;
  };


}(ZOMBIE));

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = ZOMBIE.building;
}