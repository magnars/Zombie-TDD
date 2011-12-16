(function (Z) {
  "use strict";

  buster.testCase('Building controller', {
    setUp: function () {
      this.hub = { subscribe: this.stub() };
      this.buildingRoot = document.createElement("div");
      this.setupController = function (model) {
        this.controller = Z.buildingController.create({
          model: model,
          buildingRoot: this.buildingRoot,
          renderer: ZOMBIE.renderBuilding,
          hub: this.hub
        });
      };
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
    
    "should render building on 'buildRoom' event": function () {
      this.setupController({});

      this.hub.subscribe.yields({ name: "Flamethrower Surprise" });
      this.controller.init();

      assert.match(this.buildingRoot.innerHTML, "Flamethrower Surprise");
    }
  });
}(ZOMBIE));