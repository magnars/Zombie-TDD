if (typeof require === "function" && typeof module !== "undefined") {
  buster = require("buster");
  ZOMBIE = { renderBuilding: require("../../lib/shared/building-renderer") };
}

(function (Z) {
  "use strict";

  buster.assertions.add("roomWithText", {
    assert: function (html, cssClass, text) {
      var expected = "<li class='" + cssClass + "'><p>" + text + "</p></li>";
      return html.indexOf(expected) >= 0;
    },
    assertMessage: 'Render failed: Expected ${0} to contain ${1} with text ${2}'
  });

  buster.testCase('Building renderer', {
    "should render barricade": function () {
      var html = Z.renderBuilding({ barricade: 43 });

      assert.roomWithText(html, 'barricade', 'Barricade: 43% integrity');
    },

    "should not render barricade when torn down": function () {
      var html = Z.renderBuilding({ barricade: 0 });

      refute.roomWithText(html, 'barricade', "Barricade: 0% integrity");
    },

    "should only render integer barricade values": function () {
      var html = Z.renderBuilding({ barricade: 4.7 });

      assert.roomWithText(html, 'barricade', 'Barricade: 4% integrity');
    },

    "should render bedroom": function () {
      var html = Z.renderBuilding({ sleepers: 3 });

      assert.roomWithText(html, 'bedroom', "Some beds (3 guards)");
    },

    "should render outside": function () {
      var html = Z.renderBuilding({ zombies: 30 });

      assert.roomWithText(html, 'outside', "Outside (30 zombies)");
    },

    "should render room without guards": function () {
      var html = Z.renderBuilding({ rooms: [ { name: 'Trapdoor' } ] });

      assert.roomWithText(html, 'room', "Trapdoor");
    },

    "should render room with zombies": function () {
      var html = Z.renderBuilding({ rooms: [ { name: "Lounge", zombies: 3 } ]});
      assert.roomWithText(html, "room", "Lounge (3 zombies)");
    },

    "should render room with dead zombies": function () {
      var html = Z.renderBuilding({ rooms: [ { name: "Lounge", deadZombies: 3 } ]});
      assert.roomWithText(html, "room", "Lounge (3 dead zombies)");
    },

    "should render room with guards": function () {
      var html = Z.renderBuilding({ rooms: [ {
        name: 'Hiding spot',
        guards: 1
      } ] });

      assert.roomWithText(html, 'room', "Hiding spot (1 guard)");
    },

    "should render several rooms": function () {
      var html = Z.renderBuilding({ rooms: [
        { name: 'Trapdoor' },
        { name: 'Hiding spot' }
      ] });

      assert.roomWithText(html, 'room', "Trapdoor");
      assert.roomWithText(html, 'room', "Hiding spot");
    }
  });
}(ZOMBIE));
