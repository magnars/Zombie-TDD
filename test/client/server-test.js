(function (Z) {
  "use strict";

  buster.testCase('Server', {
    setUp: function () {
      Z.urlPrefix = "";
      this.stub(jQuery, "getJSON");
    },

    "delegates to jQuery": function () {
      Z.server.getCurrentBuildingProperties(this.spy());

      assert.calledOnceWith(jQuery.getJSON, "/current-building.json");
    },

    "uses urlPrefix if any": function () {
      Z.urlPrefix = "test";
      Z.server.getCurrentBuildingProperties(this.spy());

      assert.calledOnceWith(jQuery.getJSON, "test/current-building.json");
    },

    "calls back": function () {
      var callback = this.spy();
      Z.server.getCurrentBuildingProperties(callback);

      jQuery.getJSON.invokeCallback({ yaba: "dabadoo" });

      assert.calledOnceWith(callback, { yaba: "dabadoo" });
    }
  });
}(ZOMBIE));