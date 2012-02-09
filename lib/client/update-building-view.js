var ZOMBIE = this.ZOMBIE || {};

(function (Z) {
  "use strict";

  Z.updateBuildingView = function (root, renderer, building) {
    root.innerHTML = renderer(building);
  };

}(ZOMBIE));