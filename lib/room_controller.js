var ZOMBIE = this.ZOMBIE || {};

(function () {
  "use strict";

  ZOMBIE.addRoom = function (roomName, model) {
    model.rooms = model.rooms || [];
    model.rooms.push({ name: roomName });
  };

}());
