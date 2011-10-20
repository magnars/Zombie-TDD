var ZOMBIE = this.ZOMBIE || {};

(function () {
  "use strict";

  ZOMBIE.buildRoom = function (roomName, model) {
    model.rooms = model.rooms || [];
    model.rooms.push({ name: roomName });
  };

}());

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = ZOMBIE.buildRoom;
}