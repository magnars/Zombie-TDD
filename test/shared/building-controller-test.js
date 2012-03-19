if (typeof require === "function" && typeof module !== "undefined") {
  var buster = require("buster");
  var when = require("when");
  var ZOMBIE = {
    buildingController: require("../../lib/shared/building-controller")
  };
}

(function (Z) {
  "use strict";

  buster.testCase('Building Controller', {
    setUp: function () {
      this.building = { buildRoom: this.stub() };
      this.subscription = { callback: this.stub() };
      this.hub = { subscribe: this.stub().returns(this.subscription) };
      this.controller = Z.buildingController.create({
        building: this.building,
        hub: this.hub
      });
    },

    "should require building": function () {
      assert.exception(function () {
        Z.buildingController.create({ hub: {} });
      }, "TypeError");
    },

    "should require hub": function () {
      assert.exception(function () {
        Z.buildingController.create({ building: {} });
      }, "TypeError");
    },

    "init should return promise": function () {
      assert(when.isPromise(this.controller.init()));
    },

    "init promise should resolve when hub is subscribed": function () {
      var spy = this.spy();
      this.controller.init().then(spy);

      refute.called(spy);
      this.subscription.callback.yield();

      assert.calledOnce(spy);
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