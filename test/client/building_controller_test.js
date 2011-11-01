(function (Z) {
  "use strict";
  var assert = buster.assert;

  function setupController(model) {
    this.buildingRoot = document.createElement("div");
    this.blueprintRoot = document.createElement("div");

    this.blueprintRoot.innerHTML = "<button class='buildRoom' data-type='Spiked mat'></button>";

    this.controller = Z.buildingController.create({
      model: model,
      buildingRoot: this.buildingRoot,
      blueprintRoot: this.blueprintRoot
    });
  }

  buster.testCase('Building controller', {
    setUp: function () {
      this.setupController = setupController;
    },

    "should add first room to model": function () {
      var model = {};
      this.setupController(model);
      this.controller.buildRoom("Trapdoor");
      assert.equals(model.rooms[0].name, "Trapdoor");
    },

    "should add more rooms to model": function () {
      var model = { rooms: [ { name: "Trapdoor" } ] };
      this.setupController(model);
      this.controller.buildRoom("Hiding spot");
      assert.equals(model.rooms[1].name, "Hiding spot");
    },

    "should render building after build": function () {
      this.setupController({});
      this.controller.buildRoom("Spiked mat");
      assert.match(this.buildingRoot.innerHTML, "Spiked mat");
    },

    "should buildRoom when button is clicked": function () {
      this.setupController({});
      this.controller.init();
      $(this.blueprintRoot).find("button").trigger("click");
      assert.match(this.buildingRoot.innerHTML, "Spiked mat");
    }

  });

}(ZOMBIE));