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
  
  function create(rows) {
    validateShape(rows);
    var self = Object.create(this);
    self.rows = rows;
    return self;
  }
  
  function rotate() {
    var rows = [], i, l;
    for (i = 0, l = this.getWidth(); i < l; i += 1) {
      rows.push(this.getColumn(i).join(""));
    }

    return ZOMBIE.shape.create(rows);
  }
  
  function getColumn(index) {
    var column = [], i, l;
    for (i = 0, l = this.rows.length; i < l; i += 1) {
      column.push(this.rows[i].charAt(index));
    }
    return column;
  }
  
  function getWidth() {
    return this.rows[0].length;
  }
  
  function toArray() {
    return this.rows;
  }

  ZOMBIE.shape = {
    create: create,
    rotate: rotate,
    getColumn: getColumn,
    getWidth: getWidth,
    toArray: toArray
  };

}());