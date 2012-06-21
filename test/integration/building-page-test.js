/*global testHelper*/

(function () {
  "use strict";

  buster.testRunner.timeout = 1000;

  function numRooms() {
    return $(".building li").length;
  }

  buster.testCase("Building Page", {
    setUp: function (done) {
      testHelper.loadPage("/", done);
    },

    "contains title after loading page": function () {
      assert.match(document.body.innerHTML, "Zombie TDD");
    },

    "adds room when clicking buildRoom": function (done) {
      var old = numRooms();

      $(".buildRoom:first").trigger("click");

      setTimeout(done(function () {
        assert.equals(numRooms(), old + 1);
      }), 300);
    },

    "rooms aren't volatile": function (done) {
      $(".buildRoom:first").trigger("click");

      setTimeout(function () {
        testHelper.getPageContents("/", done(function (html) {
          var room = $(html).find(".room:last").text();
          assert.equals(room, "Traphole");
        }));
      }, 300);
    }
  });
}());