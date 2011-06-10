/*jslint indent: 2, onevar: false*/
/*global ZOMBIE, assertObject, assertPrototype, assertEquals, assertException, sinon */
(function (blueprint) {

  testCase('TestBlueprint', sinon.testCase({
    "test should be an object": function () {
      assertObject(blueprint);
    },

    "test should create blueprints": function () {
      var bp = blueprint.create(["*"]);
      assertPrototype(blueprint, bp);
    },
    
    "test should have shape": function () {
      var shape = ["***",
                   "***"];
      var bp = blueprint.create(shape);
      assertEquals(shape, bp.shape);
    },
    
    "test should complain about missing shape": function () {
      assertException(function () {
        blueprint.create();
      });
    },
    
    "test should complain about uneven shape": function () {
      assertException(function () {
        blueprint.create(["***", "*"]);
      }, "TypeError");
    },
    
    "test should complain about empty shape": function () {
      assertException(function () {
        blueprint.create([]);
      });
      
      assertException(function () {
        blueprint.create([""]);
      });
    },
    
    "test should extract columns": function () {
      var shape = ["ab",
                   "cd"];
      var bp = blueprint.create(shape);
      assertEquals(["a", "c"], bp.getColumn(0));
      assertEquals(["b", "d"], bp.getColumn(1));
    },
    
    "test should get width of shape": function () {
      var shape = ["***",
                   "***"];
      assertEquals(3, blueprint.create(shape).getWidth());
    }
  }));

  function assertRotation(before, after) {
    var bp = blueprint.create(before);
    bp.rotate();
    assertEquals(after, bp.shape);
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
    }
  }));
  
    
}(ZOMBIE.blueprint));

