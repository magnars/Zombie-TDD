ZOMBIE.buildingController.create({
  model: {
    zombies: 50,
    barricade: 98,
    rooms: [{ name: "Trapdoor" }],
    sleepers: 4
  },
  buildingRoot: document.getElementById("building"),
  blueprintRoot: document.getElementById("blueprints")
}).init();