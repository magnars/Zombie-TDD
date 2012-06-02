var ZOMBIE = this.ZOMBIE || {};

(function () {
  "use strict";

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

}());

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = ZOMBIE.room;
}