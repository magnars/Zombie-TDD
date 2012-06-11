(function (Z) {
  "use strict";

  buster.testCase('Update Building View', {
    "inserts renderer result into root with building": function () {
      var renderer = this.stub().returns("<h1>CiA adiuence for the win!!!</h1>");
      var building = { id: 42 };
      var root = document.createElement("div");

      Z.updateBuildingView(root, renderer, building);

      assert.match(root.innerHTML, "CiA adiuence for the win!!!");
    }
  });
}(ZOMBIE));