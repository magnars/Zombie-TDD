var ZOMBIE = this.ZOMBIE || {};

(function () {
  "use strict";

  var isEmptyShape = function (rows) {
    return !rows || !rows.length || !rows[0].length;
  };

  var validateNonEmptyShape = function (rows) {
    if (isEmptyShape(rows)) {
      throw new TypeError("rows must be array with at least one non-empty string");
    }
  };

  var validateEvenShape = function (rows) {
    var i, l;
    for (i = 1, l = rows.length; i < l; i += 1) {
      if (rows[i].length !== rows[i - 1].length) {
        throw new TypeError("No uneven shapes");
      }
    }
  };

  var validateShape = function (rows) {
    validateNonEmptyShape(rows);
    validateEvenShape(rows);
  };

  var create = function (rows) {
    validateShape(rows);
    return Object.create(this, {
      rows: { value: rows }
    });
  };

  var blockRotations = {
    "<": "^",
    "^": ">",
    ">": "v",
    "v": "<"
  };

  var rotateBlock = function (block) {
    return blockRotations[block] || block;
  };

  var rotateColumn = function (column) {
    return column.map(rotateBlock).reverse().join("");
  };

  var rotate = function () {
    var rows = this.getColumns().map(rotateColumn);
    return ZOMBIE.shape.create(rows);
  };

  var rotateCCW = function () {
    return this.rotate().rotate().rotate();
  };

  var getColumn = function (index) {
    var column = [], i, l;
    for (i = 0, l = this.rows.length; i < l; i += 1) {
      column.push(this.rows[i].charAt(index));
    }
    return column;
  };

  var getColumns = function () {
    var columns = [], i, l;
    for (i = 0, l = this.getWidth(); i < l; i += 1) {
      columns.push(this.getColumn(i));
    }
    return columns;
  };

  var getWidth = function () {
    return this.rows[0].length;
  };

  var toArray = function () {
    return this.rows.slice(0);
  };

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

if (typeof require === "function" && typeof module !== "undefined") {
  module.exports = ZOMBIE.shape;
}