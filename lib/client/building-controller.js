var ZOMBIE = this.ZOMBIE || {};

(function () {
  "use strict";

  ZOMBIE.buildingController = {
    create: function (params) {
      return Object.create(this, {
        model: { value: params.model },
        buildingRoot: { value: params.buildingRoot },
        renderer: { value: params.renderer },
        hub: { value: params.hub }
      });
    },

    init: function () {
      var self = this;
      this.hub.subscribe("/buildRoom", function (message) {
        self.buildRoom(message.name);
      });
    },

    buildRoom: function (roomName) {
      this.model.rooms = this.model.rooms || [];
      this.model.rooms.push({ name: roomName });
      this.buildingRoot.innerHTML = this.renderer(this.model);
    }
  };

}());
