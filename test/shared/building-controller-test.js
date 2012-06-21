if (typeof require === "function" && typeof module !== "undefined") {
  var buster = require("buster");
  var when = require("when");
  var ZOMBIE = {
    buildingController: require("../../lib/shared/building-controller")
  };
}

(function (Z) {
  "use strict";

  buster.testCase("Building Controller", {
    setUp: function () {
      this.building = { buildRoom: this.stub(), tick: this.stub() };
      this.hub = { on: this.stub() };
      this.controller = Z.buildingController.create({
        building: this.building,
        hub: this.hub
      });
    },

    "requires building": function () {
      assert.exception(function () {
        Z.buildingController.create({ hub: {} });
      }, "TypeError");
    },

    "requires hub": function () {
      assert.exception(function () {
        Z.buildingController.create({ building: {} });
      }, "TypeError");
    },

    "init should return promise from hub": function () {
      this.hub.on.returns("my little promise");
      assert.equals(this.controller.init(), "my little promise");
    },

    "notifies listeners when building changes": function () {
      var listener = this.stub();
      this.controller.on("change", listener);
      this.controller.init();

      this.hub.on.yieldTo("buildRoom", {
        name: "Flamethrower Surprise"
      });

      assert.calledOnceWith(listener, this.building);
    },

    "delegates events to building": function () {
      this.controller.init();

      this.hub.on.yieldTo("buildRoom", {
        name: "Flamethrower Surprise"
      });

      assert.calledOnceWith(this.building.buildRoom, "Flamethrower Surprise");
    },

    "delegates tick to building": function () {
      this.controller.init();

      this.hub.on.yieldTo("tick", {});

      assert.calledOnceWith(this.building.tick);
    }
  });
}(ZOMBIE));