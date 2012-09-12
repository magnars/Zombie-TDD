var ZOMBIE = this.ZOMBIE || {};

(function (Z) {
  function createElement(className) {
    var el = document.createElement("div");
    el.className = className;
    return el;
  }

  Z.renderFloor = function (floor) {
    var grid = createElement("grid");

    floor.forEach(function (rooms) {
      var row = createElement("row");

      rooms.forEach(function (room) {
        var className = room ? room.type : "hidden";
        var cell = createElement("cell " + className);
        cell.setAttribute("data-id", room && room.id);
        row.appendChild(cell);
      });

      grid.appendChild(row);
    });

    return grid;
  };
}(ZOMBIE));
