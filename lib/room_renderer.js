var ZOMBIE = this.ZOMBIE || {};

(function () {
  "use strict";
  
  function renderOutside(zombies) {
    return "<li class='outside'>Outside (" + zombies + " zombies)</li>";
  }

  function renderBarricade(barricade) {
    return "<li class='barricade'>Barricade: " + barricade + "% integrity</li>";
  }

  function renderRoom(room) {
    return "<li class='room'>" + room.name +
      (room.guards ? (" (" + room.guards + " guard)") : "") +
      "</li>";
  }

  function renderRooms(rooms) {
    if (!rooms) { return ""; }
    return rooms.map(renderRoom).join("");
  }

  function renderBedroom(sleepers) {
    return "<li class='bed room'>Some beds (" + sleepers + " guards)</li>";
  }

  ZOMBIE.renderRooms = function (roomModel) {
    return "<ul class='rooms'>" +
      renderOutside(roomModel.zombies) + 
      renderBarricade(roomModel.barricade) +
      renderRooms(roomModel.rooms) +
      renderBedroom(roomModel.sleepers) + 
      "</ul>";
  };
    
}());
