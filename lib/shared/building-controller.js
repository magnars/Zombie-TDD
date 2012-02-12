var ZOMBIE = this.ZOMBIE || {};

if (typeof require === "function" && typeof module !== "undefined") {
  var EventEmitter = require("events").EventEmitter;
}

(function (Z) {
  "use strict";

  var init = function () {
    var self = this;
    this.hub.subscribe("/buildRoom", function (message) {
      self.building.buildRoom(message.name);
      self.emit("change", self.building);
    });
  };

  var create = function (params) {
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
