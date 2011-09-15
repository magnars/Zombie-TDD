(function (Z) {
  "use strict";

  testCase('RoomRendererTest', sinon.testCase({
    "test should ...": function () {
      renderRooms({
        zombies: 30,
        barricade: 43,
        rooms: [],
        sleepers: 4
      });
      
      assertEquals($(".rooms .barricade").text(), "Barricade: 43%");
    },
  }
}(ZOMBIE));
