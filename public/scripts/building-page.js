ZOMBIE.pageInitialized = (function (Z) {
  "use strict";

  var hub = Z.eventHub.create(new Faye.Client("http://localhost:3000/faye"));

  Z.blueprintController.create({
    blueprintRoot: document.getElementById("blueprints"),
    hub: hub
  }).init();

  var d = when.defer();

  Z.server.getCurrentBuildingProperties(function (props) {
    var building = Z.building.create(props);

    var controller = Z.buildingController.create({
      building: building,
      hub: hub
    });

    controller.on("change", function (building) {
      Z.updateBuildingView(
        document.getElementById("building"),
        Z.renderBuilding,
        building
      );
    });

    controller.init().then(d.resolve);
  });

  return d.promise;

}(ZOMBIE));