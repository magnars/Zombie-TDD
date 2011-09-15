var ZOMBIE = this.ZOMBIE || {};

ZOMBIE.addRoom = function (roomName, model) {
  model.rooms = model.rooms || [];
  model.rooms.push({ name: roomName });
};