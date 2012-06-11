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
    "renders barricade": function () {
      var html = Z.renderBuilding({ barricade: 43 });

      assert.roomWithText(html, 'barricade', 'Barricade: 43% integrity');
    },

    "does not render barricade when torn down": function () {
      var html = Z.renderBuilding({ barricade: 0 });

      refute.roomWithText(html, 'barricade', "Barricade: 0% integrity");
    },

    "onlys render integer barricade values": function () {
      var html = Z.renderBuilding({ barricade: 4.7 });

      assert.roomWithText(html, 'barricade', 'Barricade: 4% integrity');
    },

    "renders bedroom": function () {
      var html = Z.renderBuilding({ sleepers: 3 });

      assert.roomWithText(html, 'bedroom', "Some beds (3 guards)");
    },

    "renders outside": function () {
      var html = Z.renderBuilding({ zombies: 30 });

      assert.roomWithText(html, 'outside', "Outside (30 zombies)");
    },

    "renders room without guards": function () {
      var html = Z.renderBuilding({ rooms: [ { name: 'Trapdoor' } ] });

      assert.roomWithText(html, 'room', "Trapdoor");
    },

    "renders room with zombies": function () {
      var html = Z.renderBuilding({ rooms: [ { name: "Lounge", zombies: 3 } ]});
      assert.roomWithText(html, "room", "Lounge (3 zombies)");
    },

    "renders room with dead zombies": function () {
      var html = Z.renderBuilding({ rooms: [ { name: "Lounge", deadZombies: 3 } ]});
      assert.roomWithText(html, "room", "Lounge (3 dead zombies)");
    },

    "renders room with guards": function () {
      var html = Z.renderBuilding({ rooms: [ {
        name: 'Hiding spot',
        guards: 1
      } ] });

      assert.roomWithText(html, 'room', "Hiding spot (1 guard)");
    },

    "renders several rooms": function () {
      var html = Z.renderBuilding({ rooms: [
        { name: 'Trapdoor' },
        { name: 'Hiding spot' }
      ] });

      assert.roomWithText(html, 'room', "Trapdoor");
      assert.roomWithText(html, 'room', "Hiding spot");
    }
  });
}(ZOMBIE));
