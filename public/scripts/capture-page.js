
var player = {
  visitedRooms: [2]
};

var el = document.createElement("div");
document.body.appendChild(el);

function render(rooms, p) {
  var floor = ZOMBIE.revealFloor(rooms, p);
  var floorEl = ZOMBIE.renderFloor(floor);
  el.innerHTML = "";
  el.appendChild(floorEl);
}

render(ZOMBIE.buildingData.rooms, player);

el.addEventListener("click", function (e) {
  player.visitedRooms.push(parseInt(e.target.getAttribute("data-id"), 10));
  render(ZOMBIE.buildingData.rooms, player);
});