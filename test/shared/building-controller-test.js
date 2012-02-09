if (typeof require === "function" && typeof module !== "undefined") {
  var buster = require("buster");
  var ZOMBIE = { buildingController: require("../../lib/shared/building-controller") };
}

(function (Z) {
  "use strict";
  
  buster.testCase('Building Controller', {
    setUp: function () {
      this.building = { buildRoom: this.stub() };
      this.hub = { subscribe: this.stub() };
      this.controller = Z.buildingController.create({
        building: this.building,
        hub: this.hub
      });
    },

    "should notify listeners when building changes": function () {
      var listener = this.stub();
      this.controller.on("change", listener);
      
      this.hub.subscribe.yields({ name: "Flamethrower Surprise" });
      this.controller.init();

      assert.calledOnceWith(listener, this.building);
    },

    "should delegate events to building": function () {
      this.hub.subscribe.yields({ name: "Flamethrower Surprise" });
      this.controller.init();

      assert.calledOnceWith(this.building.buildRoom, "Flamethrower Surprise");
    }
  });
}(ZOMBIE));