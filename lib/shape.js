/*global TypeError */
var ZOMBIE = this.ZOMBIE || {};

(function () {
  
  function validateShape(rows) {
    var i, l;
    if (!rows || !rows.length || !rows[0].length) {
      throw new TypeError('rows must be array with at least one non-empty string');
    }
    for (i = 1, l = rows.length; i < l; i += 1) {
      if (rows[i].length !== rows[i - 1].length) {
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
  
  var blockRotations = {
    "<": "^",
    "^": ">",
    ">": "v",
    "v": "<"
  };
  
  function rotateBlock(block) {
    return blockRotations[block] || block;
  }
  
  function rotate() {
    var rows = [], i, l;
    for (i = 0, l = this.getWidth(); i < l; i += 1) {
      rows.push(this.getColumn(i).map(rotateBlock).reverse().join(""));
    }
    return ZOMBIE.shape.create(rows);
  }
  
  function rotateCCW() {
    return this.rotate().rotate().rotate();
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
    rotateCCW: rotateCCW,
    getColumn: getColumn,
    getWidth: getWidth,
    toArray: toArray
  };

}());