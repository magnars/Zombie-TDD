var hub = new Faye.Client("/faye");

ZOMBIE.blueprintController.create({
  blueprintRoot: document.getElementById("blueprints"),
  hub: hub
}).init();

ZOMBIE.buildingController.create({
  model: {
    zombies: 50,
    barricade: 98,
    rooms: [{ name: "Trapdoor" }],
    sleepers: 4
  },
  buildingRoot: document.getElementById("building"),
  renderer: ZOMBIE.renderBuilding,
  hub: hub
}).init();