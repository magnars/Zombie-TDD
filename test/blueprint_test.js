(function (blueprint) {

  TestCase('TestBlueprint', sinon.testCase({
    "test should be an object": function () {
      assertObject(blueprint);
    },

    "test should create blueprints": function () {
      var bp = blueprint.create([]);
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
    }
  }));
    
}(ZOMBIE.blueprint));

