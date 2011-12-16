if (typeof require === "function" && typeof module !== "undefined") {
  buster = require("buster");
  ZOMBIE = { shape: require("../../lib/shared/shape") };
}

(function (shape) {
  "use strict";

  buster.testCase('Shape', {
    "should return array representation": function () {
      var s = shape.create(["***"]);

      assert.equals(s.toArray(), ["***"]);
    },

    "changing toArray-result should not affect shape": function () {
      var s = shape.create(["***"]);
      s.toArray()[0] = "* *";

      assert.equals(s.toArray(), ["***"]);
    },

    "should complain about missing rows": function () {
      assert.exception(function () {
        shape.create();
      }, "TypeError");
    },

    "should complain about uneven shape": function () {
      assert.exception(function () {
        shape.create(["***", "*"]);
      }, "TypeError");
    },

    "should complain about empty shape": function () {
      assert.exception(function () {
        shape.create([]);
      }, "TypeError");

      assert.exception(function () {
        shape.create([""]);
      }, "TypeError");
    },

    "should extract columns": function () {
      var s = shape.create(["ab",
                            "cd"]);

      assert.equals(s.getColumn(0), ["a", "c"]);
      assert.equals(s.getColumn(1), ["b", "d"]);
    },

    "should get width of shape": function () {
      var s = ["***",
               "*  "];

      assert.equals(shape.create(s).getWidth(), 3);
    }
  });

  buster.assertions.add("rotation", {
    assert: function (before, after) {
      this.actual = shape.create(before).rotate().toArray();
      return buster.assertions.deepEqual(this.actual, after);
    },
    assertMessage: "Rotation failed: Expected ${0} to rotate to ${1}, but was ${actual}"
  });

  buster.testCase('Shape rotation', {
    "should rotate exceedingly simple shape": function () {
      assert.rotation(["*"], ["*"]);
    },

    "should rotate vertical line": function () {
      assert.rotation(["*", "*"], ["**"]);
    },

    "should rotate horizontal line": function () {
      assert.rotation(["**"], ["*", "*"]);
    },

    "should rotate rectangles": function () {
      assert.rotation(["***", "***"], ["**", "**", "**"]);
    },

    "should rotate tetris like shapes": function () {
      var before = ["***",
                    "*  "];
      var after = ["**",
                   " *",
                   " *"];
      assert.rotation(before, after);
    },

    "should rotate counter clockwise": function () {
      var before = ["**",
                    " *"];
      var after = ["**",
                   "* "];
      var s = shape.create(before);
      var newShape = s.rotateCCW();

      assert.equals(newShape.toArray(), after);
    },

    "should rotate door frames": function () {
      assert.rotation(["**<"], ["*", "*", "^"]);
      assert.rotation(["*", "*", "^"], [">**"]);
      assert.rotation([">**"], ["v", "*", "*"]);
      assert.rotation(["v", "*", "*"], ["**<"]);
    }
  });
}(ZOMBIE.shape));
