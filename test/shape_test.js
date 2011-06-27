(function (shape) {

  testCase('ShapeTest', sinon.testCase({
    "test should be an object": function () {
      assertObject(shape);
    },

    "test should create shapes": function () {
      assertPrototype(shape, shape.create(["*"]));
    },
    
    "test should return array representation": function () {
      var s = shape.create(["***"]);
      assertEquals(["***"], s.toArray());
    },
    
    "test changing toArray-result should not affect shape": function () {
      var s = shape.create(["***"]);
      s.toArray()[0] = "* *";
      assertEquals(["***"], s.toArray());
    },
    
    "test should complain about missing rows": function () {
      assertTypeError(function () {
        shape.create();
      });
    },
    
    "test should complain about uneven shape": function () {
      assertTypeError(function () {
        shape.create(["***", "*"]);
      });
    },
    
    "test should complain about empty shape": function () {
      assertTypeError(function () {
        shape.create([]);
      });
      
      assertTypeError(function () {
        shape.create([""]);
      });
    },
    
    "test should extract columns": function () {
      var s = shape.create(["ab",
                            "cd"]);
      assertEquals(["a", "c"], s.getColumn(0));
      assertEquals(["b", "d"], s.getColumn(1));
    },
    
    "test should get width of shape": function () {
      var s = ["***",
               "*  "];
      assertEquals(3, shape.create(s).getWidth());
    }
  }));

  function assertRotation(before, after) {
    var s = shape.create(before);
    var newShape = s.rotate();
    assertEquals(after, newShape.toArray());
  }

  testCase('ShapeRotationTest', sinon.testCase({
    "test should rotate exceedingly simple shape": function () {
      assertRotation(["*"], ["*"]);
    },
    
    "test should rotate vertical line": function () {
      assertRotation(["*", "*"], ["**"]);
    },
    
    "test should rotate horizontal line": function () {
      assertRotation(["**"], ["*", "*"]);
    },
    
    "test should rotate rectangles": function () {
      assertRotation(["***", "***"], ["**", "**", "**"]);
    },
    
    "test should rotate tetris like shapes": function () {
      var before = ["***",
                    "*  "];
      var after = ["**",
                   " *",
                   " *"];
      assertRotation(before, after);
    },
    
    "test should rotate counter clockwise": function () {
      var before = ["**",
                    " *"];
      var after = ["**",
                   "* "];
      var s = shape.create(before);
      var newShape = s.rotateCCW();
      assertEquals(after, newShape.toArray());
    },
    
    "test should rotate door frames": function () {
      assertRotation(["**<"], ["*", "*", "^"]);
      assertRotation(["*", "*", "^"], [">**"]);
      assertRotation([">**"], ["v", "*", "*"]);
      assertRotation(["v", "*", "*"], ["**<"]);
    }
  }));
    
}(ZOMBIE.shape));

