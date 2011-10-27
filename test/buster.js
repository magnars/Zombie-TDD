var config = module.exports;

config["Server tests"] = {
  tests: ["test/**/*_test.js"],
  environment: "node"
};

config["Browser tests"] = {
  libs: ["client_dependencies/**/*.js"],
  sources: ["lib/**/*.js"],
  tests: ["test/**/*_test.js"],
  environment: "browser"
};


// Clean up stack traces from browser tests
var buster = require("buster");
buster.stackFilter.filters.push("buster/bundle");
buster.stackFilter.filters.push("buster/wiring");
