/*jslint indent: 2*/
/*global TypeError */
var ZOMBIE = this.ZOMBIE || {};

(function () {
  
  function create(shape) {
    if (!shape) {
      throw new TypeError('shape must be array');
    }
    var self = Object.create(this);
    self.shape = shape;
    return self;
  }
  
  function rotate() {
    var shape = [];
    for (var i = 0, l = this.getWidth(); i < l; i++) {
      shape.push(this.getColumn(i).join(""));
    }
    this.shape = shape;
  }
  
  function getColumn(index) {
    var column = [];
    for (var i = 0, l = this.shape.length; i < l; i++) {
      column.push(this.shape[i].charAt(index));
    }
    return column;
  }
  
  function getWidth() {
    return this.shape[0].length;
  }

  ZOMBIE.blueprint = {
    create: create,
    rotate: rotate,
    getColumn: getColumn,
    getWidth: getWidth
  };

}());