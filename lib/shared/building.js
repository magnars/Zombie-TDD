var ZOMBIE = this.ZOMBIE || {};

(function (Z) {
  "use strict";

  Z.building = {
    create: function (params) {
      return Object.create(this, {
        rooms: { value: params.rooms || [] }
      });
    },

    buildRoom: function (roomName) {
      this.rooms.push({ name: roomName });
    }
  };

}(ZOMBIE));

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = ZOMBIE.building;
}