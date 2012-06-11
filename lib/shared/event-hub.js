var ZOMBIE = this.ZOMBIE || {};

if (typeof require === "function" && typeof module !== "undefined") {
  var when = require("when");
}

(function (Z) {

  Z.eventHub = {
    create: function (client) {

      function addListener(event, listener) {
        var d = when.defer();
        var sub = client.subscribe("/" + event, listener);
        sub.callback(d.resolve);
        return d.promise;
      }

      function addListeners(listeners) {
        return when.all(Object.keys(listeners).map(function (event) {
          return addListener(event, listeners[event]);
        }));
      }

      function on(o, callback) {
        if (typeof o === "string" && typeof callback === "function") {
          return addListener(o, callback);
        }
        if (typeof o === "object" && !callback) {
          return addListeners(o, callback);
        }
        throw new TypeError("eventHub.on takes [event, callback] " +
                            "or [listeners]");
      }

      function emit(event, message) {
        client.publish("/" + event, message);
      }

      return {
        on: on,
        emit: emit
      };
    }

  };

}(ZOMBIE));

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = ZOMBIE.eventHub;
}