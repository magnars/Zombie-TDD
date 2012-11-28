(function (Z) {
  function hasVisited(room, player) {
    return room && player.visitedRooms.indexOf(room.id) >= 0;
  }

  function cell(floor, x, y) {
    return floor[y] && floor[y][x];
  }

  function hasVisitedNeighbour(floor, x, y, player) {
    return hasVisited(cell(floor, x + 1, y), player) ||
      hasVisited(cell(floor, x - 1, y), player) ||
      hasVisited(cell(floor, x, y - 1), player) ||
      hasVisited(cell(floor, x, y + 1), player);
  }

  Z.revealFloor = function (floor, player) {
    return floor.map(function (row, y) {
      return row.map(function (room, x) {
        if (hasVisited(room, player)) {
          return room;
        } else if (room && hasVisitedNeighbour(floor, x, y, player)) {
          return { id: room.id, type: "concealed" };
        } else {
          return null;
        }
      });
    });
  };
}(ZOMBIE));
