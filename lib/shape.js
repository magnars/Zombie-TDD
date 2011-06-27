var ZOMBIE = this.ZOMBIE || {};

(function () {
  
  function isEmptyShape(rows) {
    return !rows || !rows.length || !rows[0].length;
  }
  
  function validateNonEmptyShape(rows) {
    if (isEmptyShape(rows)) {
      throw new TypeError('rows must be array with at least one non-empty string');
    }
  }
  
  function validateEvenShape(rows) {
    var i, l;
    for (i = 1, l = rows.length; i < l; i += 1) {
      if (rows[i].length !== rows[i - 1].length) {
        throw new TypeError("No uneven shapes");
      }
    }
  }
  
  function validateShape(rows) {
    validateNonEmptyShape(rows);
    validateEvenShape(rows);
  }
  
  function create(rows) {
    validateShape(rows);
    return Object.create(this, {
      rows: { value: rows }
    });
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
  
  function rotateColumn(column) {
    return column.map(rotateBlock).reverse().join("");
  }
  
  function rotate() {
    var rows = this.getColumns().map(rotateColumn);
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
  
  function getColumns() {
    var columns = [], i, l;
    for (i = 0, l = this.getWidth(); i < l; i += 1) {
      columns.push(this.getColumn(i));
    }
    return columns;
  }
  
  function getWidth() {
    return this.rows[0].length;
  }
  
  function toArray() {
    return this.rows.slice(0);
  }

  ZOMBIE.shape = {
    create: create,
    rotate: rotate,
    rotateCCW: rotateCCW,
    getColumn: getColumn,
    getColumns: getColumns,
    getWidth: getWidth,
    toArray: toArray
  };

}());