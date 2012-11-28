var ZOMBIE = this.ZOMBIE || {};

(function (Z) {
  function createElement(className) {
    var el = document.createElement("div");
    el.className = className;
    return el;
  }

  var directions = [
    { dx: 0, dy: -1, name: "north" },
    { dx: 1, dy: 0,  name: "east" },
    { dx: 0, dy: 1,  name: "south" },
    { dx: -1, dy: 0, name: "west" }
  ];

  function getCell(floor, x, y) {
    return floor[y] && floor[y][x];
  }

  function addDirections(floor, x, y, cell) {
    directions.forEach(function (d) {
      if (!getCell(floor, x + d.dx, y + d.dy)) {
        var nw = createElement(d.name + "-wall");
        cell.appendChild(nw);
      }
    });
  }

  function createCell(floor, room, x, y, className) {
    var cell = createElement("cell " + className);
    cell.setAttribute("data-id", room && room.id);
    if (room && room.type !== "concealed") {
      addDirections(floor, x, y, cell);
    }
    return cell;
  }

  Z.renderFloor = function (floor) {
    var grid = createElement("grid");
    floor.forEach(function (rooms, y) {
      var row = createElement("row");
      rooms.forEach(function (room, x) {
        var className = room ? room.type : "hidden";
        row.appendChild(createCell(floor, room, x, y, className));
      });
      grid.appendChild(row);
    });

    return grid;
  };
}(ZOMBIE));
