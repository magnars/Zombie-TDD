/*global TestCase, fail*/

var testCase = TestCase;

function assertPrototype(proto, obj) {
  if (!proto.isPrototypeOf(obj)) {
    fail("expected proto to be prototype of object");
  }
}