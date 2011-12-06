(function () {
  "use strict";

  ZOMBIE.blueprintController = {
    create: function (params) {
      return Object.create(this, {
        blueprintRoot: { value: params.blueprintRoot },
        hub: { value: params.hub }
      });
    },

    init: function () {
      var self = this;
      $(this.blueprintRoot).delegate(".buildRoom", "click", function () {
        self.hub.publish("/buildRoom", { name: $(this).data("type") });
      });
    }
  };
}());
