(function (Z) {
  "use strict";

  buster.testCase('Blueprint Controller', {
    setUp: function () {
      this.hub = { emit: this.stub() };
      this.blueprintRoot = document.createElement("div");
      this.blueprintRoot.innerHTML = "<button " +
        "class='buildRoom' data-type='Spiked mat'></button>";
    },

    "should emit 'buildRoom' when button is clicked": function () {
      Z.blueprintController.create({
        blueprintRoot: this.blueprintRoot,
        hub: this.hub
      }).init();

      $(this.blueprintRoot).find("button").trigger("click");

      assert.calledOnce(this.hub.emit);
      assert.calledWith(this.hub.emit, "buildRoom", { name: "Spiked mat" });
    }
  });
}(ZOMBIE));