(function (Z) {
  "use strict";
  var assert = buster.assert;
  
  buster.testCase('Blueprint Controller', {
    setUp: function () {
      this.blueprintRoot = document.createElement("div");

      this.blueprintRoot.innerHTML = "<button " +
        "class='buildRoom' data-type='Spiked mat'></button>";
      
      this.hub = { publish: this.stub() };

    },
    
    "should publish 'buildRoom' when button is clicked": function () {
      Z.blueprintController.create({
        blueprintRoot: this.blueprintRoot,
        hub: this.hub
      }).init();
      $(this.blueprintRoot).find("button").trigger("click");
      assert.calledOnce(this.hub.publish);
      assert.calledWith(this.hub.publish, "/buildRoom", { name: "Spiked mat" });
    }


  });
  
}(ZOMBIE));