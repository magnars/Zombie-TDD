var ZOMBIE = this.ZOMBIE || {};

(function (Z) {
  "use strict";

  Z.building = {
    create: function (params) {
      var instance = Object.create(this);
      instance.rooms = params.rooms || [];
      instance.zombies = params.zombies || 0;
      instance.sleepers = params.sleepers || 0;
      instance.barricade = params.barricade || 100;
      return instance;
    },

    buildRoom: function (roomName) {
      this.rooms.push({ name: roomName });
    },

    tick: function () {
      this.barricade -= this.zombies / 100;
    }
  };

}(ZOMBIE));

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = ZOMBIE.building;
}