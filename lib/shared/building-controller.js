var ZOMBIE = this.ZOMBIE || {};

if (typeof require === "function" && typeof module !== "undefined") {
  var EventEmitter = require("events").EventEmitter;
  var when = require("when");
}

(function (Z) {
  "use strict";

  var buildRoom = function (message) {
    this.building.buildRoom(message.name);
    this.emit("change", this.building);
  };

  var tick = function (message) {
    this.building.tick();
    this.emit("change", this.building);
  };

  var init = function () {
    return this.hub.on({
      "tick": tick.bind(this),
      "buildRoom": buildRoom.bind(this)
    });
  };

  var create = function (params) {
    if (!params.building) {
      throw new TypeError("Building controller requires building");
    }
    if (!params.hub) {
      throw new TypeError("Building controller requires hub");
    }
    return Object.create(this, {
      building: { value: params.building },
      hub: { value: params.hub }
    });
  };

  Z.buildingController = Object.create(new EventEmitter(), {
    create: { value: create },
    init: { value: init }
  });

}(ZOMBIE));

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = ZOMBIE.buildingController;
}
