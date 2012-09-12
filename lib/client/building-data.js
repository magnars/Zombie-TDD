var ZOMBIE = this.ZOMBIE || {};

(function (Z) {
  var id = 0;

  function room(o) {
    if (!o) { return null; }
    var instance = Object.create(o);
    instance.id = id++;
    return instance;
  }

  var o = { type: "room" };
  var n = { type: "room", exit: "north" };
  var s = { type: "stairs" };
  var e = { type: "enemy" };
  var t = { type: "trap" };
  var p = { type: "power" };
  var b = { type: "beds" };
  var l = { type: "lockers" };

  var _ = null;

  Z.buildingData = {
    rooms: [
      [ l, o, n, o, o, o ].map(room),
      [ o, t, o, o, e, l ].map(room),
      [ p, e, o, t, b, b ].map(room),
      [ e, o, o, _, _, _ ].map(room),
      [ t, o, s, _, _, _ ].map(room)
    ]
  };

}(ZOMBIE));
