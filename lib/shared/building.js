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
      this.rooms.push({ name: roomName });
    },

    tick: function () {
      var inTransit;
      this.barricade = Math.max(0, this.barricade - this.zombies / 100);
      if (this.barricade === 0 && this.rooms.length > 0) {
        var room = this.rooms[0];
        room.zombies = room.zombies || 0;
        inTransit = Math.min(3, this.zombies);
        room.zombies += inTransit;
        this.zombies -= inTransit;
      }
      for (var roomIndex = this.rooms.length-2; roomIndex >= 0; roomIndex--) {
        var from = this.rooms[roomIndex];
        var to = this.rooms[roomIndex+1];
        from.zombies = from.zombies || 0;
        to.zombies = to.zombies || 0;
        inTransit = Math.min(2, from.zombies);
        from.zombies -= inTransit;
        to.zombies += inTransit;
      }
    }
  };

}(ZOMBIE));

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = ZOMBIE.building;
}