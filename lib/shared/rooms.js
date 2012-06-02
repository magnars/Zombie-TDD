var ZOMBIE = this.ZOMBIE || {};

if (typeof require === "function" && typeof module !== "undefined") {
  ZOMBIE.room = require("./room");
}

(function (Z) {
  "use strict";

  Z.rooms = {};
  Z.rooms.trapdoor = Object.create(Z.room);
  Z.rooms.trapdoor.create = function (params) {
    params = params || {};
    params.name = "Trapdoor";
    return Z.room.create.call(this, params);
  };
  Z.rooms.trapdoor.zombiesEnter = function (inTransit) {
    this.deadZombies += 1;
    this.zombies += inTransit - 1;
  };

}(ZOMBIE));

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = ZOMBIE.rooms;
}