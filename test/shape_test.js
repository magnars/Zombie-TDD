/*jslint indent: 2, onevar: false*/
/*global ZOMBIE, assertObject, assertPrototype, assertEquals, assertException, sinon */
(function (shape) {

  testCase('TestShape', sinon.testCase({
    "test should be an object": function () {
      assertObject(shape);
    },

    "test should create shapes": function () {
      var s = shape.create(["*"]);
      assertPrototype(shape, s);
    },
    
    "test should have shape": function () {
      var s = shape.create(["***",
                            "***"]);
      assertEquals(["***",      
                    "***"], s.toArray());
    },
    
    "test should complain about missing shape": function () {
      assertException(function () {
        shape.create();
      });
    },
    
    "test should complain about uneven shape": function () {
      assertException(function () {
        shape.create(["***", "*"]);
      }, "TypeError");
    },
    
    "test should complain about empty shape": function () {
      assertException(function () {
        shape.create([]);
      });
      
      assertException(function () {
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
               "***"];
      assertEquals(3, shape.create(s).getWidth());
    }
  }));

  function assertRotation(before, after) {
    var s = shape.create(before);
    var newShape = s.rotate();
    assertEquals(after, newShape.toArray());
  }

  testCase('BlueprintRotationTest', sinon.testCase({
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
    }
  }));
  
    
}(ZOMBIE.shape));

