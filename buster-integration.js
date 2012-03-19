var config = module.exports;

config["Integration tests"] = {
  libs: ["client_dependencies/jQuery.js"],
  testHelpers: ["test/integration/test-helper.js"],
  tests: ["test/integration/**/*-test.js"],
  environment: "browser",
  resources: [{ path: "app", backend: "http://localhost:3000/" }]
};
