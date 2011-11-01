var ZOMBIE = this.ZOMBIE || {};

(function () {
  "use strict";

  ZOMBIE.buildingController = {
    create: function (params) {
      return Object.create(this, {
        model: { value: params.model },
        buildingRoot: { value: params.buildingRoot },
        blueprintRoot: { value: params.blueprintRoot }
      });
    },

    init: function () {
      var self = this;
      $(this.blueprintRoot).delegate(".buildRoom", "click", function () {
        self.buildRoom($(this).data("type"));
      });
    },

    buildRoom: function (roomName) {
      this.model.rooms = this.model.rooms || [];
      this.model.rooms.push({ name: roomName });
      this.buildingRoot.innerHTML = ZOMBIE.renderBuilding(this.model);
    }
  };

}());
