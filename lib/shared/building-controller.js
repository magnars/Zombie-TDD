var ZOMBIE = this.ZOMBIE || {};

if (typeof require === "function" && typeof module !== "undefined") {
  var EventEmitter = require("events").EventEmitter;
  var when = require("when");
}

(function (Z) {
  "use strict";

  var init = function () {
    var self = this;
    var deferred = when.defer();
    var subscription = this.hub.subscribe("/buildRoom", function (message) {
      self.building.buildRoom(message.name);
      self.emit("change", self.building);
    });
    subscription.callback(deferred.resolve);
    return deferred.promise;
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
