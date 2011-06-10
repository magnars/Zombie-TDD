/*jslint indent: 2*/
/*global TypeError */
var ZOMBIE = this.ZOMBIE || {};

(function () {
  
  function validateShape(shape) {
    var i, l;
    if (!shape || !shape.length || !shape[0].length) {
      throw new TypeError('shape must be array with at least one non-empty string');
    }
    for (i = 1, l = shape.length; i < l; ++i) {
      if (shape[i].length !== shape[i - 1].length) {
        throw new TypeError("No uneven shapes");
      }
    }
  }
  
  function create(shape) {
    validateShape(shape);
    var self = Object.create(this);
    self.shape = shape;
    return self;
  }
  
  function rotate() {
    var shape = [], i, l;
    for (i = 0, l = this.getWidth(); i < l; i += 1) {
      shape.push(this.getColumn(i).join(""));
    }
    this.shape = shape;
  }
  
  function getColumn(index) {
    var column = [], i, l;
    for (i = 0, l = this.shape.length; i < l; i += 1) {
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