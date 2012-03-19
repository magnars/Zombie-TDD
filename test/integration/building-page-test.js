(function () {
  "use strict";

  buster.testRunner.timeout = 1000;

  function numRooms() {
    return $(".building li").length;
  }

  buster.testCase('Building Page', {
    setUp: function (done) {
      testHelper.loadPage("/", done);
    },

    "should contain title after loading page": function () {
      assert.match(document.body.innerHTML, "Zombie TDD");
    },

    "should add room when clicking buildRoom": function (done) {
      var old = numRooms();

      $(".buildRoom:first").trigger("click");

      setTimeout(done(function () {
        assert.equals(numRooms(), old + 1);
      }), 300);
    }
  });
}());