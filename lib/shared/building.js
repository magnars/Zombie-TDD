var ZOMBIE = this.ZOMBIE || {};

if (typeof require === "function" && typeof module !== "undefined") {
  ZOMBIE.room = require("./room");
}

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
      this.rooms.push(Z.room.create({ name: roomName }));
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

}(ZOMBIE));

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = ZOMBIE.building;
}