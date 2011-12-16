var ZOMBIE = this.ZOMBIE || {};

(function () {
  "use strict";

  function renderOutside(zombies) {
    return "<li class='outside'><p>Outside (" + zombies + " zombies)</p></li>";
  }

  function renderBarricade(barricade) {
    return "<li class='barricade'><p>Barricade: " + barricade +
      "% integrity</p></li>";
  }

  function renderRoom(room) {
    return "<li class='room'><p>" + room.name +
      (room.guards ? (" (" + room.guards + " guard)") : "") +
      "</p></li>";
  }

  function renderRooms(rooms) {
    if (!rooms) { return ""; }
    return rooms.map(renderRoom).join("");
  }

  function renderBedroom(sleepers) {
    return "<li class='bedroom'><p>Some beds (" + sleepers + " guards)</p></li>";
  }

  ZOMBIE.renderBuilding = function (roomModel) {
    return "<ul class='building'>" +
      renderOutside(roomModel.zombies) +
      renderBarricade(roomModel.barricade) +
      renderRooms(roomModel.rooms) +
      renderBedroom(roomModel.sleepers) +
      "</ul>";
  };

}());

if (typeof module === 'object') {
  module.exports = ZOMBIE.renderBuilding;
}