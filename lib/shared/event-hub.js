var ZOMBIE = this.ZOMBIE || {};

if (typeof require === "function" && typeof module !== "undefined") {
  var when = require("when");
}

(function (Z) {

  function addListener(event, callback) {
    var d = when.defer();
    var sub = this.client.subscribe("/" + event, callback);
    sub.callback(d.resolve);
    return d.promise;
  }

  function addListeners(events) {
    var self = this;
    return when.all(Object.keys(events).map(function (key) {
      return addListener.call(self, key, events[key]);
    }));
  }

  Z.eventHub = {
    create: function (client) {
      var instance = Object.create(this);
      instance.client = client;
      return instance;
    },

    on: function (o, callback) {
      if (typeof o === "string" && typeof callback === "function") {
        return addListener.call(this, o, callback);
      }
      if (typeof o === "object" && !callback) {
        return addListeners.call(this, o, callback);
      }
      throw new TypeError("eventHub.on takes [event, callback]");
    }
  };

}(ZOMBIE));

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = ZOMBIE.eventHub;
}